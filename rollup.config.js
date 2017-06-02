import buble from 'rollup-plugin-buble';

export default {
	entry: 'src/index.js',
	plugins: [ buble() ],
	targets: [
		{ dest: 'dist/rollup-plugin-ractive-compiler.cjs.js', format: 'cjs' },
		{ dest: 'dist/rollup-plugin-ractive-compiler.es.js', format: 'es' }
	]
};