'use strict';

import { extname } from 'path';
import Ractive from 'ractive';
import { createFilter } from 'rollup-pluginutils';

function ractiveCompiler ( options ) {
	if ( options === void 0 ) options = {};

	if (!options.include) {
		throw Error('include option must be specified for rollup-plugin-ractive-compiler');
	}

	var filter = createFilter( options.include, options.exclude );

	var extensions = options.extensions || [ '.html', '.htm' ];
	var parseOptions = options.options || {};

	let obj = {
		name: 'ractive-compiler',

		compile: options.compile == null ? true : options.compile,

		transform: function transform ( code, id ) {
			if ( !filter( id ) ) { return null; }

			if ( !~extensions.indexOf( extname( id ) ) ) { return null; }

			let parsedTpl = code;

			if ( obj.compile ) {
				//Parse template in Ractive			
				parsedTpl = Ractive.parse(code, parseOptions);
			}

			return {
			  code: ('export default ' + (JSON.stringify(parsedTpl)) + ';'),
			  map: { mappings: '' }
			};
		}
	};

	return obj;
}

module.exports = ractiveCompiler;
