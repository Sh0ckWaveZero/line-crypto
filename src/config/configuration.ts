import type {
  Config,
  Default,
  ObjectType,
  Production,
} from './config.interface';

const util = {
  isObject<T>(value: T): value is T & ObjectType {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  merge<T extends ObjectType, U extends ObjectType>(
    target: T,
    source: U,
  ): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  const { config } = <{ config: Default }>await import('./envs/default');
  let env: any;
  if (process.env.NODE_ENV === 'production') {
    env = await import('./envs/production');
  } else {
    env = await import(`./envs/development`);
  }
  const { config: environment } = <{ config: Production }>await env;

  // object deep merge
  return util.merge(config, environment);
};
