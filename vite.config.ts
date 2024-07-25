import { type PluginOption, defineConfig } from "vite";
import { builtinModules } from "node:module";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const unavailableModules = [
	"events",
	"timers",
	"tty",
	"fs",
	"constants",
	"path",
	"module",
	"os",
	"url",
	"async_hooks",
];

const globals = {
	...builtinModules.reduce((acc: Record<string, string>, module: string) => {
		if (unavailableModules.includes(module)) return acc;

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
			if (unavailableModules.includes(source)) return;
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
	plugins: [nodePrefixRewrite(), nodePolyfills({ protocolImports: false })],
});
