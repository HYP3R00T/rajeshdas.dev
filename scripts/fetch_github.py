#!/usr/bin/env python3
"""
Fetch GitHub activity events and generate a flat array matching github-events.schema.json.
This script reads the GitHub token from .env file and fetches activity events
for repositories listed in project.json.

Incremental mode: Fetches only the last 24 hours of events and prepends them to
the existing github.json file, avoiding duplicate API calls.
"""

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv

# IST timezone (UTC+5:30)
IST = timezone(timedelta(hours=5, minutes=30))


def load_github_token() -> str:
    """Load GitHub token from .env file."""
    env_path = Path(__file__).parent.parent / ".env"
    load_dotenv(env_path)

    token = os.getenv("GITHUB_TOKEN")
    if not token:
        raise ValueError("GITHUB_TOKEN not found in .env file")
    return token


def load_project_repos() -> list[str]:
    """Load repository IDs from project.json."""
    project_file = Path(__file__).parent.parent / "project.json"
    with open(project_file) as f:
        data = json.load(f)
    return [project["id"] for project in data["projects"]]


def load_existing_events() -> tuple[list[dict], datetime | None]:
    """
    Load existing events from github.json.

    Returns:
        tuple: (list of existing events, most recent event timestamp or None)
    """
    output_file = Path(__file__).parent.parent / "github.json"

    if not output_file.exists():
        return [], None

    try:
        with open(output_file) as f:
            events = json.load(f)

        if not events:
            return [], None

        # Find the most recent event timestamp
        most_recent = max(datetime.fromisoformat(event["at"].replace("Z", "+00:00")) for event in events)

        return events, most_recent
    except (json.JSONDecodeError, ValueError, KeyError) as e:
        print(f"⚠ Warning: Could not parse existing github.json: {e}")
        return [], None


def get_date_range(days: int = 30, since: datetime | None = None) -> str:
    """
    Get date range for GitHub search format.

    Args:
        days: Number of days to go back (default: 30)
        since: Start from this timestamp instead of calculating from days

    Returns:
        str: Date range in format YYYY-MM-DD..YYYY-MM-DD or YYYY-MM-DD for single day
    """
    now = datetime.now(IST)
    end_date = now.replace(hour=23, minute=59, second=59, microsecond=999999)

    start_date = since or (now - timedelta(days=days)).replace(hour=0, minute=0, second=0, microsecond=0)

    if days == 1 and not since:
        return start_date.strftime("%Y-%m-%d")
    return f"{start_date.strftime('%Y-%m-%d')}..{end_date.strftime('%Y-%m-%d')}"


def fetch_graphql(token: str, query: str) -> dict:
    """Execute a GraphQL query against GitHub API."""
    url = "https://api.github.com/graphql"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    with httpx.Client() as client:
        response = client.post(url, json={"query": query}, headers=headers, timeout=30.0)
        response.raise_for_status()
        data = response.json()

        if "errors" in data:
            raise Exception(f"GraphQL errors: {data['errors']}")
        return data


def fetch_events(token: str, repo_id: str, date_range: str) -> list[dict]:
    """
    Fetch all activity events for a repository in the given date range.

    Args:
        token: GitHub personal access token
        repo_id: Repository in format "owner/repo"
        date_range: Date range in format YYYY-MM-DD or YYYY-MM-DD..YYYY-MM-DD

    Returns:
        list: Flat array of event objects matching github-events.schema.json
    """
    events = []

    # Parse date range for timestamp filtering
    if ".." in date_range:
        since_date, until_date = date_range.split("..")
        since_ts = datetime.fromisoformat(f"{since_date}T00:00:00Z")
        until_ts = datetime.fromisoformat(f"{until_date}T23:59:59Z")
    else:
        since_ts = datetime.fromisoformat(f"{date_range}T00:00:00Z")
        until_ts = datetime.fromisoformat(f"{date_range}T23:59:59Z")

    # Fetch pull requests using updated filter to catch all state changes
    pr_query = f"""
    query {{
      search(query: "repo:{repo_id} is:pr updated:{date_range}", type: ISSUE, first: 100) {{
        nodes {{
          ... on PullRequest {{
            number
            title
            url
            createdAt
            mergedAt
            closedAt
            merged
            author {{ login }}
            mergedBy {{ login }}
          }}
        }}
      }}
    }}
    """

    pr_data = fetch_graphql(token, pr_query)
    for pr in pr_data.get("data", {}).get("search", {}).get("nodes", []):
        if not pr:
            continue

        author = pr.get("author", {}).get("login", "unknown")

        # PR opened event (only if created in range)
        created_at = datetime.fromisoformat(pr["createdAt"].replace("Z", "+00:00"))
        if since_ts <= created_at <= until_ts:
            events.append({
                "id": f"pull_opened-{repo_id}-{pr['number']}",
                "type": "pull_opened",
                "at": pr["createdAt"],
                "actor": author,
                "project_id": repo_id,
                "title": pr["title"],
                "url": pr["url"],
            })

        # PR merged event (only if merged in range)
        if pr.get("merged") and pr.get("mergedAt"):
            merged_at = datetime.fromisoformat(pr["mergedAt"].replace("Z", "+00:00"))
            if since_ts <= merged_at <= until_ts:
                merger = pr.get("mergedBy", {}).get("login", author)
                events.append({
                    "id": f"pull_merged-{repo_id}-{pr['number']}",
                    "type": "pull_merged",
                    "at": pr["mergedAt"],
                    "actor": merger,
                    "project_id": repo_id,
                    "title": pr["title"],
                    "url": pr["url"],
                })

        # PR closed (without merge) event (only if closed in range)
        elif pr.get("closedAt"):
            closed_at = datetime.fromisoformat(pr["closedAt"].replace("Z", "+00:00"))
            if since_ts <= closed_at <= until_ts:
                events.append({
                    "id": f"pull_closed-{repo_id}-{pr['number']}",
                    "type": "pull_closed",
                    "at": pr["closedAt"],
                    "actor": author,
                    "project_id": repo_id,
                    "title": pr["title"],
                    "url": pr["url"],
                })

    # Fetch issues using updated filter to catch all state changes
    issue_query = f"""
    query {{
      search(query: "repo:{repo_id} is:issue updated:{date_range}", type: ISSUE, first: 100) {{
        nodes {{
          ... on Issue {{
            number
            title
            url
            createdAt
            closedAt
            state
            author {{ login }}
          }}
        }}
      }}
    }}
    """

    issue_data = fetch_graphql(token, issue_query)
    for issue in issue_data.get("data", {}).get("search", {}).get("nodes", []):
        if not issue:
            continue

        author = issue.get("author", {}).get("login", "unknown")

        # Issue opened event (only if created in range)
        created_at = datetime.fromisoformat(issue["createdAt"].replace("Z", "+00:00"))
        if since_ts <= created_at <= until_ts:
            events.append({
                "id": f"issue_opened-{repo_id}-{issue['number']}",
                "type": "issue_opened",
                "at": issue["createdAt"],
                "actor": author,
                "project_id": repo_id,
                "title": issue["title"],
                "url": issue["url"],
            })

        # Issue closed event (only if closed in range)
        if issue.get("closedAt"):
            closed_at = datetime.fromisoformat(issue["closedAt"].replace("Z", "+00:00"))
            if since_ts <= closed_at <= until_ts:
                events.append({
                    "id": f"issue_closed-{repo_id}-{issue['number']}",
                    "type": "issue_closed",
                    "at": issue["closedAt"],
                    "actor": author,
                    "project_id": repo_id,
                    "title": issue["title"],
                    "url": issue["url"],
                })

    # Fetch commits using REST API
    owner, repo = repo_id.split("/")

    commit_url = f"https://api.github.com/repos/{owner}/{repo}/commits"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
    }

    params = {
        "since": since_ts.isoformat(),
        "until": until_ts.isoformat(),
        "per_page": 100,
    }
    with httpx.Client() as client:
        response = client.get(commit_url, headers=headers, params=params, timeout=30.0)
        if response.status_code == 200:
            commits = response.json()

            for commit in commits:
                author_info = commit.get("author") or {}
                actor = author_info.get("login", "unknown")
                commit_data = commit.get("commit", {})

                events.append({
                    "id": f"commit-{repo_id}-{commit['sha'][:7]}",
                    "type": "commit",
                    "at": commit_data.get("committer", {}).get("date", commit_data.get("author", {}).get("date")),
                    "actor": actor,
                    "project_id": repo_id,
                    "title": commit_data.get("message", "").split("\n")[0][:200],
                    "url": commit.get("html_url", ""),
                })

    # Fetch releases using REST API
    url = f"https://api.github.com/repos/{owner}/{repo}/releases"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json",
    }

    with httpx.Client() as client:
        response = client.get(url, headers=headers, timeout=30.0)
        if response.status_code == 200:
            releases = response.json()

            for release in releases:
                if release.get("published_at"):
                    published_at = datetime.fromisoformat(release["published_at"].replace("Z", "+00:00"))
                    # Only include releases published within the date range
                    if since_ts <= published_at <= until_ts:
                        author = release.get("author", {}).get("login", "unknown")
                        events.append({
                            "id": f"release_published-{repo_id}-{release['tag_name']}",
                            "type": "release_published",
                            "at": release["published_at"],
                            "actor": author,
                            "project_id": repo_id,
                            "title": release.get("name") or release["tag_name"],
                            "url": release["html_url"],
                        })

    return events


def main():
    """Main function to fetch GitHub activity and generate events JSON."""
    try:
        token = load_github_token()
        repo_ids = load_project_repos()

        # Load existing events
        existing_events, most_recent = load_existing_events()

        # Determine fetch strategy
        if most_recent:
            # Incremental mode: fetch from most recent event timestamp
            # Add a small buffer to avoid missing events due to timing
            since = most_recent - timedelta(hours=1)
            date_range = get_date_range(since=since)
            print(f"📥 Incremental fetch since {since.strftime('%Y-%m-%d %H:%M:%S IST')}")
        else:
            # Full fetch mode: fetch last 30 days
            days = 90
            date_range = get_date_range(days)
            print(f"📥 Full fetch for last {days} days")

        # Fetch new events
        new_events = []
        for repo_id in repo_ids:
            print(f"  Fetching events for {repo_id}...")
            events = fetch_events(token, repo_id, date_range)
            new_events.extend(events)

        # Deduplicate by event ID (important for avoiding duplicates)
        existing_ids = {event["id"] for event in existing_events}
        unique_new_events = [event for event in new_events if event["id"] not in existing_ids]

        # Combine: prepend new events to existing events
        all_events = unique_new_events + existing_events

        # Sort by timestamp (most recent first)
        all_events.sort(key=lambda x: x["at"], reverse=True)

        # Optional: Limit total events to last 90 days to keep file size manageable
        cutoff_date = datetime.now(IST) - timedelta(days=90)
        all_events = [
            event for event in all_events if datetime.fromisoformat(event["at"].replace("Z", "+00:00")) >= cutoff_date
        ]

        # Save to github.json
        output_file = Path(__file__).parent.parent / "github.json"
        with open(output_file, "w") as f:
            json.dump(all_events, f, indent=2)

        print(f"✓ Added {len(unique_new_events)} new events")
        print(f"✓ Total events: {len(all_events)} (from {len(repo_ids)} repositories)")
        return 0

    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback

        traceback.print_exc()
        return 1


if __name__ == "__main__":
    exit(main())
