import { type PluginOption, defineConfig } from "vite";
import { builtinModules } from "node:module";

const globals = {
	...builtinModules.reduce((acc: Record<string, string>, module: string) => {
		acc[`node:${module}`] = `node:${module}`;
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
		},
	},
	plugins: [nodePrefixRewrite()],
});
