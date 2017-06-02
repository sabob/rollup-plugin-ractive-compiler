# rollup-plugin-ractive-templates

A Rollup plugin to *import* and *compile* Ractive etemplates.

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

