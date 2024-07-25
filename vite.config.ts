import { type PluginOption, defineConfig } from "vite";
import { builtinModules } from "node:module";
import nodePolyfills from "rollup-plugin-polyfill-node";

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
		const prefixedModule = `node:${module}`;
		if (unavailableModules.includes(prefixedModule)) return acc;

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
			plugins: [
				nodePolyfills({
					include: unavailableModules,
				}),
			],
		},
	},
	plugins: [nodePrefixRewrite()],
});
