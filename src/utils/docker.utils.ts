import { spawnSync } from 'child_process';
import { projectRoot } from '../constants/shared';

export function getComposeProjects(): string[] {
  const result = spawnSync('docker', ['compose', 'ls', '--format', 'json'], {
    cwd: projectRoot,
    encoding: 'utf-8',
  });
  return JSON.parse(result.stdout.toString()).map((project: { Name: string; }) => project.Name);
}
