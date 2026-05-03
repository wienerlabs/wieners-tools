import type { CatalogData } from "./types";

export const promptsCatalog: CatalogData = {
  id: "prompts",
  sections: [
    {
      id: "review",
      resources: [
        {
          slug: "deep-review",
          name: "Deep code review",
          url: "#",
          blurb: "Surface real defects, not nits. Pushes the model past surface comments.",
          contentLanguage: "markdown",
          content: `Act as a senior engineer doing a thorough code review of the following diff. Skip nits and style preferences. For each finding, write:
- the exact file + line span
- one sentence on the bug or risk
- the smallest concrete fix

Group findings by severity: BLOCKER, HIGH, NICE-TO-HAVE. Do not include praise or summary at the top. If you spot a missing test that would have caught a real bug, list it under BLOCKER.

Diff to review:
<paste here>`
        },
        {
          slug: "second-opinion",
          name: "Independent second opinion",
          url: "#",
          blurb: "Use when you've already analyzed something and want a fresh take that won't anchor on yours.",
          contentLanguage: "markdown",
          content: `You are getting a problem cold — I have NOT shared my own analysis. Read the snippet below and give me your honest assessment in three short sections:
1. What this code is doing (one paragraph, in your own words).
2. The single biggest correctness, performance, or security risk you see.
3. The smallest change that addresses it.

Do not hedge with "could be" — pick the most likely failure mode and commit to it. If you don't see anything notable, say so plainly.

Code:
<paste here>`
        },
        {
          slug: "test-gap",
          name: "Find missing tests",
          url: "#",
          blurb: "Reads source + test, returns concrete test cases that would expose untested behavior.",
          contentLanguage: "markdown",
          content: `Compare the source file and its test file below. Return a list of test cases that are NOT currently covered. For each, write:
- a short name (snake_case for Python, camelCase for JS/TS)
- the input shape
- the expected behavior
- why it matters (real-world failure mode)

Sort by likelihood the missing case is currently broken in production. Do not generate test code — just the missing cases.

Source:
<paste here>

Tests:
<paste here>`
        }
      ]
    },
    {
      id: "refactor",
      resources: [
        {
          slug: "refactor-no-regress",
          name: "Refactor without regression",
          url: "#",
          blurb: "Locks the model to behavior preservation. Forces commit-by-commit thinking.",
          contentLanguage: "markdown",
          content: `Refactor the following code to <goal>. Constraints:
- public API and observable behavior MUST stay identical
- splittable into multiple commits — output them in order, each one mechanical and reviewable
- for each commit: title, files touched, and the diff

Run any test suites in the repo before and after each commit. If a commit breaks tests, stop and explain.

Code:
<paste here>`
        },
        {
          slug: "extract-module",
          name: "Extract reusable module",
          url: "#",
          blurb: "Pull domain-specific code out of a fat file into a focused module with tests.",
          contentLanguage: "markdown",
          content: `Identify the cohesive concept inside this file that deserves its own module. Output:
1. The module's name + interface (function signatures or class shape).
2. The minimal set of dependencies it needs (parameters injected, not imported globally).
3. A migration plan — which call sites need updating, in which order.
4. A test file that exercises the public interface end to end.

Do not pull out abstractions that are only used once. If the file does not contain a clean candidate, say so.

Code:
<paste here>`
        },
        {
          slug: "tighten-types",
          name: "Tighten TypeScript types",
          url: "#",
          blurb: "Removes any/unknown without breaking call sites. TS-specific.",
          contentLanguage: "markdown",
          content: `Audit this TypeScript file for type weaknesses. For each \`any\`, \`unknown\` (without follow-up narrowing), or implicit \`any\`:
- propose a replacement type
- show the resulting type signature
- identify call sites that may break

If a generic would help, sketch the generic constraint. Do not introduce \`as\` casts unless the runtime invariant truly cannot be expressed in the type system; in that case explain why.

Code:
<paste here>`
        }
      ]
    },
    {
      id: "debug",
      resources: [
        {
          slug: "minimal-repro",
          name: "Build a minimal reproduction",
          url: "#",
          blurb: "Strips noise. Produces the smallest failing example you can ship to a maintainer.",
          contentLanguage: "markdown",
          content: `Given the bug report and surrounding code below, build the smallest standalone reproduction. Output:
1. A single file (or two — input + driver) that exhibits the bug when run.
2. The exact command to run it.
3. The expected output vs the observed output.

No frameworks, no databases, no network calls unless absolutely required. If the bug requires real I/O, mock it deterministically.

Bug report:
<paste here>

Code:
<paste here>`
        },
        {
          slug: "diff-bisect",
          name: "Diff bisect",
          url: "#",
          blurb: "Use when something worked yesterday and broke today.",
          contentLanguage: "markdown",
          content: `Here are two versions of the same file (BEFORE working, AFTER broken). The bug is somewhere in the diff. Walk through each hunk and rank by likelihood it caused the regression. For the top suspect, explain the failure mode in one paragraph and propose the minimal revert.

If the bug is more likely in a related file (config, dep version), say so up front.

BEFORE:
<paste here>

AFTER:
<paste here>

Symptoms:
<paste here>`
        },
        {
          slug: "stack-trace-triage",
          name: "Triage a stack trace",
          url: "#",
          blurb: "Cuts through framework noise to the actual bug.",
          contentLanguage: "markdown",
          content: `Triage this stack trace. Output:
1. The single line of OUR code where the bug is — not the framework frame, our frame.
2. The most likely root cause in one sentence.
3. The defensive change that would have prevented it.
4. A test that, if it had existed, would have caught this in CI.

Do not rewrite our entire code path. Stay surgical.

Stack trace:
<paste here>

Relevant code:
<paste here>`
        }
      ]
    },
    {
      id: "doc",
      resources: [
        {
          slug: "doc-from-source",
          name: "Generate API docs from source",
          url: "#",
          blurb: "TSDoc / Python docstrings from real code, no fluff.",
          contentLanguage: "markdown",
          content: `Generate documentation for the public API of this module. For each exported function, class, or type:
- one-sentence purpose (what it does, not how)
- parameters: name, type, what each represents (skip the obvious "the value")
- return: type + what it represents
- one runnable usage example

Do not invent behavior — if the source is unclear, write \`(unclear from source — clarify before publishing)\`. Output as TSDoc / Google-style docstrings inline with the source.

Source:
<paste here>`
        },
        {
          slug: "readme-skeleton",
          name: "README skeleton",
          url: "#",
          blurb: "Real structure for a repo's first README. No filler.",
          contentLanguage: "markdown",
          content: `Look at the repo structure and \`package.json\` (or \`pyproject.toml\` / \`Cargo.toml\`). Generate a README with these sections only:
1. One-sentence pitch.
2. \`Quickstart\` — exact commands to run from a clean clone to a working dev environment.
3. \`Project layout\` — only the directories that matter, with one-line notes.
4. \`Scripts\` — the two or three commands a developer will type daily.
5. \`Deploying\` — concrete, not "see CI".

Skip badges, contributing guidelines, code of conduct. Those go in separate files.

Repo info:
<paste here>`
        },
        {
          slug: "changelog-entry",
          name: "Changelog entry from a diff",
          url: "#",
          blurb: "User-facing language, no commit-message-speak.",
          contentLanguage: "markdown",
          content: `Convert this diff into a changelog entry. Audience: end users (not contributors). Rules:
- start each bullet with a verb in present tense (Add, Fix, Remove)
- describe user-visible behavior, not implementation
- group under headings: Added / Changed / Fixed / Removed / Deprecated
- skip purely internal cleanups

If a change is breaking, mark it with \`BREAKING:\` at the start of the bullet and add a one-line migration hint.

Diff:
<paste here>`
        }
      ]
    },
    {
      id: "design",
      resources: [
        {
          slug: "system-design-eval",
          name: "Evaluate a system design",
          url: "#",
          blurb: "Stress-tests the design before you build it.",
          contentLanguage: "markdown",
          content: `I'm proposing the following system design. Stress-test it for me. Specifically:
1. List three failure modes I haven't accounted for. For each, describe the scenario and the user-visible impact.
2. Identify the single biggest cost driver at 10x scale.
3. Identify the single biggest data-correctness risk.
4. Suggest the smallest change that addresses the worst of the above.

No "looks good overall" wrap-up. If the design is fine, say so plainly.

Design:
<paste here>`
        },
        {
          slug: "api-shape",
          name: "Design a clean public API",
          url: "#",
          blurb: "Forces decisions about naming, error shape, and idempotency upfront.",
          contentLanguage: "markdown",
          content: `Design the public REST (or GraphQL — pick one and explain) API for the following capability. Decide and justify:
- resource naming + URL structure
- request / response shape (with error shape — RFC 9457 / Problem Details unless you propose otherwise)
- idempotency strategy (which methods are idempotent, how to retry safely)
- versioning approach (URL path / header / not yet)
- pagination, filter, sort conventions

Write the spec as an OpenAPI 3.1 doc. Skip auth — assume a bearer token already in scope.

Capability:
<paste here>`
        },
        {
          slug: "trade-off-memo",
          name: "Two-option trade-off memo",
          url: "#",
          blurb: "One page, no hand-wringing. Forces a recommendation.",
          contentLanguage: "markdown",
          content: `Compare these two options and write a one-page memo. Sections:
1. Decision — pick one. No "it depends".
2. Why — three bullets. Concrete, measurable.
3. What we lose by not picking the other.
4. The first thing we'll regret about the chosen option, and how we'll mitigate it.

Tone: opinionated. Length: under 300 words.

Option A:
<paste here>

Option B:
<paste here>

Context:
<paste here>`
        }
      ]
    },
    {
      id: "agent",
      resources: [
        {
          slug: "agent-loop-skeleton",
          name: "Agent loop skeleton",
          url: "#",
          blurb: "Sets up a tool-calling loop with budget + termination conditions.",
          contentLanguage: "markdown",
          content: `Implement an agent loop in TypeScript with these properties:
- model: Claude Sonnet 4.6 via the Anthropic SDK
- tools: provided as the function schema below
- budget: max 10 tool calls and max 60 seconds wall-clock
- termination: stops when the model returns a final answer (no more tool_use blocks) OR budget hits

Output:
- the full loop code, typed
- the budget tracking
- a short test driver that runs the loop with a stub LLM and asserts it terminates

Do not call the network from tests. Use a mock that returns a scripted sequence of responses.

Tool schemas:
<paste here>`
        },
        {
          slug: "agent-eval",
          name: "Eval harness for an agent",
          url: "#",
          blurb: "Real failure modes — flaky tools, partial outputs, timeouts.",
          contentLanguage: "markdown",
          content: `Build an eval harness for the agent below. Cover these scenarios:
1. The first tool call returns an error — does the agent recover or surface it?
2. A tool returns truncated output — does the agent ask to continue, retry, or hallucinate?
3. The agent hits the call budget — does it return a partial-but-honest answer?
4. The user asks something the available tools cannot answer — does the agent decline cleanly?

Output as a single test file (vitest or pytest, your call) with these four cases. Each test asserts the OBSERVABLE outcome, not internal state.

Agent code:
<paste here>`
        }
      ]
    },
    {
      id: "ship",
      resources: [
        {
          slug: "rollout-plan",
          name: "Rollout plan",
          url: "#",
          blurb: "Real plan with a rollback step. Forces metric definition.",
          contentLanguage: "markdown",
          content: `I'm shipping the change below to <users>. Write a rollout plan with these sections:
1. Pre-flight checks — the three things I should verify locally + in staging.
2. Rollout steps — gated stages (1% → 25% → 100%) with exit criteria per stage.
3. Metrics that decide go / no-go between stages — name them and where they live.
4. Rollback plan — exact command, who owns it, expected time-to-rollback.

If any step requires a backfill or migration that cannot be rolled back, call that out explicitly.

Change:
<paste here>`
        },
        {
          slug: "incident-template",
          name: "Incident retro",
          url: "#",
          blurb: "Blameless retro template that doesn't drift into vague action items.",
          contentLanguage: "markdown",
          content: `Write a blameless incident retro. Sections:
1. Timeline — bullet per event, exact UTC timestamps from the data below.
2. What went well — one or two real positives, no fluff.
3. What surprised us — the gaps in our mental model, not "we should be better".
4. Action items — at most three. Each with: owner, exact deliverable, due date.

Skip "lessons learned" prose. The action items are the lessons.

Incident data:
<paste here>`
        }
      ]
    }
  ]
};
