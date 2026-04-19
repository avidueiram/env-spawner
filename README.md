# env-spawner

`env-spawner` is a small CLI + Docker Compose helper to spin up isolated development environments.

The goal is simple:

- Spawn a containerized environment per project copy
- Attached specified volume paths to the container
- Attach a shell to run your stack (frontend, backend, databases, Firebase emulators, etc)
- Expose container services back to the host via mapped ports

This is especially useful when you want multiple copies of the same platform running in parallel without port or directory conflicts. It also works well for AI coding agents so each one has its own isolated infra sandbox.

## Prerequisites

- Node.js + npm / bun
- Docker

## Install

```bash
bun install
bun run build
npm install -g .
```

## Available commands

```bash
# Builds the reusable image `env-spawner-app` from `Dockerfile-app`.
env-spawner build:app

# Builds the reusable image `env-spawner-firebase` from `Dockerfile-firebase`.
env-spawner build:firebase

# Builds the reusable image `env-spawner-server` from `Dockerfile-server`.
env-spawner build:server

# Start env-spawner interactive mode.
env-spawner

# Starts one project environment using `compose.yaml` + `projects/<project>/compose.yaml` + `projects/<project>/environments/.env.<environment>`.
env-spawner start <project> <environment>

# Stops/removes one project environment spawned.
env-spawner stop <project> <environment>
```

## Typical workflow

WIP
