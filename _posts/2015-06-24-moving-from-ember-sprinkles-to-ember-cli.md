---
layout: post
title: "Ember: Moving from Ember sprinkles to Ember CLI. Part 2"
description: "Part 2: Using Ember Components in a static site"
permalink: "ember-cli-components"
categories: [ 'javascript' ]
tags: [ 'ember' ]
published: false
---
{% include JB/setup %}

Following [ember-sprinkling-in-components](ember-sprinkling-in-components)

## Why?

Ember rendering component

but no route

not necessarily any ember-data

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

## TL;DR

An ember-cli app for rendering components outside of an Ember app.

1. `mkdir _ember; cd _ember`
2. `ember init --name=viewtastic` (or `ember init --dry-run --name=viewtastic`)
3. `ember install ember-islands`
4. Generate a component. It's name must have a hyphen.  e.g. `ember g component doc-printer`
5. Config Brocfile as needed/desired
6. edit app/index.html to add a data component, e.g. `<div data-component="doc-printer"></div>`
7. ember build -e production
8. `cp dist/assets/*.js ../js` // or wherever
9. edit the page(s) you want the component on to load the js and include the data-component

```html
<script src="js/vendor.js"></script>
<script src="js/viewtastic.js"></script>
<div data-component="doc-printer"></div>
```

10. profit

Gotchas, things to make it work

- Brocfile.js

{% highlight json %}
+var app = new EmberApp({
+    storeConfigInMeta: false,
+    fingerprint: {
+      enabled: false
+    }
+});
+// see https://github.com/ember-cli/ember-cli/issues/3497
+// consider ember-test-helpers
+if (EmberApp.env() !== 'production') {
+  app.import('bower_components/ember/ember-template-compiler.js');
+}
{% endhighlight %}

- meta

## TL;DR

## Code

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

## Code

Now there's a lot going on in there, but here's the gist of it:

1.
2.
3.
4.

### Appendix

## Epilogue

## References:

(This area will be updated)
