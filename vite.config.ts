import { type PluginOption, defineConfig } from "vite";
import { builtinModules } from "node:module";
import {
	type ModuleNameWithoutNodePrefix,
	nodePolyfills,
} from "vite-plugin-node-polyfills";

const supportedModules = [
	"assert",
	"async_hooks",
	"buffer",
	"events",
	"crypto",
	"diagnostics_channel",
	"path",
	"process",
	"stream",
	"string_decoder",
	"test",
	"util",
] as ModuleNameWithoutNodePrefix[];

const globals = {
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
		name: "prefix-rewrite",
		enforce: "pre",
		resolveId(source) {
			if (builtinModules.includes(source)) return { id: `node:${source}` };
		},
	} as PluginOption;
};

export default defineConfig({
	build: {
		lib: { entry: "./src/index.ts", name: "mikro-d1" },
		outDir: "./dist",
		rollupOptions: {
			external: Object.keys(globals),
			output: {
				globals,
			},
		},
	},
	plugins: [
		nodePrefixRewrite(),
		nodePolyfills({
			protocolImports: true,
			exclude: supportedModules,
		}),
	],
});
