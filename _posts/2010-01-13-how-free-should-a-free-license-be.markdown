---
comments: true
date: 2010-01-13 13:07:32
layout: post
slug: how-free-should-a-free-license-be
title: How Free Should A Free License Be?
wordpress_id: 305
tags:
- agpl
- bsd
- gpl
- license
- mit
- oss
- yehuda katz
---

Yehuda Katz recently posted "[The Maximal Usage Doctrine for Open Source](http://yehudakatz.com/2010/01/05/the-maximal-usage-doctrine-for-open-source/)".  His take on preferring MIT/BSD-type licenses over GPL-type licenses is interesting in its own right, but it is well-worth delving into the discussion in the comments.  Yehuda writes:


> Starting out with the easiest, my first desire, to have my software used as much as possible, is most easily satisfied by an extremely liberal usage policy. Adding restrictions on the use of software I write reduces its adoption almost by definition.

Much more importantly, the same can be said about exposing code to real world stresses. By far the most important way to achieve this goal is to make it as easy as possible for as many people as possible to use the code.

If only 1% of all proprietary users of the source ever report bugs, that’s 1% of potentially thousands of users, as opposed to 100% of the zero proprietary users who were able to use the software under a more restrictive usage scheme. In practice, this number is much more than 1%, as proprietary users of software experience and report bugs just like open source users do.

The only real counter-argument to this is that by forcing users to contribute, some number of proprietary users will be forced to become open source users, and their contributions will outweigh the smaller contributions of proprietary users. In practice, proprietary users choose proprietary solutions instead when they are forced to choose between restrictive open source usage schemes and other proprietary software.

There is also much to be said for exposing open source tools into proprietary environments.


<!-- more -->

A comment I find sensible:


> [Craig](http://candrews.integralblue.com/), Posted January 6, 2010, 2:49 pm

@Till Salzer: The GPL family of licenses does not prohibit commercialization. Take for example the case of StatusNet – their product is licensed under the AGPLv3 – by this post’s author’s definition, and incredibly “restrictive” license. However, the company has received ventured capital, and has a solid business model developing customizations for paying customers, doing consulting, and selling support contracts. IMHO, the StatusNet business model seems far more robust that the Twitter (SN’s proprietary competitor) business model… which I still can’t figure out.

Free software can be commercial software. For another example, take a look at Red Hat. They make many millions of dollars per year in global profits on GPL’ed software, and they are clearly a commercial entity.

For another point of view, consider the case of say Pidgin, the popular IM client. Pidgin is licensed under the GPL, and has many proprietary competitors. If Pidgin were to be BSD/MIT/APL/etc licensed, you can guarantee some company would take the code, throw some money and shininess at it, and sell the result. They would make millions… and the Pidgin project would die. Users are left with unmaintained, buggy software (as proprietary software tends to be), and the original developers would feel “ripped off” as their code is now in use by a product they don’t even have the source code, and to add insult to injury, they would have to pay for it.

I’m a software engineer by profession, and make money doing it. And I’m certainly not concerned that Free software will ruin my career – in fact, I’m positive it will improve it.


Also:


> Paulo Cesar, Posted January 7, 2010, 8:30 am

Just one question:

Does Apple contribute to BSD as much as Intel, Nokia and Google contributes to Linux?

I really don’t think so.. I think they contribute because the license requires them to contribute, not because they are “nice guys”.


Also:


> dgl, Posted January 12, 2010, 1:43 pm

Personally I agree that that non-protective licenses fit the needs of small or mid-sized Open Source projects, but in long-term GPL is a better choice.

For example, imagine that Linus chose BSD license for Linux, formed the community around it, but then after a while a big company decides to make its own closed Linux and calls in Pinux. Next say 5 years they constantly improve Pinux while merging from geek-powered community of Linux, so in 5 years they have all features of Linux plus a lot of their closed-source improvements. Would Linux have gained such success always being an outsider? I guess not.


That is, both types of licenses can serve positive ends for open source software.

See this comment:


> [Kevin Whinnery](http://kevinwhinnery.com/), Posted January 6, 2010, 3:28 am

Your project’s license is determined by your goals, so I don’t think there is any license intrinsically better than any other. If your goals are dependent upon widespread adoption (which is necessary for serving all of Yehuda’s goals), a permissive license will better serve that purpose.

The GPL can be useful in releasing software under a dual license, as in the licensing model of [ExtJS with their quid pro quo principle](http://www.extjs.com/company/dual.php). In that way, the GPL can be used to support a certain kind of licensing/business model, while still contributing to the open source community. I don’t think there’s anything wrong with requiring some kind of contribution in exchange for a software product, assuming you’re okay with taking the adoption hit.

With either a restrictive or a permissive license, the developers get the results that they want.  [Appcelerator’s](http://www.appcelerator.com/) projects and business objectives are better served by releasing under the business-friendly Apache 2.0 license, so that’s the OSS license we chose. Different strokes for different… projects.



Or, put in a another way, the license of the software you work on affects why you work on it.  People in Yehuda's camp, that prefer the MIT/BSD-type license, use their work for fun, personal development, and resume-building.  People that work on GPL-type software are more likely to be more interested in making money off the software (or prevent others from doing so) and see developing it as a vocation.  (Yes, it's a generalization, but I think it fits the point.  I've seen job posting that say outright they will check your contributions on github.)  Correct me in the comments if you differ.
