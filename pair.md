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
(function($) {
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

    var parse_entry = function(entry, fields, callback) {
      that = this;
      that.columns = [];
      $.each(fields, function(index, field) {
        this.field_name = "gsx$" + field;
        this.cell = entry[this.field_name]["$t"];
        that.columns.push(this.cell);
      });
      return callback(that.columns);
    };
    
    var parse_entries = function(entries, fields, callback) {
      that = this;
      that.html = "";;
      $.each(entries, function(index, entry) {
        that.html += parse_entry(entry, fields, callback);
      });
      return that.html;
    }

    var build_table_row = function(columns) {
      var that = this;
      that.row = "<tr>";
      $.each(columns, function(index, column) {
        that.row += "<td>" + column + "</td>";
       
      });
      that.row += "</tr>";
      return that.row;
    };
    
    var build_table_html = function(config, entries) {
      this.html = "<table border='1'>" +
          build_table_row(config.fields) +
          parse_entries(entries, config.fields, build_table_row) +
          "</table>";
      return this.html;
    };
    
    /* var entries = data.feed.entry; */
    var display_html = function(config, entries) {
      this.html = build_table_html(config, entries);
      this.target = $(config.target);
      $(this.target).html(html);
    }

    var fetch_data = function(config, callback) {
      $.getJSON( config.url, function( json ) {
        this.entries = json.feed.entry;
        callback(config, this.entries);
      });
    };

    fetch_data(config, display_html);
    
})(jQuery);
</script>
</section>
