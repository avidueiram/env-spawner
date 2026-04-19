import { spawnSync } from 'child_process';
import { join } from 'path';
import { projectRoot } from '../constants/shared';

export function start(project: string, environment: string): void {
  const result = spawnSync('bash', [join(projectRoot, 'scripts/start.sh'), project, environment], {
    cwd: projectRoot,
    stdio: 'inherit',
  });
  process.exit(result.status ?? 1);
}

export function stop(composeProject: string): void {
  const result = spawnSync('bash', [
    '-c',
    `docker ps -aq --filter "label=com.docker.compose.project=${composeProject}" | xargs -r docker rm -fv`,
  ], {
    cwd: projectRoot,
    stdio: 'inherit',
  });
  process.exit(result.status ?? 1);
}
