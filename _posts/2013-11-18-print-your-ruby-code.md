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
and wanted to print the code.  So, I wrote a script to [higlight files](https://gist.github.com/bf4/7531475), which I thought I'd share.

Notice that there is a `gem contents [gem_name]` command you can use to output the files included in a gem.  Neato.

I may later evolve this into a 'gem print' command.

{% highlight ruby %}
# Usage
# find path -type f | xargs ruby highlight.rb
# gem contents metric_fu | grep lib | xargs ruby highlight.rb

require 'coderay'
class Highlighter
  def initialize
    # import css classes from alpha style
    @css = CodeRay::Styles::Alpha::CSS_MAIN_STYLES << "\n" << CodeRay::Styles::Alpha::TOKEN_COLORS
  end

  def highlight_file(filename)
    text = File.binread(filename)
    highlight(text)
  end

  def highlight(text)
    CodeRay.scan(text, :ruby).div(css: :class, style: :alpha, line_numbers: :table, line_number_start: 0)
  end

  def highlight_files(filenames)
    filenames.map do |filename|
    "<br>#{filename}<br>" << highlight_file(filename)
    end.join("\n<br>")
  end

  def write_html(inner_html, output_filename)

    File.open(output_filename, 'w') do |output|
      output.write "<html><head><style>#{@css}</style></head><body>"
      output.write inner_html
      output.write "</body></html>"
    end

  end
end
if $0 == __FILE__
  hl = Highlighter.new
  inner_html = hl.highlight_files(ARGV.to_a)
  hl.write_html(inner_html, 'output.html')
end
{% endhighlight %}

And, as long as you're here, I have also adapted a general [Entity-Relationship Diagram generator](https://gist.github.com/bf4/7209165#file-erd-rb) that [Erik Michaels-Ober](https://github.com/sferik/twitter/blob/master/etc/erd.rb) wrote.
