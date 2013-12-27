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

<div id="pairing"></div>
{% raw %}
<script id="pairing-template" type="text/x-mustache-template">
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
var printPairs = (function($) {
    var config = {
        'key' : "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE",
        'fields' : [
                'appointments',
                 'link',
                 'pair',
                 'description'
        ],
        'target' : '#pairing'
    };

    config.url = "https://spreadsheets.google.com/feeds/list/" + config.key + "/od6/public/values?alt=json";

    config.source   = $("#pairing-template").html();
    config.view = {};

    var parse_entry = function(entry, fields) {
      that = this;
      that.row = {};
      $.each(fields, function(index, field) {
        this.field_name = "gsx$" + field;
        this.cell = entry[this.field_name]["$t"];
        that.row[field] = this.cell;
      });
      return that.row;
    };

    var parse_entries = function(entries, fields) {
      that = this;
      that.rows = [];
      $.each(entries, function(index, entry) {
        that.rows.push(parse_entry(entry, fields));
      });
      return that.rows;
    }

    var build_rows = function(fields, entries) {
      this.rows = parse_entries(entries, fields);
      return this.rows;
    };

    var display_html = function(config, entries) {
      config.view.rows = build_rows(config.fields, entries);
      this.html    = Mustache.render(config.source, config.view);
      this.target = $(config.target);
      $(this.target).html(this.html);
    }

    var fetch_data = function(config, callback) {
      $.getJSON( config.url, function( json ) {
        this.entries = json.feed.entry;
        callback(config, this.entries);
      });
    };

    fetch_data(config, display_html);

  });
(function($) {
  var js_url = "/js/mustache.js";
  $.getScript(js_url, function() { printPairs($) });
})(jQuery);
</script>
</section>
