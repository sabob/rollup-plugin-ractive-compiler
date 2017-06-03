# rollup-plugin-ractive-templates

A Rollup plugin to *import* and *compile* Ractive templates.

## Installation
``` 
npm i rollup-plugin-ractive-compiler --save-dev
```

## Usage

```js
let rollup = require( 'rollup' );
let ractiveCompiler = require( 'rollup-plugin-ractive-compiler' );

rollup({
    entry: 'app.js',

    plugins: [
	
        ractiveCompiler({
    
            // compile is true by default
            compile: true,
     
            // default extensions are .html and .htm
            extensions: [ '.html', '.htm' ],

            // include is required to be specified, can be a minimatch pattern or an array of minimatch patterns
            include: '**/*.html'

            // Exclude is optional. Can a minimatch pattern or an array of minimatch patterns
            exclude: '**/*.text.html'
        })
    ]
});
```
