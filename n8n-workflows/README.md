# n8n reference workflows

Six n8n workflows, written to be read rather than to be impressive. The first three came out
of problems I hit in production. The last three are AI automation patterns I built from
scratch to learn them properly. Each one is a single importable JSON file with the reasoning
kept in sticky notes next to the nodes it explains.

No client data and no credentials. You attach your own, and every other secret is an `$env`
reference.

| Workflow | The problem it solves |
|---|---|
| [`idempotent-webhook-intake`](./idempotent-webhook-intake.json) | The same request arrives twice and creates two records |
| [`endpoint-health-check`](./endpoint-health-check.json) | You find out a service is down because a customer told you |
| [`workflow-backup-to-git`](./workflow-backup-to-git.json) | Your automation platform is the only copy of your automations |
| [`rag-gmail-reply-assistant`](./rag-gmail-reply-assistant.json) | An AI that answers email makes up whatever it doesn't know |
| [`invoice-intake-approval`](./invoice-intake-approval.json) | Invoices get paid twice, or wait forever in someone's inbox |
| [`company-enrichment`](./company-enrichment.json) | Researching a list of companies by hand, one tab at a time |

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

### RAG Gmail reply assistant

Drafts replies to inbound email from the company's own documents, and never sends one.

That last part is the design. There is no send node anywhere in the workflow, so the most the
model can do is leave a Gmail draft for a person to read and send. A wrong answer costs someone
a minute of reading, not a customer.

New mail is triaged before anything is retrieved. Complaints, anything about a specific account
and anything the triage model is unsure of go straight to a person, so the agent only ever sees
general questions. The agent must call the knowledge base before writing. If it finds nothing,
it answers `ESCALATE` and the email is labelled for a person rather than guessed at.

A second lane, run by hand, loads documents into the Qdrant collection. It uses the same
embedding model as the question lane on purpose. Embed documents with one model and questions
with another, and retrieval returns confident nonsense.

### Invoice intake and approval queue

Two lanes in one workflow, joined only by a sheet.

**Intake** reads each invoice PDF from email, extracts the fields with a model, and queues it
as `PENDING`. The duplicate key is a SHA-256 of vendor, invoice number and amount, so the same
invoice forwarded twice is recognised instead of queued twice.

**Approval** runs on a schedule and takes the oldest `PENDING` invoice, but only when nothing is
`IN_REVIEW`. That one check is the whole queue lock. The approver gets a single Gmail
approve/decline request, and the result goes to the masterfile and the accounts team, or marks
the row `DISAPPROVED`.

If nobody answers within two days, the invoice goes back to `PENDING` rather than being treated
as declined. A missed email should delay an invoice, not reject it.

### Company enrichment

Fills in a sheet of companies from their own homepages: industry, audience, B2B or B2C, and the
value proposition in one sentence.

Each company is processed on its own. The fetch is set to `neverError`, so a dead or blocked site
comes back as a status code, and its row is marked `failed` with that code while the loop moves
on. One bad domain in a list of five hundred should cost one row.

The model is told to answer `unknown` when the page doesn't say, and to report its confidence.
A visible blank is more useful than a plausible guess that someone later mistakes for research.
The two-second pause between sites is there to be polite to other people's servers.

## Licence

MIT.
