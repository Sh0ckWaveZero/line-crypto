import type { config as base } from './envs/default';
import type { config as production } from './envs/production';

export type ObjectType = Record<string, unknown>;
export type Default = typeof base;
export type Production = typeof production;
export type Config = Default & Production;
