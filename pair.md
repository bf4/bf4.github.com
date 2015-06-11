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
<div data-component='print-pair-data' data-attrs='{"config": { "key": "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6", "fields": ["appointments","link","pair","description"] } }'></div>
<!-- 2: Link to source files -->
<script src="/js/jquery.min.js"></script>
<script src="/js/ember.prod.js"></script>
<script src="/js/ember-template-compiler.js"></script>
<!-- 2a: init Ember App -->
<script src="/js/app.js"></script>

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
<script src="/js/components/print-pair-data.js"></script>

</section>
