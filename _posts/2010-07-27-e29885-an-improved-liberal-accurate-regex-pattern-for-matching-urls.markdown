---
comments: true
date: 2010-07-27 18:42:16
layout: post
slug: '%e2%98%85-an-improved-liberal-accurate-regex-pattern-for-matching-urls'
title: ★ An Improved Liberal, Accurate Regex Pattern for Matching URLs
wordpress_id: 405
categories:
- Code
- top
tags:
- daringfireball
- regex
---

> Back in November, I posted [a regex pattern for matching URLs](http://daringfireball.net/2009/11/liberal_regex_for_matching_urls). It seems to have proven quite useful for others, and, even better, based on feedback from those who’ve used it, I’ve since improved it in several ways.

The problem the pattern attempts to solve: identify the URLs in an arbitrary string of text, where by “arbitrary” let’s agree we mean something unstructured such as an email message or a tweet.

So, here’s a pattern that attempts to match any sort of URL, using the extended multiline regex format that disregards literal whitespace and allows for comments, which explain a bit about how the pattern works:

>     
>     <code style="font-size: 13px;">(?xi)
>     \b
>     (                           # Capture 1: entire matched URL
>       (?:
>         [a-z][\w-]+:                # URL protocol and colon
>         (?:
>           /{1,3}                        # 1-3 slashes
>           |                             #   or
>           [a-z0-9%]                     # Single letter or digit or '%'
>                                         # (Trying not to match e.g. "URI::Escape")
>         )
>         |                           #   or
>         www\d{0,3}[.]               # "www.", "www1.", "www2." … "www999."
>         |                           #   or
>         [a-z0-9.\-]+[.][a-z]{2,4}/  # looks like domain name followed by a slash
>       )
>       (?:                           # One or more:
>         [^\s()<>]+                      # Run of non-space, non-()<>
>         |                               #   or
>         \(([^\s()<>]+|(\([^\s()<>]+\)))*\)  # balanced parens, up to 2 levels
>       )+
>       (?:                           # End with:
>         \(([^\s()<>]+|(\([^\s()<>]+\)))*\)  # balanced parens, up to 2 levels
>         |                                   #   or
>         [^\s`!()\[\]{};:'".,<>?«»“”‘’]        # not a space or one of these punct chars
>       )
>     )
>     </code>
> 
> 
Here’s the same pattern in the terse single-line format:

`(?i)\b((?:[a-z][\w-]+:(?:/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))`

(And you thought the multiline version looked crazy, right?)

[Here’s the test data I used](http://daringfireball.net/misc/2010/07/url-matching-regex-test-data.text) while sharpening the pattern. Just like the pattern from November, it attempts to be practical, above all else. It makes no attempt to parse URLs according to any official specification. It isn’t limited to predefined URL protocols. It should be clever about things like parentheses and trailing punctuation.

In addition to being liberal about the URLs it matches, the pattern is also liberal about which regex engines it works with. I’ve tested it with Perl, PCRE (which is used in PHP, BBEdit, and many other places), and Oniguruma (which is used in Ruby, TextMate, and many other places). It should also work in all modern JavaScript interpreters. If you find a modern regex engine where the pattern does not work, please let me know.

Some of the advantages of the new pattern, compared to the previous one:

> 
> 
	
>   * It no longer uses the `[:punct:]` named character class. I thought this was universally supported in modern regex engines, but apparently it is not.
> 
	
>   * It does a better job with URLs containing literal parentheses, correctly matching the following URLs that the previous pattern did not:

>     
>     <code style="font-size: 13px;">http://foo.com/more_(than)_one_(parens)
>     http://foo.com/blah_(wikipedia)#cite-1
>     http://foo.com/blah_(wikipedia)_blah#cite-1
>     http://foo.com/unicode_(✪)_in_parens
>     http://foo.com/(something)?after=parens
>     </code>
> 
> 

> 
	
>   * It now matches `mailto:` URLs.
> 
	
>   * It correctly guesses that things like “bit.ly/foo” and “is.gd/foo/” are URLs. Basically: something-dot-something-slash-something.
> 

Included in the parentheses-matching improvements is the ability to match up to two levels of balanced, nested parentheses — parentheses within parentheses. There are fancy ways of using dynamic or recursive regex patterns to match balanced parentheses of any arbitrary depth, but these dynamic/recursive pattern constructs are all specific to individual regex implementations. I.e., there’s one way to do it for PCRE, a different way for Perl — and in most regex engines, no way to do it at all. Hard-coding the pattern to support two levels of nested parenthesis should work everywhere, and, practically speaking, I only received two reports of _actual_real-life URLs that had a second level of parentheses, and _none_ with more than two.

Lastly, I received several requests for a version of the pattern that _only_ matches web URLs — http, https, and things like “www.example.com”. Here’s an extended format pattern that does this:

>     
>     <code style="font-size: 13px;">(?xi)
>     \b
>     (                       # Capture 1: entire matched URL
>       (?:
>         https?://               # http or https protocol
>         |                       #   or
>         www\d{0,3}[.]           # "www.", "www1.", "www2." … "www999."
>         |                           #   or
>         [a-z0-9.\-]+[.][a-z]{2,4}/  # looks like domain name followed by a slash
>       )
>       (?:                       # One or more:
>         [^\s()<>]+                  # Run of non-space, non-()<>
>         |                           #   or
>         \(([^\s()<>]+|(\([^\s()<>]+\)))*\)  # balanced parens, up to 2 levels
>       )+
>       (?:                       # End with:
>         \(([^\s()<>]+|(\([^\s()<>]+\)))*\)  # balanced parens, up to 2 levels
>         |                               #   or
>         [^\s`!()\[\]{};:'".,<>?«»“”‘’]        # not a space or one of these punct chars
>       )
>     )
>     </code>
> 
> 
And here’s the same pattern in single-line format:

`(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))`

As before, suggestions and improvements are welcome, including just sending me example input where the current pattern fails.




via [★ An Improved Liberal, Accurate Regex Pattern for Matching URLs](http://daringfireball.net/2010/07/improved_regex_for_matching_urls).

I really like regex. I'll save this here as a reference.
