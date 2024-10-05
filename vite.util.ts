import { builtinModules } from 'node:module';
import type { PluginOption } from 'vite';
import {
  type ModuleNameWithoutNodePrefix,
  nodePolyfills,
} from 'vite-plugin-node-polyfills';

const supportedModules = [
  'assert',
  'async_hooks',
  'buffer',
  'events',
  'crypto',
  'diagnostics_channel',
  'path',
  'process',
  'stream',
  'string_decoder',
  'test',
  'util',
] as ModuleNameWithoutNodePrefix[];

export const globals = {
  ...builtinModules.reduce((acc: Record<string, string>, module: string) => {
    if (!supportedModules.includes(module as ModuleNameWithoutNodePrefix))
      return acc;

    const prefixedModule = `node:${module}`;
    acc[prefixedModule] = prefixedModule;
    return acc;
  }, {}),
};

/** This plugin rewrites all CF node builtin imports to node:$1, and leaves alone non-compatible modules */
const nodePrefixRewrite = () => {
  return {
    name: 'prefix-rewrite',
    enforce: 'pre',
    resolveId(source) {
      if (builtinModules.includes(source)) return { id: `node:${source}` };
    },
  } as PluginOption;
};

export const plugins = [
  nodePrefixRewrite(),
  nodePolyfills({
    protocolImports: true,
    exclude: supportedModules,
  }),
];
