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
  

    console.log(config);
      var printer = {
        'formatOutput' : function(entry) {
         this.html = this.html || '';
           $.each(template, function(field, formatting) {
             var output = entry["gsx$" + field]["$t"];
             html += formatting.replace('REPLACE', output);
            });
         },
        'target' :  $(config.target),
        'html' : '',
     
          'add_row' : function(row) {
              console.log(row);
              // next for each row, extract fields
              // e.g. ['gsx$description']['$t']
          }
      };
      var client = {          
        'each_entry' : function(url, add_row) {            
              $.getJSON( url, function( json ) {
                  $.each( json.feed.entry, function(key, val) {
                      if(typeof(key) === 'number') {
                          add_row(val);
                      };
                  });

              });

            }
      };
      client.each_entry(config.url, printer.add_row); 
    
})(jQuery);
</script>
  console.log(html);
  console.log(formatOutput.html);
  console.log(target);
  target.innerHTML = html;
})();
</script>

</section>
