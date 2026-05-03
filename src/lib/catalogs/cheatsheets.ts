import type { CatalogData } from "./types";

export const cheatsheetsCatalog: CatalogData = {
  id: "cheatsheets",
  sections: [
    {
      id: "shell",
      resources: [
        {
          slug: "git",
          name: "Git",
          url: "https://git-scm.com/docs",
          blurb: "Daily commands plus the few rebase / bisect / reflog tricks worth memorizing.",
          contentLanguage: "markdown",
          content: `# Git cheatsheet

## Daily
- \`git status -sb\` short status with branch
- \`git switch -c new-branch\` create + switch (modern \`checkout -b\`)
- \`git add -p\` stage hunks interactively
- \`git commit --amend --no-edit\` add to last commit, keep message
- \`git push -u origin HEAD\` push current branch, set upstream

## History
- \`git log --oneline --graph --decorate --all\` visual log
- \`git log -p path/to/file\` history of one file with diffs
- \`git log -S "needle" --source --all\` find when a string was added/removed
- \`git blame -L 10,30 file\` who wrote lines 10-30

## Rebase
- \`git rebase -i HEAD~5\` squash / reorder last 5 commits
- \`git rebase --autosquash\` apply \`fixup!\` and \`squash!\` commits in order
- \`git rebase --onto main feature-base feature-tip\` move a branch range
- \`git rebase --abort\` get out, never \`reset --hard\` mid-rebase

## Recovery
- \`git reflog\` every HEAD movement, even after \`reset\`
- \`git reset --hard ORIG_HEAD\` undo last merge/rebase
- \`git checkout <sha> -- file\` restore one file from a past commit
- \`git stash push -m "wip" -- src/foo\` stash partial files only

## Bisect
- \`git bisect start\`
- \`git bisect bad\` (current is broken)
- \`git bisect good v1.2.3\` (last known-good tag)
- run tests, then \`git bisect good\` or \`bad\` until git names the culprit
- \`git bisect reset\` finishes

## Cleanup
- \`git branch --merged main | grep -v '^\\*' | xargs -n 1 git branch -d\` delete branches already merged
- \`git fetch --prune\` drop remote-tracking branches that are gone
- \`git gc --aggressive\` repack the repo (rare, only when bloated)`
        },
        {
          slug: "curl",
          name: "curl",
          url: "https://curl.se/docs/manpage.html",
          blurb: "The handful of flags that cover 95% of API debugging.",
          contentLanguage: "markdown",
          content: `# curl cheatsheet

## Basics
- \`curl URL\` GET, body to stdout
- \`curl -i URL\` include response headers
- \`curl -I URL\` HEAD only
- \`curl -L URL\` follow redirects
- \`curl -s URL\` silent (no progress)
- \`curl -o file URL\` save to file
- \`curl -O URL\` save with remote filename

## POST + JSON
\`\`\`
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{"name":"Wiener","role":"builder"}'
\`\`\`

## Form upload
\`\`\`
curl -F "file=@./photo.jpg" -F "caption=ship it" https://api.example.com/upload
\`\`\`

## Auth
- \`-u user:pass\` basic auth
- \`-H "Authorization: Bearer $TOKEN"\` bearer
- \`--cookie "session=abc"\` send cookie
- \`--cookie-jar jar.txt --cookie jar.txt\` save + reuse cookies

## Inspect
- \`-w "%{http_code} %{time_total}s\\n" -o /dev/null -s URL\` status + timing only
- \`-w "@curl-format.txt"\` template-driven output
- \`-v\` verbose (TLS, headers, redirects)
- \`--trace-ascii out.txt URL\` full wire trace

## Performance
- \`-Z --parallel-immediate URL1 URL2 URL3\` fetch in parallel
- \`--max-time 5\` overall timeout
- \`--retry 3 --retry-delay 1\` retry transient failures

## Useful one-liners
- IP address: \`curl -s ifconfig.me\`
- JSON pretty-print: \`curl -s URL | jq .\`
- Time-to-first-byte: \`curl -o /dev/null -s -w "%{time_starttransfer}\\n" URL\``
        },
        {
          slug: "regex",
          name: "Regex",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          blurb: "Anchors, lookarounds, character classes — the patterns you keep re-typing.",
          contentLanguage: "markdown",
          content: `# Regex cheatsheet (PCRE / JS flavor)

## Anchors
- \`^\` start of line · \`$\` end of line
- \`\\b\` word boundary · \`\\B\` not a word boundary
- \`\\A\` start of input · \`\\z\` end of input (PCRE)

## Character classes
- \`.\` any char (except newline) · \`\\.\` literal dot
- \`\\d\` digit · \`\\D\` not digit
- \`\\w\` word char · \`\\W\` not word
- \`\\s\` whitespace · \`\\S\` not whitespace
- \`[abc]\` set · \`[^abc]\` negated · \`[a-z]\` range

## Quantifiers
- \`?\` 0 or 1 · \`*\` 0+ · \`+\` 1+
- \`{3}\` exactly 3 · \`{3,}\` at least 3 · \`{3,5}\` 3 to 5
- add \`?\` for non-greedy: \`.*?\`

## Groups
- \`(abc)\` capturing group
- \`(?:abc)\` non-capturing
- \`(?<name>abc)\` named group
- \`\\1\` backreference to group 1

## Lookarounds
- \`(?=abc)\` positive lookahead — followed by abc
- \`(?!abc)\` negative lookahead
- \`(?<=abc)\` positive lookbehind — preceded by abc
- \`(?<!abc)\` negative lookbehind

## Common patterns
- email-ish: \`\\b[\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,}\\b\`
- IPv4: \`(?:\\d{1,3}\\.){3}\\d{1,3}\`
- semver: \`v?(\\d+)\\.(\\d+)\\.(\\d+)(?:-[\\w.]+)?\`
- ISO date: \`\\d{4}-\\d{2}-\\d{2}\`
- UUID v4: \`[\\da-f]{8}-[\\da-f]{4}-4[\\da-f]{3}-[89ab][\\da-f]{3}-[\\da-f]{12}\`
- markdown link: \`\\[([^\\]]+)\\]\\(([^)]+)\\)\`

## JS flags
- \`g\` global · \`i\` case-insensitive · \`m\` multiline (\`^\`/\`$\` per line)
- \`s\` dotAll (\`.\` matches newline) · \`u\` unicode · \`y\` sticky`
        }
      ]
    },
    {
      id: "media",
      resources: [
        {
          slug: "ffmpeg",
          name: "ffmpeg one-liners",
          url: "https://ffmpeg.org/ffmpeg.html",
          blurb: "Trim, compress, convert, extract — the recipes you Google every time.",
          contentLanguage: "markdown",
          content: `# ffmpeg cheatsheet

## Trim (no re-encode, fast)
\`\`\`
ffmpeg -ss 00:00:05 -to 00:00:15 -i in.mp4 -c copy out.mp4
\`\`\`
Note: \`-ss\` BEFORE \`-i\` is faster but less precise. Put it AFTER \`-i\` for frame-accurate.

## Compress (H.264, sane defaults)
\`\`\`
ffmpeg -i in.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart out.mp4
\`\`\`
- CRF 18 = visually lossless · 23 = default · 28 = small file
- preset: ultrafast → veryslow (slower = smaller file)

## Convert format
\`\`\`
ffmpeg -i in.mov -c:v libx264 -c:a aac out.mp4
ffmpeg -i in.mp4 -c:v libvpx-vp9 -c:a libopus out.webm
\`\`\`

## Resize / scale
\`\`\`
ffmpeg -i in.mp4 -vf "scale=1280:-2" out.mp4    # width 1280, height auto, even
ffmpeg -i in.mp4 -vf "scale=-2:720"  out.mp4    # height 720
\`\`\`

## GIF from video
\`\`\`
ffmpeg -ss 00:00:05 -t 3 -i in.mp4 \\
  -vf "fps=15,scale=480:-1:flags=lanczos,palettegen" palette.png
ffmpeg -ss 00:00:05 -t 3 -i in.mp4 -i palette.png \\
  -lavfi "fps=15,scale=480:-1:flags=lanczos[x];[x][1:v]paletteuse" out.gif
\`\`\`

## Extract audio
\`\`\`
ffmpeg -i in.mp4 -vn -acodec copy out.aac      # keep codec, just unmux
ffmpeg -i in.mp4 -vn -acodec libmp3lame -b:a 192k out.mp3
\`\`\`

## Mute / strip audio
\`\`\`
ffmpeg -i in.mp4 -c copy -an out.mp4
\`\`\`

## Concat (same codec)
\`\`\`
# list.txt:
file 'a.mp4'
file 'b.mp4'
ffmpeg -f concat -safe 0 -i list.txt -c copy out.mp4
\`\`\`

## Speed up / slow down
\`\`\`
ffmpeg -i in.mp4 -filter:v "setpts=0.5*PTS" -filter:a "atempo=2.0" out.mp4   # 2x
ffmpeg -i in.mp4 -filter:v "setpts=2.0*PTS" -filter:a "atempo=0.5" out.mp4   # 0.5x
\`\`\`

## Extract a single frame
\`\`\`
ffmpeg -ss 00:00:05 -i in.mp4 -frames:v 1 -q:v 2 thumb.jpg
\`\`\``
        }
      ]
    },
    {
      id: "infra",
      resources: [
        {
          slug: "docker",
          name: "Docker",
          url: "https://docs.docker.com/reference/cli/docker/",
          blurb: "The 30 commands that cover most local + CI work.",
          contentLanguage: "markdown",
          content: `# Docker cheatsheet

## Run + manage
- \`docker run --rm -it img bash\` interactive, auto-remove on exit
- \`docker run -d -p 8080:80 --name app img\` detached, port mapped, named
- \`docker run -v $(pwd):/work -w /work img\` mount cwd, set workdir
- \`docker run --env-file .env img\` load env vars from file
- \`docker ps\` running · \`docker ps -a\` all (incl stopped)
- \`docker stop app && docker rm app\` clean up
- \`docker exec -it app bash\` shell into a running container

## Build
- \`docker build -t myimg:1.2.3 .\` tag + build
- \`docker build --target build -t myimg .\` stop at a stage
- \`docker build --no-cache -t myimg .\` ignore layer cache
- \`docker buildx build --platform linux/amd64,linux/arm64 -t myimg --push .\` multi-arch + push

## Inspect
- \`docker logs -f app\` follow logs
- \`docker logs --tail 200 app\` last 200 lines
- \`docker inspect app | jq .[0].State\` container state JSON
- \`docker stats\` live CPU / mem per container
- \`docker top app\` processes inside

## Cleanup
- \`docker system df\` what's eating disk
- \`docker system prune -a --volumes\` nuke unused images, containers, networks, volumes (careful)
- \`docker image prune\` dangling images only
- \`docker builder prune\` build cache only

## Compose
- \`docker compose up -d\` start in background
- \`docker compose logs -f api\` follow one service's logs
- \`docker compose exec api sh\` shell into a service
- \`docker compose down -v\` stop + remove volumes
- \`docker compose pull && docker compose up -d\` update images then restart

## Tips
- Build with a \`.dockerignore\` (mirrors \`.gitignore\` plus \`node_modules\`, \`.git\`, build artefacts)
- Pin base images: \`FROM node:22.6.0-alpine\` not \`FROM node\`
- Order Dockerfile from least-changing to most-changing for cache hits
- Don't run as root inside the container — \`USER node\` (or your own user)`
        },
        {
          slug: "kubectl",
          name: "kubectl",
          url: "https://kubernetes.io/docs/reference/kubectl/",
          blurb: "Read pods + logs + exec + apply. The 80% of daily k8s use.",
          contentLanguage: "markdown",
          content: `# kubectl cheatsheet

## Context
- \`kubectl config get-contexts\` list clusters
- \`kubectl config use-context prod\` switch
- \`kubectl config set-context --current --namespace=mynamespace\` default ns

## Read
- \`kubectl get pods\` · add \`-o wide\` for node + IP
- \`kubectl get pods -l app=api\` filter by label
- \`kubectl get pods --all-namespaces\` (\`-A\`) every namespace
- \`kubectl get all\` pods, svcs, deploys, etc. in one go
- \`kubectl describe pod foo\` events, env, mounts, conditions
- \`kubectl get pod foo -o yaml\` full spec

## Logs + exec
- \`kubectl logs -f pod/foo\` follow
- \`kubectl logs --tail 200 pod/foo -c container-name\` last 200 lines from a sidecar
- \`kubectl logs --since=1h deploy/api\` recent logs from any pod of a deploy
- \`kubectl exec -it pod/foo -- sh\` shell

## Apply / change
- \`kubectl apply -f manifest.yaml\` create/update
- \`kubectl apply -k overlays/prod\` apply a kustomize dir
- \`kubectl rollout status deploy/api\` watch a rollout
- \`kubectl rollout undo deploy/api\` revert to previous
- \`kubectl scale deploy/api --replicas=3\` scale up/down
- \`kubectl edit deploy/api\` open the manifest in \`$EDITOR\`

## Port-forward
- \`kubectl port-forward svc/api 8080:80\` forward local 8080 → service 80
- \`kubectl port-forward pod/foo 5432\` forward 5432 to a db pod

## Debug
- \`kubectl get events --sort-by=.lastTimestamp\` recent cluster events
- \`kubectl run debug --rm -it --image=busybox -- sh\` ad-hoc pod
- \`kubectl debug pod/foo --image=busybox -it\` ephemeral container in existing pod
- \`kubectl top pods\` CPU/mem (needs metrics-server)

## Tips
- Set \`kubectl=k\` alias and \`source <(kubectl completion zsh)\`
- \`kubectl explain deploy.spec.strategy\` learn any field's schema
- Use \`stern\` for multi-pod log tail, \`k9s\` for a TUI`
        }
      ]
    },
    {
      id: "data",
      resources: [
        {
          slug: "postgres",
          name: "PostgreSQL",
          url: "https://www.postgresql.org/docs/current/",
          blurb: "Joins, window funcs, JSON, indexing, and the EXPLAIN reading skill.",
          contentLanguage: "markdown",
          content: `# Postgres cheatsheet

## psql
- \`\\l\` list dbs · \`\\c db\` connect · \`\\dt\` list tables · \`\\d table\` describe
- \`\\df\` functions · \`\\du\` roles · \`\\dn\` schemas
- \`\\timing on\` show query time · \`\\x auto\` auto-expand wide rows
- \`\\copy table FROM 'file.csv' CSV HEADER\` import CSV

## Joins
\`\`\`sql
SELECT u.email, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 5
ORDER BY order_count DESC;
\`\`\`

## Window functions
\`\`\`sql
SELECT
  user_id,
  amount,
  SUM(amount) OVER (PARTITION BY user_id ORDER BY created_at) AS running_total,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
FROM orders;
-- Then: WHERE rn = 1 to get the latest order per user
\`\`\`

## Upsert
\`\`\`sql
INSERT INTO users (email, name)
VALUES ('a@b.com', 'Alice')
ON CONFLICT (email)
DO UPDATE SET name = EXCLUDED.name, updated_at = now()
RETURNING *;
\`\`\`

## JSON / JSONB
- \`SELECT data->>'name' FROM events;\` extract as text
- \`SELECT data->'meta'->>'plan' FROM events;\` nested path
- \`WHERE data @> '{"plan":"pro"}'\` contains
- \`SELECT jsonb_object_keys(data) FROM events;\` list keys
- index: \`CREATE INDEX ON events USING GIN (data jsonb_path_ops);\`

## CTEs + recursion
\`\`\`sql
WITH RECURSIVE descendants AS (
  SELECT id, parent_id, name FROM categories WHERE id = 1
  UNION ALL
  SELECT c.id, c.parent_id, c.name
  FROM categories c JOIN descendants d ON c.parent_id = d.id
)
SELECT * FROM descendants;
\`\`\`

## Performance
- \`EXPLAIN (ANALYZE, BUFFERS) SELECT ...;\` run + show plan
  - Look for \`Seq Scan\` on big tables (missing index?)
  - \`rows=\` planned vs actual diverging means stats are stale → \`ANALYZE\`
- \`CREATE INDEX CONCURRENTLY ON t (col)\` — never lock table in prod
- partial index: \`CREATE INDEX ON t (col) WHERE active = true;\`
- index on expression: \`CREATE INDEX ON users (lower(email));\`

## Maintenance
- \`VACUUM (VERBOSE, ANALYZE);\` reclaim + refresh stats
- \`REINDEX CONCURRENTLY INDEX idx;\` rebuild bloated index
- \`pg_stat_statements\` extension for top-N slowest queries`
        }
      ]
    }
  ]
};
