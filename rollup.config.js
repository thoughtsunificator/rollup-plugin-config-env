import babel from 'rollup-plugin-babel';
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { builtinModules } from 'module';
import pkg from './package.json';

export default {
	input: 'lib/index.js',
	external: builtinModules,
	plugins: [
		nodeResolve(),
		babel({
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							node: '8.0.0',
						},
					},
				],
			],
		}),
	],
	output: [
		{
			format: 'cjs',
			file: pkg.main,
		},
		{
			format: 'es',
			file: pkg.module,
		},
	],
};
