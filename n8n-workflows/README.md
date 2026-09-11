# n8n reference workflows

Three n8n workflows that solve problems I kept hitting in production, written to be read
rather than to be impressive. Each one is a single importable JSON file with the reasoning
kept in sticky notes next to the nodes it explains.

No client data, no credentials — every secret is an `$env` reference.

| Workflow | The problem it solves |
|---|---|
| [`idempotent-webhook-intake`](./idempotent-webhook-intake.json) | The same request arrives twice and creates two records |
| [`endpoint-health-check`](./endpoint-health-check.json) | You find out a service is down because a customer told you |
| [`workflow-backup-to-git`](./workflow-backup-to-git.json) | Your automation platform is the only copy of your automations |

## Import

Copy the JSON, then in n8n: **Workflows → ⋯ → Import from clipboard**. Set the environment
variables each one names, attach any credential it asks for, and run it once manually before
putting it on a schedule.

## What each one is actually about

### Idempotent webhook intake

Senders retry. Networks drop the response after the write has already happened. Any endpoint
that creates something has to survive being called twice with the same payload.

The key is a SHA-256 of the caller's own identifying fields — never a timestamp, never a random
value, because a retry has to produce the same key. The workflow checks for that key before
writing, and the table carries a `UNIQUE` index on it so a race that slips past the check still
cannot create a second row.

It answers three ways on purpose: `400` when the payload is unusable and retrying will not help,
`200` when we already have it, `201` when something was created. A caller can act on all three.

### Endpoint health check

Checks a list of URLs on a schedule and sends **one** digest when something is down.

Two decisions carry it. Every target is probed with `neverError`, so a dead endpoint returns
data instead of aborting the run — one outage cannot hide the others behind it. And failures are
collected before anything is sent, because ten alerts for ten dead endpoints is an inbox nobody
reads.

Silence is the success case. Nothing is sent when everything is up.

Flap suppression is deliberately **not** included: an endpoint that is down all day will produce
a message every run. Add a state table before pointing this at anything noisy.

### Workflow backup to git

Exports every workflow from an n8n instance and commits each to a repository.

This one comes from a specific bad afternoon. A hosted n8n plan ended and took its database with
it — the workflows survived only because their JSON was already committed somewhere else. A
backup that lives on the machine it is backing up is not a backup.

Files are named by workflow **id**, not name, so renaming something in the editor produces a diff
rather than an orphan plus a new file — and because names are not unique and can contain
characters that are not legal in a path. `active`, `versionId` and the timestamps are stripped
before writing, since they change on their own and would otherwise produce a commit every night
containing no actual change.

## Licence

MIT.
