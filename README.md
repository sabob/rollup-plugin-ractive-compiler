# rollup-plugin-ractive-templates

A Rollup plugin to *import* and *compile* Ractive templates.

## Installation
``` 
npm i rollup-plugin-ractive-compiler --save-dev
```

## Usage
```
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
&ast; [minimatch](https://www.npmjs.com/package/minimatch)

In the example above, we use the *include* property to indicate which files are handled as Ractive templates. We can specify the *exclude* property to exclude certain templates from being handled by this plugin.''

The *extensions* property controls which file extensions are allowed, by default '*.html'* and *'.htm'*.

With our plugin in place we can import and compile our Ractive templates.

Given the Ractive template, *template.html*:
```
<div>Hello {{name}}</div>
```
we can import it as follows:
```
import viewTemplate from './template.html';
import Ractive from 'Ractive.js';

let view = new Ractive({
	el: '#main',
	template: viewTemplate,
	data: { name: 'World' }
});

```

## Why
The ES6 module standard only allows importing Javascript modules. So if we want to import plain *html* or *text* we are out of luck.

For example, when using a Model/View/Controller pattern we can easily import the Controller and Model because they are Javascript modules:

```js
import controller from "./controller.js";
import model from "./model.js";
let view = "<div>Hello world</div>";

let mvc = createMVC(model, view, controller);
```

But we also want to import the View (HTML Template) like so:

```js
import view from "./view.html";
```

But ES6 Modules doesn't allow us (at least yet) to import plain text/html.

When a [Ractive](https://ractive.js.org) instance is created the template is compiled into a format that Ractive can understand. Compiling the template has some overhead so in *production* environments we want to *precompile* our templates. so Ractive don't have to do it at runtime. 

## Goal

We want to import our html templates just as easily as Javascript modules.

Given our view *view.html*:
```html
<div>Hello {{name}}</div>
```

We want to simply do this:
```js
import controller from "./controller.js";
import model from "./model.js";
import view from "./view.js";

let mvc = createMVC(model, view, controller);
```
Now our HTML View can be managed in it's own separate *.html* file with syntax highlighting provided by the editor.

We also want an option to precompile](https://ractive.js.org/api/parse/) our templates for production use.

## Solution
This [Rollup](https://rollupjs.org/) plugin will both import and compile Ractive templates.

By default this plugin will compile the Ractive templates, but it is possible to disable compiling during *development*.

To disable compiling set the **compile** property to *false*.

## Non-Ractive html / text files

What if we want to *import* text/html files that aren't Ractive templates?
```
import someText from 'templates/some.text.html';
import someData from 'templates/data.json';
```

In that case we can use [https://github.com/TrySound/rollup-plugin-string](https://github.com/TrySound/rollup-plugin-string).

## Example

Here is an example showing how to import and compile Ractive templates as well as non-ractive html/text.

```
var rollup = require( 'rollup' );
var ractiveCompiler = require( 'rollup-plugin-ractive-compiler' );
var stringToModule = require( 'rollup-plugin-string' );

rollup({
  entry: 'app.js',
  plugins: [
    ractiveCompiler({
    
    // compile is true by default
     compile: false,

      // include is required to be specified, can be a minimatch pattern or an array of minimatch patterns
      include: '**/*.html'

      // Exclude is optional. Can a minimatch pattern or an array of minimatch patterns
      exclude: '**/*.text.html'
    }),
    
    stringToModule({
			include: '**/*.text.html'
		})
  ]
});
```

&ast; [minimatch](https://www.npmjs.com/package/minimatch)

In the example above, we use the *include* property to indicate which files are handled as Ractive templates.

**&ast;&ast;/&ast;.html** says all *html* files in all folders will be loaded and compiled into Ractive templates. *include* also accepts an array of values: 

```
['**/templates/*.html, '**/views/*.html']
```
this says *include* all html files in the *templates* and *views* folders.

We can also specify the *exclude* property to exclude certain files:

**&ast;&ast;/&ast;.text.html** says all files with the string **.text.** in them, will be excluded eg. ```some.text.html``` won't be compiled by this plugin.

We then configure the **rollup-plugin-string** to *include* files containing the string **.text.**. 

With this setup in place we can *import* both ractive and non-ractive templates.

To differentiate between ractive and on-ractive templates we can use a naming convention based on file extensions. 

We can specify Ractive templates as having the extension **.htm** and non-ractive templates with extension **.html**. Most editors handle both *.htm* and *.html* as html files so syntax highlighting will be applied to both files.

For example:

```
var rollup = require( 'rollup' );
var ractiveCompiler = require( 'rollup-plugin-ractive-compiler' );
var stringToModule = require( 'rollup-plugin-string' );

rollup({
  entry: 'app.js',
  plugins: [
  
    ractiveCompiler({
		include: '**/*.htm',
		 // default extensions are .html and .htm
		extensions: [ '.html', '.htm' ]
    }),
    
    stringToModule({
		include: '**/*.html'
	})
  ]
});
```

If we want to use alternative extensions for our templates ie. **'.ract'** for ractive templates we must adjust the *extensions* property:

```
ractiveCompiler({
		include: '**/*.ract',
		
		// default extensions are .html and .htm
		// here we specify a different set of extensions
		extensions: [ '.html', '.ract' ]
    })
```
