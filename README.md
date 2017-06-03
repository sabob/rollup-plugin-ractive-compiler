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

			// include is required to be specified, can be a minimatch pattern or an array of 
			// minimatch patterns, relative to process.cwd()
			include: '**/*.html'

			// Exclude is optional. Can be a minimatch pattern or an array of minimatch patterns, 
			// relative to process.cwd()
			exclude: '**/*.text.html'
		})
	]
});
```

In the example above, we use the *include* property to indicate which files are handled as Ractive templates. We can specify the *exclude* property to exclude paths from being processed by this plugin.

The *extensions* property controls which file extensions are allowed, by default '*.html'* and *'.htm'*.

With our plugin in place we can import and compile our Ractive templates.

Given the Ractive template, *template.html*:

```html
<div>Hello {{name}}</div>
```
we can import it as follows:
```js
import viewTemplate from './template.html';
import Ractive from 'Ractive.js';

let view = new Ractive({
	el: '#main',
	template: viewTemplate,
	data: { name: 'World' }
});
```

## Why we need this plugin?
The ES6 modules (as far as I now) does not allow importing text files as modules. So if we want to import plain *html* or *json* we are out of luck.

For example, when using a Model/View/Controller pattern we can import the Controller and Model because they themselves can be Javascript modules:

```js
import controller from './controller.js';
import model from './model.js';
let view = '<div>Hello world</div>';

let mvc = createMVC(model, view, controller);
```

Ideally we want to import the View (HTML Template) as well:

```js
import view from "./view.html";
```

But ES6 Modules doesn't allow us (at least yet) to import text.

A second issue we face is when a [Ractive](https://ractive.js.org) instance is created the template is compiled into a format that Ractive can understand. Compiling the template has some overhead so in *production* environments we want to *precompile* our templates. so that Ractive doesn't have to do it at runtime. 

## Goal

We want to import our html templates just as easily as Javascript modules.

Given our view *view.html*:

```html
<div>Hello {{name}}</div>
```

we want to do this:

```js
import controller from "./controller.js";
import model from "./model.js";
import view from "./view.js";

let mvc = createMVC(model, view, controller);
```

Now our HTML View can be managed in it's own separate *.html* file with syntax highlighting provided by an editor.

We also want an option to [precompile](https://ractive.js.org/api/parse/) our templates for production use.

## Solution
This [Rollup](https://rollupjs.org/) plugin allows us to both *import* and *compile* Ractive templates.

By default this plugin will compile the Ractive templates, but it is possible to disable compiling during *development*.

The following options are supported:

```js
ractiveCompiler({
    
	// compile is true by default
	compile: true,
     
    // default extensions are .html and .htm
	extensions: [ '.html', '.htm' ],

	// include is required to be specified, can be a minimatch pattern or an array of minimatch patterns, relative to process.cwd()
	include: '**/*.html'
	// or
	include: ['**/templates/*.html', '**/views/*.html']

      // Exclude is optional. Can be a minimatch pattern or an array of minimatch patterns, relative to process.cwd()
      exclude: '**/*.text.html'
      	// or
	  exclude: ['**/*.text.html', '**/*.plain.html']
    })

```

The *include* and *exclude* properties allow [minimatch](https://www.npmjs.com/package/minimatch) patterns or array of minimatch patterns to finely control which templates should be processed by this plugin. 

The **extensions** property specifies an array of file extensions to further control which files are processed.

What if we want to *import* text/html files that aren't Ractive templates?

```js
import someText from 'templates/some.text.html';
import someData from 'templates/data.json';
```
In this case we can use another Rollup plugin: [https://github.com/TrySound/rollup-plugin-string](https://github.com/TrySound/rollup-plugin-string).

## Example

Here is an example showing how to import and compile ractive templates as well as iporting non-ractive html/text or json files.

```js
var rollup = require( 'rollup' );
var ractiveCompiler = require( 'rollup-plugin-ractive-compiler' );
var stringToModule = require( 'rollup-plugin-string' );

rollup({

	entry: 'app.js',
	
  plugins: [
  
	// Setup ractive compiler plugin
    ractiveCompiler({
    
		// compile is true by default
		compile: false,

		 // Include all html files
		include: '**/*.html'

		// Exclude html files containing '.text.' in their names.
      	exclude: '**/*.text.html'
    	}),
    
    	// Setup 'string' plugin
    	stringToModule({
				// Include html files containing '.text.' in their names as well as .json files
				include: [ '**/*.text.html', '**/*.json' ]
			})
	]
});
```

In the example above, we use the *ractiveCompiler*' *include* property to indicate which files are handled as Ractive templates.

include: **&ast;&ast;/&ast;.html** says include all *html* files in all folders to be loaded and compiled into Ractive templates. *include* can also accept an array of values: 

```js
['**/templates/*.html', '**/views/*.html']
```

this says *include* all html files in the *templates* and *views* folders.

We can also specify the *exclude* property to exclude certain files:

exclude: **&ast;&ast;/&ast;.text.html** says all files with the string **.text.** in them, will be excluded eg. ```some.text.html``` won't be compiled by this plugin.

Next we configure the **rollup-plugin-string** to *include* files containing the string **.text.** in their names as well as **.json** files. 

With this setup in place we can *import* both ractive and non-ractive templates and data files.

```js
import ractiveTemplate from './ractiveTemplate.html';
import plainText from './plain.text.html';
import someJson from './some.json';
```

To differentiate between ractive and on-ractive templates we can also use a naming convention based on file extensions. 

We can specify Ractive templates as having the extension **.htm** and non-ractive templates with extension **.html**. Most editors handle both *.htm* and *.html* extensions as HTML so syntax highlighting will be applied to both files.

For example:

```js
var rollup = require( 'rollup' );
var ractiveCompiler = require( 'rollup-plugin-ractive-compiler' );
var stringToModule = require( 'rollup-plugin-string' );

rollup({
	entry: 'app.js',
  	plugins: [
  
		ractiveCompiler({
			// we specify .htm extension for racitive templates
			include: '**/*.htm',
			
		 	// default extensions are .html and .htm, so we don't need to specify anything here
			// extensions: [ '.html', '.htm' ]
    	}),
    
    	stringToModule({
	    	// we specify .html extension as html files (non ractive templates)
			include: '**/*.html'
		})
	]
});
```

If we want to use an alternative extension for our ractive templates ie. **'.ract'** we must adjust the plugin' *extensions* property:

```js
ractiveCompiler({
	include: '**/*.ract',
		
	// default extensions are .html and .htm
	// here we specify a different set of extensions
	extensions: [ '.html', '.ract' ]
});
```
