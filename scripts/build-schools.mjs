import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const schools = [
  ['everest', 'everest-secondary-boarding-school'],
  ['surachana', 'surachana-english-school'],
  ['laligurans', 'laligurans-english-secondary-school'],
  ['vidyasagar', 'vidya-sagar-boarding-school'],
  ['dolphin', 'dolphin-english-secondary-school'],
  ['crescent', 'crescent-academy-english-school'],
];

const outputRoot = resolve('generated-websites');
mkdirSync(outputRoot, { recursive: true });

for (const [id, folder] of schools) {
  const result = spawnSync('npm', ['run', 'build'], {
    stdio: 'inherit',
    env: { ...process.env, VITE_SCHOOL_ID: id },
  });
  if (result.status !== 0) process.exit(result.status ?? 1);

  const target = resolve(outputRoot, folder);
  rmSync(target, { recursive: true, force: true });
  cpSync(resolve('dist'), target, { recursive: true });

  const assets = resolve(target, 'schools');
  if (existsSync(assets)) {
    for (const [otherId] of schools) {
      if (otherId !== id) rmSync(resolve(assets, otherId), { recursive: true, force: true });
    }
  }
}

console.log(`Created ${schools.length} school websites in ${outputRoot}`);
