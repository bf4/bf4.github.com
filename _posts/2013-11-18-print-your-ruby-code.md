---
layout: post
title: "Printing your Ruby code"
description: "Collect, syntax-highlight, and print rubygems or local library code"
categories: [ 'ruby' ]
tags: [ 'ruby' , 'docs' , 'hack' ]
published: true
---
{% include JB/setup %}

I was looking through [Avdi Grimm](http://devblog.avdi.org/)'s [GemLove library](https://github.com/avdi/gem-love) as an example of a [RubyGems plugin](http://guides.rubygems.org/plugins/) 
and wanted to print the code.  So, I wrote a script, which I thought I'd share.  

Notice that there is a `gem contents [gem_name]` command you can use to output the files included in a gem.  Neato.

I may later evolve this into a 'gem print' command.

<script src="https://gist.github.com/bf4/7531475.js"></script>

And, as long as you're here, I have also adapted a general [Entity-Relationship Diagram generator](https://gist.github.com/bf4/7209165#file-erd-rb) that [Erik Michaels-Ober](https://github.com/sferik/twitter/blob/master/etc/erd.rb) wrote.
