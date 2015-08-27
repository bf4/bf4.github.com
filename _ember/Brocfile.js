/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false
    },
    sourcemaps: {
      "enabled": false,
      "extensions": ["js"]
    },
    outputPaths: {
      app: {
        html: 'index.html',
        css: { 'app': '/viewtastic.css'},
        js: "/assets/viewtastic.js"
      },
      vendor: {
        css: '/vendor.css',
        js: "/assets/vendor.js"
     }
   }
});


// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// see https://github.com/ember-cli/ember-cli/issues/3497
// consider ember-test-helpers
if (EmberApp.env() !== 'production') {
  app.import('bower_components/ember/ember-template-compiler.js');
}

module.exports = app.toTree();
