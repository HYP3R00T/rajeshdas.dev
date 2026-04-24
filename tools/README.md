# tools

Build-time Python tooling for rajeshdas.dev, managed with [uv](https://docs.astral.sh/uv/)
via the root `pyproject.toml`.

## Setup

```bash
uv sync
```

## Scripts

### fetch-github-activity

Fetches 16 weeks of GitHub contribution data for `HYP3R00T` and writes
the result to `data/github-activity.json`.

```bash
uv run fetch-github-activity
```

The output file is read at build time by `src/components/homepage/LatestActivity.astro`
to render the contribution heatmap. Run this before building the site, or let
the GitHub Actions cron handle it daily.
