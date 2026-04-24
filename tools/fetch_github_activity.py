#!/usr/bin/env python3
"""
Fetch GitHub contribution data for the last 16 weeks and write to
data/github-activity.json (relative to the repo root).

Uses the public proxy at https://github-contributions-api.jogruber.de
— no token required.

Usage (from repo root):
    uv run --project tools tools/fetch_github_activity.py

Or after `uv sync` inside tools/:
    uv run fetch-github-activity
"""

import json
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

USERNAME = "HYP3R00T"
WEEKS = 16

# Output path is always relative to this file's grandparent (repo root)
REPO_ROOT = Path(__file__).parent.parent
OUTPUT = REPO_ROOT / "data" / "github-activity.json"

API_URL = f"https://github-contributions-api.jogruber.de/v4/{USERNAME}?y=last"


def fetch_contributions() -> dict:
    print(f"Fetching contributions for {USERNAME} ...")
    try:
        with urlopen(API_URL, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except HTTPError as e:
        print(f"HTTP error {e.code}: {e.reason}", file=sys.stderr)
        sys.exit(1)
    except URLError as e:
        print(f"Network error: {e.reason}", file=sys.stderr)
        sys.exit(1)


def last_n_weeks(contributions: list[dict], weeks: int) -> list[dict]:
    """Return only the contributions from the last `weeks` weeks."""
    cutoff = date.today() - timedelta(weeks=weeks)
    return [
        {"date": c["date"], "count": c["count"]}
        for c in contributions
        if date.fromisoformat(c["date"]) >= cutoff
    ]


def main() -> None:
    raw = fetch_contributions()

    # The API returns {"total": {...}, "contributions": [...]}
    all_contributions: list[dict] = raw.get("contributions", [])

    if not all_contributions:
        print("No contribution data returned.", file=sys.stderr)
        sys.exit(1)

    trimmed = last_n_weeks(all_contributions, WEEKS)
    print(f"  Got {len(trimmed)} days across {WEEKS} weeks.")

    output = {
        "username": USERNAME,
        "fetched_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "contributions": trimmed,
    }

    OUTPUT.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"  Written to {OUTPUT}")


if __name__ == "__main__":
    main()
