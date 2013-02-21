---
comments: true
date: 2011-02-21 12:54:58
layout: post
slug: firesheep-makes-it-to-the-nytimes-5-months-later
title: Firesheep makes it to the NYTimes.. 5 months later
wordpress_id: 533
categories:
- Code
- Current Events
- IT
- Security
- software
tags:
- blacksheep
- defcon
- firesheep
- security
- sheepsafe
- wall of sheep
---

> Until recently, only determined and knowledgeable hackers with fancy tools and lots of time on their hands could spy while you used your laptop or smartphone at Wi-Fi hot spots. But a free program called Firesheep, released in October, has made it simple to see what other users of an unsecured Wi-Fi network are doing and then log on as them at the sites they visited.

Without issuing any warnings of the possible threat, Web site administrators have since been scrambling to provide added protections.

“I released Firesheep to show that a core and widespread issue in Web site security is being ignored,” said Eric Butler, a freelance software developer in Seattle who created the program. “It points out the lack of end-to-end encryption.”

What he means is that while the password you initially enter on Web sites like [Facebook](http://topics.nytimes.com/top/news/business/companies/facebook_inc/index.html?inline=nyt-org),[Twitter](http://topics.nytimes.com/top/news/business/companies/twitter/index.html?inline=nyt-org), Flickr, [Amazon](http://topics.nytimes.com/top/news/business/companies/amazon_inc/index.html?inline=nyt-org), [eBay](http://topics.nytimes.com/top/news/business/companies/ebay_inc/index.html?inline=nyt-org) and The New York Times is encrypted, the Web browser’s cookie, a bit of code that that identifies your computer, your settings on the site or other private information, is often not encrypted. Firesheep grabs that cookie, allowing nosy or malicious users to, in essence, be you on the site and have full access to your account.


via [New Hacking Tools Pose Bigger Threats to Wi-Fi Users - NYTimes.com](http://www.nytimes.com/2011/02/17/technology/personaltech/17basics.html).

Well, better late than never.

[Firesheep](http://codebutler.com/firesheep) is [really easy to use](http://codebutler.github.com/firesheep/).  I've had some fun at home stealing my wife's cookies and messaging myself back and forth in different browsers.  In seriousness, I haven't logged in to public wifi since this came out.  I did install [SheepSafe](https://github.com/nicksieger/sheepsafe) and ForceTLS, will try the [EFF software](http://www.eff.org/https-everywhere) though it is FireFox only, as is [BlackSheep](http://www.zscaler.com/blacksheep.html).

I'll note, and this is important that Firesheep actually steals insecure session cookies, not passwords.  That is, if you access any website with an insecure session cookie in public wifi, someone with Firesheep can make use of your session (i.e. be logged in as you).  You don't actually have to be logging in.


> It's extremely common for websites to protect your password by encrypting the initial login, but surprisingly uncommon for websites to encrypt everything else. This leaves the cookie (and the user) vulnerable. HTTP session hijacking (sometimes called "sidejacking") is when an attacker gets a hold of a user's cookie, allowing them to do anything the user can do on a particular website. On an open wireless network, cookies are basically shouted through the air, making these attacks extremely easy.


Also see [discussion on Slashdot when it came out in October 2010](http://news.slashdot.org/story/10/10/25/1031235/Firefox-Extension-Makes-Social-Network-ID-Spoofing-Trivial).

And for what it's worth, the term "firesheep" comes from "[Wall of Sheep](http://www.wallofsheep.com/)" at a hacker conference called Defcon that posted information of all the hackers at the conference making insecure use of the public wifi.
