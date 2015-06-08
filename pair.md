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

<div id="pairing"></div>
{% raw %}
<script id="pairing-template" type="text/x-handlebars-template">
<ul>
  {{#rows}}
    <li>
      <a href="{{link}}">{{appointments}} with {{pair}} on {{description}}</a>
    </li>
  {{/rows}}
</ul>
</script>

{% endraw %}
<script>
(function() {
  _jsLoader.initApp(function() {
    _jsLoader.getScript('/js/GoogleSpreadsheetPrinter.js', function() {
      setTimeout(function() {
        window.doc = GoogleSpreadsheetPrinter({
          'key' : "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6",
          'fields' : [
                  'appointments',
                  'link',
                  'pair',
                  'description'
          ],
          'target' : '#pairing',
          'template' : '#pairing-template'
        }, jQuery).print();
      }, _jsLoader.timeout);
   });
  });
})();
</script>
</section>
