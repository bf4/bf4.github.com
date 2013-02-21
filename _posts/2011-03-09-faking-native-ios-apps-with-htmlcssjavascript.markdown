---
comments: true
date: 2011-03-09 14:44:23
layout: post
slug: faking-native-ios-apps-with-htmlcssjavascript
title: Faking native iOS apps with HTML/CSS/JavaScript
wordpress_id: 540
categories:
- Code
- software
- web
tags:
- html5
- ios
- native apps
---

Cool.



> 

> 
> ## Faking native iOS apps with HTML/CSS/JavaScript
> 
> 

> 
> 

> 
> Matt Might has [a nice tutorial on how to make mobile web apps look like native iOS apps](http://matt.might.net/articles/how-to-native-iphone-ipad-apps-in-javascript/) using HTML, CSS, and JavaScript.
> 
> 


>
>> 

>> 
>> If you a flick a web app past the bottom or top of the page, the page itself gets elastically tugged away from the URL bar or the button bar (or the bottom/top of the screen if it's in full-screen mode).
>> 
>> 

>> 
>> This behavior is another giveaway that your app isn't native, and it's rarely the behavior you want in a native app.
>> 
>> 

>> 
>> To stop this behavior, capture touchmove events on the document in JavaScript and cancel them. You can do this by adding a handler to the body tag, and invoking the preventDefault method on the event object.
>> 
>> 

> 
> 

> 
> Huh, you can even do ["pull to refresh" in JavaScript](http://waynepan.com/2010/07/30/javascript-pull-to-refresh/).
> 
> 


> 
> 

