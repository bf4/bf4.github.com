---
comments: true
date: 2010-11-23 17:31:26
layout: post
slug: useful-javascript-regex-link
title: Useful Javascript Regex Link
wordpress_id: 441
categories:
- Code
- top
tags:
- javascript
- regex
---

> > (?:x)	 Matches x but does not capture it. In other words, no numbered references are created for the items within the parenthesis.	 /(?:.d){2}/ matches but doesn't capture "cdad".
> 
> x(?=y)	 Positive lookahead: Matches x only if it's followed by y. Note that y is not included as part of the match, acting only as a required conditon.	 /George(?= Bush)/ matches "George" in "George Bush" but not "George Michael" or "George Orwell".
> /Java(?=Script|Hut)/ matches "Java" in "JavaScript" or "JavaHut" but not "JavaLand".
> 
> x(?!y)	 Negative lookahead: Matches x only if it's NOT followed by y. Note that y is not included as part of the match, acting only as a required condiiton.	 /^\d+(?! years)/ matches "5" in "5 days" or "5 oranges", but not "5 years".


via [JavaScript Kit- RegExp (regular expression) object](http://www.javascriptkit.com/jsref/regexp.shtml).
