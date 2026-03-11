#!/usr/bin/env node
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const subcommand = args[0];

const scripts = {
  start: { type: 'script', path: 'scripts/start.sh' },
  attach: { type: 'script', path: 'scripts/attach.sh' },
  build: { type: 'docker', cmd: 'docker', argv: ['build', '-t', 'env-spawner', '.'] },
  kill:  { type: 'docker', cmd: 'bash', argv: ['-c', 'docker ps -aq --filter "label=env-spawner=true" | xargs -r docker rm -f'] },
  list:  { type: 'docker', cmd: 'docker', argv: ['ps', '--filter', 'label=env-spawner=true'] },
};

const spec = scripts[subcommand];
if (!spec) {
  console.error('Usage: env-spawner <start|attach|build|kill|list> [args...]');
  process.exit(1);
}

let result;
if (spec.type === 'script') {
  result = spawnSync('bash', [path.join(projectRoot, spec.path), ...args.slice(1)], {
    cwd: projectRoot,
    stdio: 'inherit',
  });
} else {
  // build: spawnSync('docker', spec.argv, { cwd: projectRoot, stdio: 'inherit' });
  // kill needs a shell for the $(...) substitution
  result = spawnSync(spec.cmd, spec.argv, { cwd: projectRoot, stdio: 'inherit', shell: spec.shell || false });
}

process.exit(result.status ?? 1);
