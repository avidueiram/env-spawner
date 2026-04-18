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
npm install -g .
```

## Available commands

```bash
# Builds the reusable image `env-spawner-firebase` from `Dockerfile-firebase`.
env-spawner build:firebase

# Starts one environment using `compose.yaml` + `environments/<environment>.yaml`.
env-spawner start <environment>

# Attaches shell to the running `env-spawner` service.
env-spawner attach <environment>

# Lists all environments spawned.
env-spawner list

# Stops/removes all environments spawned.
env-spawner kill
```

## Typical workflow

### Add a new environment

Create a new overlay file named `<environment>.yaml` in `environments/` directory. You can use the `example-a.yaml` and `example-b.yaml` as a reference.

Example: `example-a.yaml`

### Build the base image

You can build the base image with `env-spawner build` command. If you need to add or remove any tools, you can edit the `Dockerfile` file and then build the image again.

### Start & attach to an environment

```bash
# Start an environment
env-spawner start example-a

# Attach to an environment
env-spawner attach example-a

# You will be attached to the environment shell, then you can run the commands you need inside the container.
# For example, if you want to run the frontend, you can run:
cd example
npm run start

# Then you can quit from the environment shell with:
exit

# You can list all environments spawned with:
env-spawner list

# You can stop/remove an environment with:
env-spawner kill example-a

# Or you can stop/remove all environments spawned with:
env-spawner kill
```
