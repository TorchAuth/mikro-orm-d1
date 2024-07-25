import { type PluginOption, defineConfig } from "vite";
import { builtinModules } from "node:module";
import nodePolyfills from "rollup-plugin-polyfill-node";

const unavailableModules = [
	"node:events",
	"node:timers",
	"node:tty",
	"node:fs",
	"node:constants",
	"node:path",
	"node:module",
	"node:os",
	"node:url",
	"node:async_hooks",
];

const globals = {
	...builtinModules.reduce((acc: Record<string, string>, module: string) => {
		const prefixedModule = `node:${module}`;
		// if (unavailableModules.includes(prefixedModule)) return acc;

		acc[prefixedModule] = prefixedModule;
		return acc;
	}, {}),
};

/** This plugin rewrites all node builtins to node:$1 */
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
			plugins: [
				nodePolyfills({
					include: unavailableModules,
				}),
			],
		},
	},
	plugins: [nodePrefixRewrite()],
});
