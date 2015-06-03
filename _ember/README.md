# Viewtastic

## An ember-cli app for rendering components outside of Ember

1. mkdir _ember; cd _ember
1. ember init --name=viewtastic
2. ember install ember-islands
3. ember g component doc-printer // name must have a hyphen
4. Config Brocfile as needed/desired
5. edit app/index.html to add a data component, e.g. `<div data-component="doc-printer"></div>`
6. ember build -e production
7  cp dist/assets/*.js ../js // or wherever
8. edit the page(s) you want the component on to load the js and include the data-component

```html
<script src="js/vendor.js"></script>
<script src="js/viewtastic.js"></script>
<div data-component="doc-printer"></div>
```

8. profit

Gotchas, things to make it work
- Brocfile.js
- meta

Boiler-plate follows

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

