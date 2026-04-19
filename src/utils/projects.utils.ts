import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { projectRoot } from '../constants/shared';

export function getProjects(): string[] {
  const projects = readdirSync(join(projectRoot, 'projects'));
  return projects
    .filter((project) => statSync(join(projectRoot, 'projects', project)).isDirectory());
}

export function getEnvironments(project: string): string[] {
  const environments = readdirSync(join(projectRoot, 'projects', project, 'environments'));
  return environments
    .filter((environment) => environment.startsWith('.env.'))
    .map((environment) => environment.replace('.env.', ''));
}
