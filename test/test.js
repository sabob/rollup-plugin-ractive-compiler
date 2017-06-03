const assert = require( 'assert' );
const { rollup } = require( 'rollup' );
const ractiveCompiler = require( '..' );

process.chdir( __dirname );

function executeBundle( bundle ) {
	const generated = bundle.generate( {
		format: 'cjs'
	} );

	const fn = new Function( 'require', 'module', 'assert', generated.code );
	let module = { };

	fn( require, module, assert );	

	return module;
}

describe( 'rollup-plugin-ractive-compiler', () => {

	it.only( 'compiles a template', () => {

		return rollup( {

			entry: 'samples/basic/view.js',

			plugins: [ ractiveCompiler( {
					include: '**/*.html'

				} ) ]

		} ).then( executeBundle );
	} ),
			it.only( 'include an uncompiled template { compile: false }', () => {

				return rollup( {

					entry: 'samples/uncompiled/view.js',

					plugins: [ ractiveCompiler( {
							compile: false,
							include: '**/*.html'

						} ) ]

				} ).then( executeBundle );
			} );
} );