---
layout: post
title: "Ember: Sprinkling in Components. Part 1"
permalink: "ember-sprinkling-in-components"
description: "Part 1: Using Ember Components in a static site"
categories: [ 'javascript' ]
tags: [ 'ember' ]
published: true
---
{% include JB/setup %}

I have a page on this site <a href="{{ site.pair_link }}">where I show who I've pair-programmed
with by pulling down data from a Google spreadsheet</a>.  I've used this page as a place to practice
my JavaScript and wanted to convert it from custom JavaScript and Mustache to use Ember Components.

Let's see how I 'sprinkled Ember Components' into this [site, a static Jekyll blog hosted on GitHub pages](https://github.com/bf4/bf4.github.com/tree/3b4f20035/js).

## Acknowledgements

I'd like to thank @runspired for the inspiration to start down the component-only path,
for @too_mitch for pairing with me to set up my first ember-cli app with [ember-islands](https://github.com/mitchlloyd/ember-islands/) (next post!),
to @tehviking for providing some guidance via the <a href="http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html">
'A Sprinkling of Ember' blog post</a> and his is 2014 RailsConf talk <a href="https://speakerdeck.com/tehviking/bring-fun-back-to-js-refactoring-toward-ember">
'Bring fun back to JS: Refactoring Toward Ember</a>, and to @locks [@JordanHawker](http://www.jordanhawker.com/) @rwjblue and
many others in the embercommunity slack for their assistance.

## Getting Started

First off, the easiest way to spike this kind of code and get feedback is by using the [Ember JS Bin http://emberjs.jsbin.com](http://emberjs.jsbin.com/).

Here's an example of [my first spike: http://emberjs.jsbin.com/zunedenono/3/edit?html,css,js,output](http://emberjs.jsbin.com/zunedenono/3/edit?html,css,js,output)
and [my update of @tehviking's giffy code](http://jsbin.com/zikupe/edit?html,js,output) in the blog post,
including extracting some of the logic from @mitch-lloyd's Ember-Islands and getting it ready for Ember 2.0.

## TL;DR

I've embedded the JS Bin's here so you can see where we're going.

<a class="jsbin-embed" href="http://jsbin.com/zunedenono/1/embed?html,output">
Doc Printer
</a>
<br>
<a class="jsbin-embed" href="http://jsbin.com/zikupe/embed?js,output">
Giffy
</a>
<script src="http://static.jsbin.com/js/embed.js"></script>

## Code

Let's break down of the steps via [http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html](http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html)
by @tehviking and work done in [http://emberjs.jsbin.com/zikupe/10/edit?html,js,output](http://emberjs.jsbin.com/zikupe/10/edit?html,js,output)

For either of the JS Bins, you can walk through the snapshots to see my progress.

### 1) Create a placeholder div for your component

{% highlight html %}
<body>
  <div data-component='doc-printer' data-attrs='{"title": "Doc Printer (OMG data-attrs!)"}'>
    This will be replaced with the Ember component!
  </div>
</body>
{% endhighlight %}

The choice of `data-component` to identify the component and `data-attrs` to pass in data
are our own interface for linking the template to the Component.  You can use other
attributes, as you'll see below.

### 2) Link to source files

Though I'm using `ember.debug` here, once you've debugged your code, you'll want to use `ember.prod`.
We need the `ember-template-compiler` because we're not pre-rendering our templates, but getting them
from the DOM.

{% highlight html %}
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="http://builds.emberjs.com/tags/v1.13.2/ember-template-compiler.js"></script>
  <script src="http://builds.emberjs.com/tags/v1.13.2/ember.debug.js"></script>
</head>
{% endhighlight %}

To improve usability of the JS Bin, it's a good idea to lock down the script versions in snapshots, as above.
To work on the edge, you may want to develop on the latest release or canary, e.g.

{% highlight html %}
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="http://builds.emberjs.com/canary/ember-template-compiler.js"></script>
  <script src="http://builds.emberjs.com/canary/ember.debug.js"></script>
</head>
{% endhighlight %}

### 3) Make your Ember App

{% highlight javascript %}
App = Ember.Application.create({});
{% endhighlight %}

If you want to get fancy and making debugging your JS Bin a big easier, instead:

{% highlight javascript %}
App = Ember.Application.create({
     LOG_RESOLVER: true // debug boilerplate
});
// BEGIN debug boilerplate thanks to various @rwjblue jsbins
App.Router.map(function() {
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    error: function(error) {
      log(error.message);
    }
  }
});
Ember.onerror = log;
function log() {
  var msg = [].slice.call(arguments).join(' ');
  logs.insertBefore(document.createTextNode("\n" + msg), logs.firstChild);
}
// END debug boilerplate
{% endhighlight %}
{% highlight html %}
<body>
  <!--
  Debug boilerplate for outputting script errors in a helpful way by adding 'logs' target
  -->
  <pre id="logs"></pre>
</body>
{% endhighlight %}

### 3) Create an Ember Component

Here's my handlebars template, right in the DOM.  I'm going to pass it a `title` and `rows`.

{% highlight html %}
{% raw %}
<script type="text/x-handlebars" id="components/doc-printer" data-template-name="components/doc-printer">
  {{title}}
  <ul>
  {{#each rows key="@index" as |row|}}
      <li>
        <a href="{{row.link}}">{{row.appointments}} with {{row.pair}} on {{row.description}}</a>
       </li>
  {{/each}}
  </ul>
</script>
{% endraw %}
{% endhighlight %}

### 4) Make sure you specify the `layoutName` to match the `data-template-name` of your handlebars template


Here, it's `components/doc-printer`.  The component name must have a hyphen (`-`) in it.
The `doc-printer` component maps to `App.DocPrinterComponent`.

{% highlight javascript %}
App.DocPrinterComponent = Ember.Component.extend({
  layoutName: "components/doc-printer",
  tagName: '',

  rows: null,
   // hook into component initialization
  init: function init() {
    this._super.apply(this, arguments);
    // Get the existing input value
    var data = {
      rows: [{appointments: "6/1/2015", description: "Configure EmberCLI app to use Ember Islands to export Components", link: "https://github.com/bf4/bf4.github.com/compare/master...emberize_cli_islands", pair: "Mitch Lloyd"}]
    };
    this.set('rows', data.rows);
  }

});
{% endhighlight %}

### 5) Use jQuery to replace your html div with your Ember component

{% highlight javascript %}
// This is basically what Ember-Islands by @too_mitch does
// https://github.com/mitchlloyd/ember-islands/blob/3197b544c3c8fd4b632022a406fe565ca687810a/addon/render-components.js
$(document).ready(function(){
    // Find the data-component container divs
    $("[data-component]").each(function(){
      // Get the data-component name e.g. 'fs-gif-url-input'
      var element = this;
      var name = element.getAttribute('data-component');
      var attributes;
      var attrsJSON = element.getAttribute('data-attrs');

      if (attrsJSON) {
        attributes = JSON.parse(attrsJSON);
      } else {
        attributes = {};
      }
      attributes.innerContent = element.innerHTML;

      // Build the component & stuff in any pre-existing value
      // Gut out the container div & replace with the component

      // Since we know the component name here, we don't need
      // to do all this. We could just:
      // App.DocPrinterComponent.create(attributes).appendTo(element);
      // Use the 'intimite API' to get the container
      var container = App.__container__;
      var componentLookup = container.lookup('component-lookup:main');
      var component = componentLookup.lookupFactory(name,  container);

      // Temporary fix for bug in `replaceIn`
      $(element).empty();
      component.create(attributes).appendTo(element);

    });
  });
{% endhighlight %}

Now there's a lot going on in there, but here's the gist of it:

1. Find the handlebars template for the component in the DOM.
2. Optional: Get its `data-attrs`, a convenient way to pass data, as JSON, from the template into the component.
3. Optional: Find the component object. If you know what it is, you can call `create` on it directly.
4. Create an instance of the component and append it to the DOM.

### Appendix

That wasn't so terrible, right?  Now, there's a bunch of boiler-plate in there.

Let's see if we can do it again for a different component, the one @tehviking
builds in [http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html](http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html).

First, let's make the placeholder. We're just a class attribute here to identify it.

{% highlight html %}
<body>
  <div class="component-placeholder">
    This will be replaced with the Ember component!
  </div>
</body>
{% endhighlight %}

Then, write our template. Notice that this template binds an action.

{% highlight html %}
{% raw %}
<body>
  <script type="text/x-handlebars" data-template-name="components/fs-gif-url-input">
    <div class="field">
      <label for="gif_link_url">New GIF Url</label><br>
      {{input value=gifUrl name="gif_link[url]"}}
    </div>

    <ul>
      <!-- below works, but is deprecated. Current practice would be: -->
      <!-- {{#each gifs key="@index" as |gif|}} -->
      {{#each gif in gifs}}
        <li>
          <a href="#" {{action 'setGif' gif}}>{{gif}}</a>
        </li>
      {{/each}}
    </ul>


    <div class="image-preview">
      {{#if urlIsValid}}
        <!-- bind-attr is deprecated, but I'm not sure what to replace it with, here. -->
        <img {{bind-attr src="gifUrl"}} height=500>
      {{else}}
        {{#if gifUrl}}
          <h1>That URL is not valid!</h1>
        {{/if}}
      {{/if}}
    </div>

  </script>
</body>
{% endraw %}
{% endhighlight %}

Define our App and Component. Notice that I'm now using `Ember.$` in place of `$`.

{% highlight javascript %}
App = Ember.Application.create({});
App.FsGifUrlInputComponent = Ember.Component.extend({
  layoutName: "components/fs-gif-url-input",
  gifUrl: null,
  gifs: ['http://www.reactiongifs.com/r/swag.gif',
       'http://i.imgur.com/e16WWlK.gif',
       'http://i.imgur.com/YniEVEY.gif'],

  actions: {
      setGif: function(gif) {
        this.set('gifUrl', gif);
      }
    },

  addUrlIfNew: function(){
    if(this.get('urlIsValid') && this.get('gifs').indexOf(this.get('gifUrl')) == -1) {
      this.get('gifs').addObject(this.get('gifUrl'));
    }
  }.observes("gifUrl"),

  urlIsValid: function(){
    if(!!this.get("gifUrl")) {
      return this.get("gifUrl").match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
    }
  }.property("gifUrl")
});
{% endhighlight %}

And, this time, let's hook into ember initializers:

Both the `App.initializer` and `App.instanceInitializer` need a `name`, but it doesn't
seem to matter what it is, so I picked obviously ridiculous names.

In the `App.initializer`, I'm pausing the App initialization until `Ember.$(document).ready()` fires.

Once, the document is ready, iterate for all components, here `.component-placeholder` but
could just as easily be `[data-component]` for a more general solution.

I've left some of my debugging comments in the code for areas where I had issues.

{% highlight javascript %}
App.initializer({
  name: "banana",

  initialize: function(registry, application) {
    application.deferReadiness();
    Ember.$(document).ready(function() {
      application.advanceReadiness();
    });

  }
});
App.instanceInitializer({
  name: "hamburger",

  initialize: function(instance) {
    //5. Use jQuery to replace your html div with your Ember component.
    Ember.$(".component-placeholder").each(function(){
      // Get the existing input value
      var value = $(this).find("input").val();
      // Build the component & stuff in any pre-existing value
      // Error: Container was not found when looking up a views template. This is most likely due to manually instantiating an Ember.View. See: http://git.io/EKPpnA
      //      var component = App.FsGifUrlInputComponent.create({      gifUrl: value      });

        var component = App.__container__.lookup('component:fsGifUrlInput');
        component.set('gifUrl', value);
       // Ember 2.x
       // https://github.com/emberjs/rfcs/pull/46
       //     var component = instance.lookup('component:fsGifUrlInput');

      // Get out the container div & replace with the component
      component.replaceIn(this);
    });

  }
});
{% endhighlight %}

## Epilogue

I hope that helps you get started with just dropping Ember in your static site.

One drawback of this approach, is that we don't get the benefits of all the conventions
and tooling of `ember-cli`.  Well, we'll migrate this code to `ember-cli` in the next post :)

## References:

- Components
  - [http://guides.emberjs.com/v1.12.0/components/sending-actions-from-components-to-your-application/](http://guides.emberjs.com/v1.12.0/components/sending-actions-from-components-to-your-application/)
  - [http://burstcreations.com/blog/data-down-actions-up](http://burstcreations.com/blog/data-down-actions-up)/
  - [http://alisdair.mcdiarmid.org/2015/06/20/ember-component-integration-tests.html](http://alisdair.mcdiarmid.org/2015/06/20/ember-component-integration-tests.html)
- Initialization
  - [http://discuss.emberjs.com/t/where-is-the-best-place-to-initialize-things-before-ember-is-ready/4643](http://discuss.emberjs.com/t/where-is-the-best-place-to-initialize-things-before-ember-is-ready/4643)
- Deprecations / Futures
  - [http://emberjs.com/deprecations/v1.x/#toc_deprecate-access-to-instances-in-initializers](http://emberjs.com/deprecations/v1.x/#toc_deprecate-access-to-instances-in-initializers)
  - [Registry / Container reform (removes `App.__container__`)](https://github.com/emberjs/rfcs/pull/46#discussion_r32285604)
  - [http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html](http://emberjs.com/blog/2015/06/16/ember-project-at-2-0.html)
  - [http://madhatted.com/2015/5/14/ember-js-2-0-preview-with-canary](http://madhatted.com/2015/5/14/ember-js-2-0-preview-with-canary)
- Guides
  - [https://newcircle.com/s/post/1736/2015/05/28/ember-components-in-30-minutes](https://newcircle.com/s/post/1736/2015/05/28/ember-components-in-30-minutes)
  - [Frontside: a sprinkling of Ember](http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html)
  - [@tehviking bring-fun-back-to-js-refactoring-toward-ember](https://speakerdeck.com/tehviking/bring-fun-back-to-js-refactoring-toward-ember) [video](http://confreaks.tv/videos/railsconf2014-bring-fun-back-to-js-step-by-step-refactoring-toward-ember)
- Templating
  - [https://github.com/emberjs/ember.js/blob/master/packages/ember-htmlbars/tests/hooks/component_test.js](https://github.com/emberjs/ember.js/blob/master/packages/ember-htmlbars/tests/hooks/component_test.js)
  - [http://guides.emberjs.com/v1.12.0/templates/handlebars-basics](http://guides.emberjs.com/v1.12.0/templates/handlebars-basics)/
  - [Implement angle-bracket components](https://github.com/emberjs/ember.js/pull/11141)
  - [Refine component lifecycle hooks](https://github.com/emberjs/ember.js/pull/11127)

(This area will be updated)
