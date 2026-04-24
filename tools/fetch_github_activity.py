#!/usr/bin/env python3
"""
Fetch GitHub data and write two output files:

  data/github-activity.json  — 16 weeks of daily contribution counts
  data/github-stats.json     — star counts for pinned repos

Uses:
  - https://github-contributions-api.jogruber.de  (no token, contributions)
  - https://api.github.com/repos/<owner>/<repo>   (no token for public repos)

Usage (from repo root):
    uv run fetch-github-activity
"""

import json
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

USERNAME = "HYP3R00T"
WEEKS = 16

PINNED_REPOS = [
    "HYP3R00T/CelestialDocs",
    "HYP3R00T/homelab",
    "HYP3R00T/dotfiles",
]

REPO_ROOT = Path(__file__).parent.parent
ACTIVITY_OUT = REPO_ROOT / "data" / "github-activity.json"
STATS_OUT = REPO_ROOT / "data" / "github-stats.json"

CONTRIB_URL = f"https://github-contributions-api.jogruber.de/v4/{USERNAME}?y=last"
GITHUB_API = "https://api.github.com/repos/{repo}"


def fetch_json(url: str) -> dict:
    req = Request(url, headers={"Accept": "application/vnd.github+json"})
    try:
        with urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode())
    except HTTPError as e:
        print(f"  HTTP {e.code} for {url}: {e.reason}", file=sys.stderr)
        return {}
    except URLError as e:
        print(f"  Network error for {url}: {e.reason}", file=sys.stderr)
        return {}


def last_n_weeks(contributions: list[dict], weeks: int) -> list[dict]:
    cutoff = date.today() - timedelta(weeks=weeks)
    return [
        {"date": c["date"], "count": c["count"]}
        for c in contributions
        if date.fromisoformat(c["date"]) >= cutoff
    ]


def fetch_contributions() -> None:
    print(f"Fetching contributions for {USERNAME} ...")
    raw = fetch_json(CONTRIB_URL)
    all_contributions: list[dict] = raw.get("contributions", [])

    if not all_contributions:
        print("  No contribution data returned.", file=sys.stderr)
        sys.exit(1)

    trimmed = last_n_weeks(all_contributions, WEEKS)
    print(f"  Got {len(trimmed)} days across {WEEKS} weeks.")

    output = {
        "username": USERNAME,
        "fetched_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "contributions": trimmed,
    }
    ACTIVITY_OUT.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"  Written to {ACTIVITY_OUT}")


def fetch_repo_stats() -> None:
    print("Fetching repo stats ...")
    repos: dict[str, dict] = {}

    for repo in PINNED_REPOS:
        data = fetch_json(GITHUB_API.format(repo=repo))
        if data:
            repos[repo] = {
                "stars": data.get("stargazers_count", 0),
                "forks": data.get("forks_count", 0),
                "language": data.get("language", ""),
            }
            print(f"  {repo}: ★ {repos[repo]['stars']}")
        else:
            repos[repo] = {"stars": 0, "forks": 0, "language": ""}

    output = {
        "fetched_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "repos": repos,
    }
    STATS_OUT.write_text(json.dumps(output, indent=2) + "\n", encoding="utf-8")
    print(f"  Written to {STATS_OUT}")


def main() -> None:
    fetch_contributions()
    fetch_repo_stats()


if __name__ == "__main__":
    main()
