---
comments: true
date: 2009-12-21 16:33:37
layout: post
slug: limitations-of-current-html5-video-tag-implementation
title: Limitations of Current HTML5 Video Tag Implementation
wordpress_id: 293
tags:
- daringfireball
- html5
- web
---

[Why the HTML5 ‘Video’ Element Is Effectively Unusable, Even in the Browsers Which Support It](http://daringfireball.net/2009/12/html5_video_unusable)


> I seldom post video to DF, but when I do, I refuse to embed Flash,1 I want the markup to be sane and standard, I want the video to play in popular standards-compliant web browsers, and I don’t want the video to download/buffer automatically. Here’s an example from a year ago, using QuickTime.
....
That markup met all of my aforementioned desires but for one: the `<embed>` tag is not standard. Worse, it now has a new significant problem: it doesn’t work at all in Chrome (at least on the Mac)
...
In all three browsers (Safari, Chrome, [Firefox](http://hacks.mozilla.org/2009/12/autobuffering-video-in-firefox/)), with the above simple markup, the video content buffers automatically on page load. What I mean is that as soon as you load the web page, the browsers download the actual video files that are embedded. As stated at the outset, I don’t want that.
....
But this browser behavior is very much undesirable for both publishers and users in common contexts. Users loading the page over a slow connection, or a pay-by-the-megabyte metered connection (which is common with wireless networks), should not be forced to download a potentially large video every time they load the page. Likewise, publishers should not be forced to pay for the bandwidth to transmit videos that won’t be watched.


He also points out that the problem lies, in part, in the [HTML5 specification.](http://www.whatwg.org/specs/web-apps/current-work/#attr-media-autobuffer)

_Updated:_ [Firefox respects autobuffer](http://hacks.mozilla.org/2009/12/autobuffering-video-in-firefox/)
