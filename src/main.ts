#!/usr/bin/env node
import { rawlist } from '@inquirer/prompts';
import { getComposeProjects } from './utils/docker.utils';
import { start, stop } from './utils/process.utils';
import { getEnvironments, getProjects } from './utils/projects.utils';

async function main(): Promise<void> {
  console.log(`
    ▄▄▄▄▄ ▄▄  ▄▄ ▄▄ ▄▄      ▄▄▄▄ ▄▄▄▄   ▄▄▄  ▄▄   ▄▄ ▄▄  ▄▄ ▄▄▄▄▄ ▄▄▄▄  
    ██▄▄  ███▄██ ██▄██ ▄▄▄ ███▄▄ ██▄█▀ ██▀██ ██ ▄ ██ ███▄██ ██▄▄  ██▄█▄ 
    ██▄▄▄ ██ ▀██  ▀█▀      ▄▄██▀ ██    ██▀██  ▀█▀█▀  ██ ▀██ ██▄▄▄ ██ ██ 
    
    `);
  const args = process.argv.slice(2);
  let command = args[0];
  if (!command) {
    command = await rawlist({
      choices: ['start', 'stop'],
      message: 'Select an option:',
    });
  }

  switch (command) {
  case 'start':
    return handleStart(args);
  case 'stop':
    return handleStop(args);
  default:
    console.error('Invalid command.');
    process.exit(1);
  }
}

async function handleStart(args: string[]): Promise<void> {
  const projects = getProjects();
  if (!projects.length) {
    console.error('No projects found in projects folder.');
    process.exit(1);
  }
  let project = args[1];
  if (project) {
    if (!projects.includes(project)) {
      console.error('Project not found.');
      process.exit(1);
    }
  } else {
    project = await rawlist({ choices: projects, message: 'Select a project:' });
  }

  const environments = getEnvironments(project);
  if (!environments.length) {
    console.error('No environments found for project.');
    process.exit(1);
  }
  let environment = args[2];
  if (environment) {
    if (!environments.includes(environment)) {
      console.error('Environment not found.');
      process.exit(1);
    }
  } else {
    environment = await rawlist({ choices: environments, message: 'Select an environment:' });
  }
  start(project, environment);
}

async function handleStop(args: string[]): Promise<void> {
  const composeProjects = getComposeProjects();
  if (!composeProjects.length) {
    console.error('No compose projects found.');
    process.exit(1);
  }
  const project = args[1];
  const environment = args[2];
  let composeProject = `${project}-${environment}`;
  if (project && environment) {
    if (!composeProjects.includes(composeProject)) {
      console.error('Compose project not found.');
      process.exit(1);
    }
  } else {
    composeProject = await rawlist({ choices: composeProjects, message: 'Select a compose project:' });
  }
  stop(composeProject);
}

main().catch(console.error);
