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

I have have experience pairing with vim, wemux, ssh, and skype/google voice.

## Pair and tell

* [2013-06-12 with Robert Jackson on the Pair Program With Me Matcher](https://github.com/rubyrogues/ppwm-matcher/)

<div id="pairing"></div>
<script>
(function() {
  var key = "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE";
  var url = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json";
  var template = {
    'appointments' : 'REPLACE',
    'link' : 'REPLACE',
    'pair' : 'REPLACE',
    'description' : 'REPLACE'
  };
  var target = $("#pairing");
  var html = "";
  var formatOutput = function(entry) {
    this.html = this.html || '';
      $.each(template, function(field, formatting) {
        var output = entry["gsx$" + field]["$t"];
        html += formatting.replace('REPLACE', output);
      });
   };


  $.getJSON( url, function( json ) {
    $.each( json.feed.entry, function(key, val) {
      formatOutput(val);
    });
  })
  console.log(html);
  console.log(formatOutput.html);
  console.log(target);
  target.innerHTML = html;
})();
</script>

</section>
