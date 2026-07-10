# Contributing / Git Workflow

This repo uses a two-branch flow with short-lived work branches:

- **`main`**: production. Deploys to [domarkas.co](https://domarkas.co) via Vercel. Only updated by PR from `development`.
- **`development`**: integration. Every work branch starts here and merges back here.
- **`feat|fix|chore|docs|refactor/*`**: short-lived branches, one idea each, deleted after merge.

## The loop

### 0. Start clean

```bash
git checkout development
git pull
```

Never branch off a stale base.

### 1. Branch, named by intent

```bash
git checkout -b feat/stack-section
```

| Prefix | Use for |
|---|---|
| `feat/` | new user-visible functionality |
| `fix/` | broken behavior |
| `chore/` | tooling, config, dependencies (no user-visible change) |
| `docs/` | documentation only |
| `refactor/` | behavior identical, structure better |

Short, kebab-case names. The test for scope: the branch should be describable in one sentence.

### 2. Small, atomic commits

Each commit is one logical change that builds and runs. Messages follow
[Conventional Commits](https://www.conventionalcommits.org):
`type: imperative summary`, lowercase, under ~70 chars, no trailing period.

```
feat: add generateMetadata to work detail pages
fix: include non-featured work in sitemap
chore: switch Geist fonts from woff to woff2
refactor: convert about page to server component
```

Add a body only when the diff cannot explain the why:

```bash
git commit -m "fix: unfeature merkur case study" -m "Body is still placeholder text; featuring it surfaces a
'coming soon' page on the homepage."
```

Rules of thumb:

- Commit when a coherent step works, not at the end of the day.
- If the message needs "and" between unrelated things, split the commit.
- No `wip` commits on pushed branches; squash them first.

### 3. Push and open a PR

```bash
git push -u origin feat/stack-section
```

PR base is `development`. Title uses the same convention as commits.
Description: what changed, why, and how it was verified. Screenshots for
anything visual. Vercel attaches a preview URL to the PR.

### 4. Self-review

Read the Files changed tab as a reviewer, not the author. Look for leftover
logs, commented-out code, accidental file changes. Click through the Vercel
preview before merging.

### 5. Merge and clean up

Squash-merge unless the branch's commits are individually meaningful.

```bash
git checkout development && git pull
git branch -d feat/stack-section
```

### 6. Release

When `development` is verified, open a PR `development -> main` titled like
`release: seo foundations + stack section` and merge it. Vercel deploys
`main` to production.

### 7. Back-merge (close the loop)

Immediately after every release:

```bash
git checkout development
git pull origin main
git push
```

This keeps the branches level so the next release is conflict-free.

## Exceptions

Trivial content or typo fixes may go straight to `development` with a normal
conventional commit. `main` only ever changes via PR.
