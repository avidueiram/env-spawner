# AGENTS Guide - env-spawner

This guide is for coding agents working in this repository.
Follow this document unless an explicit user request overrides it.

## Repository Purpose
- Project type: Node CLI + Bash scripts + Docker Compose overlays.
- Entrypoint: `bin/main.js`.
- Supported commands: `start`, `attach`, `build`, `kill`, `list`.
- Behavior:
  - Build a reusable image named `env-spawner`.
  - Start compose environment with `compose.yaml` + `<project>.yaml`.
  - Attach to `env-spawner` service shell.
  - List/kill containers with label `env-spawner=true`.

## Repository Layout
- `bin/main.js`: CLI dispatch and process execution.
- `scripts/start.sh`: runs `docker compose ... up -d`.
- `scripts/attach.sh`: runs `docker compose ... exec env-spawner sh`.
- `scripts/utils.sh`: shared shell helpers for validation and logging.
- `compose.yaml`: base service definition.
- `*.yaml` overlays: project-specific ports, volumes, and working dir.
- `Dockerfile`: base image with Node, Bun, Firebase CLI, Ionic CLI.

## Prerequisites
- Node.js + npm.
- Docker Engine/Desktop with Compose v2 (`docker compose`).
- Bash available locally.
- Local paths used by overlay volumes must exist and be accessible.

## Build / Lint / Test Commands

### Build and Runtime
- Build image: `npm run build`

### Lint (Current State)
- No `lint` script exists in `package.json`.
- No ESLint/Prettier/ShellCheck config is present.
- Practical checks when editing:
  - JS syntax: `node --check bin/main.js`
  - Shell syntax: `bash -n scripts/start.sh scripts/attach.sh scripts/utils.sh`

### Test (Current State)
- No `test` script exists in `package.json`.
- No test framework is configured in this repository.
- This repo is orchestration glue; validation is mostly smoke testing.

### Single Test Execution
- For this repo today: not available (no automated tests).
- If tests are introduced, require both patterns:
  - Full suite: `npm test`
  - Single test file/pattern: `npm test -- <path-or-pattern>`
- Until then, use targeted runtime checks:
  - `npm run build`
  - `npm run start -- <project>`
  - `npm run attach -- <project>`
  - `npm run list`
  - `npm run kill`

## Agent Verification Checklist
- After editing `bin/main.js`:
  - Run `node --check bin/main.js`.
  - Run at least one CLI flow (for example `npm run list`).
- After editing shell scripts:
  - Run `bash -n` on edited files.
  - Exercise the changed flow (`start` and/or `attach`).
- After editing `Dockerfile` or compose YAML:
  - Rebuild with `npm run build`.
  - Start/attach once to verify container behavior.
- Clean up spawned resources with `npm run kill` when done.

## Code Style Guidelines

### General
- Keep changes minimal and task-focused.
- Preserve existing behavior unless user requested a change.
- Avoid adding dependencies unless necessary.
- Keep logs concise and actionable.

### JavaScript Style (`bin/main.js`)
- Use CommonJS (`require`) to match existing code.
- Use single quotes and semicolons.
- Prefer `const`; use `let` only for reassignment; avoid `var`.
- Use descriptive `camelCase` names.
- Keep command handling data-driven via a command map.
- Fail fast on invalid command input with clear usage text.
- Use `spawnSync` with explicit `cwd` and `stdio: 'inherit'`.
- Use shell mode only when truly required.
- Propagate child exit code (`process.exit(result.status ?? 1)`).

### Shell Style (`scripts/*.sh`)
- Keep shebang as `#!/bin/bash`.
- Reuse shared helpers from `scripts/utils.sh`.
- Validate required args before invoking Docker.
- Quote variables unless deliberate splitting is intended.
- Use `if ! cmd; then ... fi` around critical calls.
- Route fatal paths through `print_error` for consistent exits.
- Keep scripts single-purpose and readable.

### YAML Style (`compose.yaml`, overlays)
- Use two-space indentation.
- Keep service name `env-spawner` consistent.
- Put only project-specific overrides in overlay files.
- Avoid duplicating base compose keys unless overriding.

## Imports, Formatting, Types, Naming, Errors
- Imports:
  - Built-in Node modules first.
  - Import only what is used.
- Formatting:
  - Match current style per file type.
  - Do not introduce unrelated formatting churn.
- Types:
  - No TypeScript currently.
  - Enforce runtime validation at CLI/script boundaries.
- Naming:
  - Prefer explicit names over abbreviations.
  - Keep public command names stable.
- Error handling:
  - Return non-zero on failures.
  - Include enough context to recover quickly.
  - Keep log prefix format consistent (`[$script_name]`).

## Cursor/Copilot Rules Status
- Checked `.cursor/rules/`: not present.
- Checked `.cursorrules`: not present.
- Checked `.github/copilot-instructions.md`: not present.
- If any appear later, treat them as high-priority repository rules.

## Maintenance Guidance
- Update this file when adding scripts, tests, or lint tools.
- Update this file when changing CLI command semantics.
- Keep command examples accurate with `package.json` scripts.
- Keep this document concise and operational for autonomous agents.

## Quick Command Reference
- `npm run build`
- `npm run start -- <project>`
- `npm run attach -- <project>`
- `npm run list`
- `npm run kill`
- `node --check bin/main.js`
- `bash -n scripts/start.sh scripts/attach.sh scripts/utils.sh`
