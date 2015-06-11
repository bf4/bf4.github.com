---
layout: page
comments: false
date: 2013-06-19 01:07:00
slug: pair
title: Pair
---

<section class="content">

## [![Pair Prograrm With Me](http://www.pairprogramwith.me/badge.png 'Pair Program With Me')](http://www.pairprogramwith.me/)

The [#pairwithme hashtag](https://twitter.com/search?q=%23pairwithme) and [PairProgramWith.me](http://www.pairprogramwith.me/) are some shortcuts for offering to pair program.  Email me <img src="/images/email_pair.png" title="email pair address" alt="email pair address"> <a href="https://twitter.com/intent/tweet?text=%23pairwithme%20%40{{ site.author.twitter }}" target="_blank"> or tweet me with contact info</a>

I have have experience pairing with vim, tmux, ssh, and skype/google voice.
I've found good luck pairing with [this script](https://gist.github.com/bf4/8324117).

## Pair and tell

<!--
  Breaking down of the steps of sprinkling an Ember Component via
  http://frontside.io/blog/2014/03/06/a-sprinkling-of-ember.html
  by @tehviking
  and work done in http://emberjs.jsbin.com/zikupe/10/edit?html,js,output
  and http://emberjs.jsbin.com/zikupe/12/edit?html,js,output
-->

<!-- 1: create a placeholder div for your component -->
<div data-component='print-pair-data'></div>

<!-- 2: Link to source files -->
<!--
  jQuery dependency is loaded in the head by the loader
  <script src="/js/jquery.min.js"></script>
-->
<script src="http://builds.emberjs.com/release/ember.prod.js"></script>
<script src="http://builds.emberjs.com/release/ember-template-compiler.js"></script>
<script src="js/GoogleSpreadsheetPrinter.js"></script>

<!-- 2a: init Ember App -->
<script>
App = Ember.Application.create();
</script>

<!-- 3. Create an Ember Component -->

<!-- 3a: Component Layout -->
<script type="text/x-handlebars" data-template-name="components/print-pair-data">
{% raw %}
<ul>
{{#each rows key="@guid" as |row|}}
    <li>
      <a href="{{row.link}}">{{row.appointments}} with {{row.pair}} on {{row.description}}</a>
      </li>
{{/each}}
</ul>
{% endraw %}
</script>


<!-- 3b: Component JS -->
<script>
App.PrintPairDataComponent = Ember.Component.extend({
  // 4. Make sure you specify the layoutName to match the data-template-name of your handlebars template
  layoutName: "components/print-pair-data",
  tagName: '',
  rows: null,
   // hook into component initialization
  init: function init() {
    var component = this;
    component._super.apply(component, arguments);
    // Get the existing input value
    var doc = GoogleSpreadsheetPrinter({
      'key' : "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6",
        'fields' : [
      'appointments',
        'link',
        'pair',
        'description'
      ],
        'target' : '#pairing',
        'template' : '#pairing-template'
    }, jQuery);
    doc.fetchData( function( entries ) {
      var rows = doc.parseEntries(entries);
      component.set('rows', rows);
    });
  }

});
</script>

<script>
// 5. Use jQuery to replace your html div with your Ember component.
$(document).ready(function(){
  // Find the data-component container divs
  $("[data-component=print-pair-data]").each(function(){
    var component = App.__container__.lookup('component:printPairData');
    component.replaceIn(this);
  });
});
</script>
</section>
