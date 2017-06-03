# rollup-plugin-ractive-templates

A Rollup plugin to *import* and *compile* Ractive etemplates.

## Installation
``` 
npm i rollup-plugin-ractive-compiler --save-dev
```

## Usage

```js
import { rollup } from 'rollup';
import ractiveCompiler from 'rollup-plugin-ractive-compiler';

rollup({
  entry: 'app.js',
  plugins: [
    ractiveCompiler({
    
    // compile is true by default
     compile: false,

      // include is required to be specified, can be a minimatch pattern or an array of minimatch patterns
      include: '**/*.html',

      // Exclude is optional. Can a minimatch pattern or an array of minimatch patterns
      exclude: '**/*.text.html'
    })
  ]
});
```

&ast; [minimatch](https://www.npmjs.com/package/minimatch)

In the example above, we use the *include* property to indicate which files are handled as Ractive templates.

**&ast;&ast;/&ast;.html** says all *html* files will be loaded and compiled into Ractive templates.

We can also use the *exclude* property to exclude certain files:

**&ast;&ast;/&ast;.text.html** says all files with the path *.text.* in them, will be excluded eg. *some.text.html' won't be loaded or compiled by this plugin.


     // Here we use a naming convention to exclude '.html' templates with '.text' in their names
      // eg. 'someHtml.text.html' will be excluded
```

## Problem
The ES6 module standard only allows importing Javascript modules. So if we want to import *text* or *html* we are out of luck.

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

But ES6 Modules doesn't allow us (at least yet) to import plain text.

## Goal

We want to import text files just as easily as Javascript modules.

Given our view *view.html*:
```html
<div>Hello world</div>
```

this should be possible:
```js
import controller from "./controller.js";
import model from "./model.js";
import view from "./view.js";

let mvc = createMVC(model, view, controller);
```

If the view is a [Ractive template])(https://ractive.js.org) it should be possible to [precompile](https://ractive.js.org/api/parse/) the template for production use.

```js
import view from "./view.html";
```

That way our HTML View can be managed in it's own separate *.html* file with syntax highlighting provided by the editor.

## Solution

## Non-Ractive text files

What if we want to *import* text/html files that aren't Ractive templates?

In that case we can use [https://github.com/TrySound/rollup-plugin-string](https://github.com/TrySound/rollup-plugin-string).

