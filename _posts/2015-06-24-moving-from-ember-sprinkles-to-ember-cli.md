---
layout: post
title: "Ember: Moving from Ember sprinkles to Ember CLI. Part 2"
description: "Part 2: Using Ember Components in a static site"
permalink: "ember-cli-components"
categories: [ 'javascript' ]
tags: [ 'ember' ]
published: true
---
{% include JB/setup %}

Following [ember-sprinkling-in-components](/ember-sprinkling-in-components)

Note, this was written using Ember 1.13.0.

## Why?

Ember rendering Component

- Like web components
- Like react components
- Just Ember without a router
- Just Ember not a single page app (SPA)

Can make just an HTML page with one or more Ember apps on it (via rootNode)

## Acknowledgements

[Mitch Lloyd](https://twitter.com/too_mitch) paired with me to bootstrap and write
the core work of setting up an ember-cli components-only app, and for his work in writing
[Ember-Islands](https://github.com/mitchlloyd/ember-islands).

Many thanks as well to many others in the [embercommunity slack](https://ember-community-slackin.herokuapp.com)
for their assistance.

## Getting Started

You'll want to install npm, bower, and ember-cli and use a recent version of Node.js.  Here's what I did (on OSX):

{% highlight bash %}
#!/usr/bin/env bash
# http://www.ember-cli.com/user-guide/
# Install nvm and node https://github.com/creationix/nvm
set -e

install() {
 brew install "$@" || echo "$!"
}
configure_nvm() {
  # BEGIN add to ~/.bash_profile
  nvm_sh=$(brew --prefix nvm)/nvm.sh
  if [ -f $nvm_sh ]; then
    export NVM_DIR=~/.nvm
    source $nvm_sh
  fi
  # END add to ~/.bash_profile
}
mkdir -p ~/.nvm
install nvm || echo "$!"
configure_nvm
export NODE_VERSION=${NODE_VERSION:-0.12.4}
nvm install $NODE_VERSION || echo "$!"
nvm use $NODE_VERSION --default

nvm --version  # 0.24.1
npm --version  # 2.10.1
node --version # v0.12.4

# Once you’ve installed Node, you’ll need to install the Ember CLI globally with:
npm install -g ember-cli
ember  --version # 0.2.7

# You’ll need to install Bower, a package manager that keeps your front-end dependencies (including JQuery, Ember, and QUnit) up to date. This is as easy as running:
npm install -g bower
bower --version # 1.4.7

# If you want to use PhantomJS to run your integration tests, it needs to be installed globally.
npm install -g phantomjs
phantomjs --version # 1.9.8

# If you want less-error-prone file change watching
install watchman
watchman --version # 3.1.0
{% endhighlight %}

## Basic steps

An Ember CLI app for rendering Ember Components outside of an Ember app.

1. Create and enter the directory for your Ember app: `mkdir _ember; cd _ember`.

2. Pick a name for your Ember app, and create it: `ember init --name=viewtastic`
  (or `ember init --dry-run --name=viewtastic` to preview what files would be added/changed.).

3. Generate a Component. Its name must have a hyphen.  e.g. `ember g component doc-printer`.

4. Config `Brocfile.js` (or [ember-cli-build.js](https://github.com/ember-cli/ember-cli/blob/master/TRANSITION.md#how)
  as needed/desired). See `Gotchas` below.

5. Edit `app/index.html` to add a data component, e.g. `<div data-component="doc-printer"></div>`.

6. Make it super easy to render Ember Components in a non-Ember app: `ember install ember-islands`.

7. Build the Ember app assets: `ember build -e production`.

8. Copy the desired assets into your non-Ember app: e.g. `cp dist/assets/{vendor,viewtastic}.js ../assets/`.

9. Add the data-component element [Ember-Islands](https://github.com/mitchlloyd/ember-islands)
  is looking for and load the generated assets on the page(s) you want.

10. Profit.

11. Attend to the gotchas, below:

1) We need to disable 'storeConfigInMeta'.

As the [EmberCLI guide states](http://www.ember-cli.com/user-guide/#application-configuration)

> This meta tag is required for your ember application to function properly.

Because Ember doesn't control our app's html, we need to disable 'storeConfigInMeta'.

> [The meta] tag [will] be part of your compiled javascript files

2) We need to turn off 'fingerprinting' of our production-built assets.

We don't want to have to change the script src in our site every time we change our
Ember app. Per the [EmberCLI guide](http://www.ember-cli.com/user-guide/#fingerprinting-and-cdn-urls)

> `enabled` - Default: `app.env === 'production'` - Boolean. Enables fingerprinting if true.
> **True by default if current environment is production.**

So, in our `Brocfile.js`, we have

{% highlight javascript %}
var app = new EmberApp({
    storeConfigInMeta: false,
    fingerprint: {
      enabled: false
    }
});
{% endhighlight %}

I've also disabled source maps, but this isn't strictly necessary.

{% highlight javascript %}
sourcemaps: {
  "enabled": false,
  "extensions": ["js"]
},
{% endhighlight %}

And I've also configured ember-cli to build the assets I want to `dist/assets/`

{% highlight javascript %}
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
{% endhighlight %}

3) We need to dynamically compile our templates in development / test environments

So, in our `Brocfile.js`, we have

{% highlight javascript %}
// see https://github.com/ember-cli/ember-cli/issues/3497
// consider ember-test-helpers
if (EmberApp.env() !== 'production') {
  app.import('bower_components/ember/ember-template-compiler.js');
}
{% endhighlight %}

We also want to use
[ember-cli-htmlbars-inline-precompile](https://github.com/pangratz/ember-cli-htmlbars-inline-precompile)
to test our Component rendering:

Per [Ember component integration
tests](http://alisdair.mcdiarmid.org/2015/06/20/ember-component-integration-tests.html):

{% highlight bash %}
    bower install --save ember-qunit#0.4.0
    npm install --save-dev ember-cli-qunit@0.3.14
    npm install --save-dev ember-cli-htmlbars-inline-precompile@0.1.1
{% endhighlight %}

### Other changes from `ember init`

package.json
{% highlight json %}
+    "ember-cli-htmlbars-inline-precompile": "^0.1.1",
+    "ember-cli-mirage": "0.1.5",
+    "ember-islands": "mitchlloyd/ember-islands",
{% endhighlight %}

bower.json

{% highlight json %}
+    "pretender": "~0.6.0",
+    "Faker": "~2.1.3"
{% endhighlight %}

{% highlight javascript %}
// config/environment.js
+  // CONFIG ember-cli-mirage
+  if (environment === 'development') {
+    ENV['ember-cli-mirage'] = {
+        enabled: false
+    };
+  }

 ENV.contentSecurityPolicy = {
+      'script-src':  "'self' 'unsafe-eval' http://*:35729",
+      'font-src':    "'self'",
+      'connect-src': "'self' *",
+      'style-src':   "'self' 'unsafe-inline'",
+      'object-src':  "'self' data:",
+      'img-src':     "'self' data:"
+    };
+
+
+    // keep test console output quieter
+    ENV.APP.LOG_ACTIVE_GENERATION = false;
+    ENV.APP.LOG_VIEW_LOOKUPS = false;
+
+    ENV.APP.rootElement = '#ember-testing';
+  }
+
+  if (environment === 'production') {
+
+    // CORS configuration
+    ENV.contentSecurityPolicy = {
+      'script-src':  "'self' 'unsafe-eval' http",
+      'font-src':    "'self'",
+      'connect-src': "'self' *",
+      'style-src':   "'self' 'unsafe-inline'",
+      'object-src':  "'self' data:",
+      'img-src':     "'self' data:"
+    };
+  }
{% endhighlight %}

{% highlight html %}
<script src="assets/vendor.js"></script>
<script src="assets/viewtastic.js"></script>
<div data-component="doc-printer"></div>
{% endhighlight %}

## References and further reading:

- [Original PR where I merged in this code to the blog](https://github.com/bf4/bf4.github.com/pull/3)
- [State of the Ember app as of this
    writing](https://github.com/bf4/bf4.github.com/tree/3e6d7eef84648b3e2d5075a210427761f183c5d3/_ember)
- [Integration tests for components](http://emberup.co/integration-tests-for-components/)

(This area will be updated)
