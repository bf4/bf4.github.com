---
comments: true
date: 2010-05-05 19:48:54
layout: post
slug: how-to-secure-your-wordpress-blog
title: 'HOW TO: Secure Your WordPress Blog'
wordpress_id: 358
categories:
- tech
tags:
- mashable
- plugins
- security
- Wordpress
---

> [wp-security](http://wordpress.org/extend/plugins/wp-security-scan/) Scan is a must-use plugin for anybody looking to secure their website. It'll tell you all the basic WP security settings you do or don't have enabled.

....

I would also change your 'admin' username. Then hackers have to try and guess your username AND password.

Also use the 'Login Lockdown' and "Secure WordPress" plugin.

Login LockDown adds some extra security to WordPress by restricting the rate at which failed logins can be re-attempted.

Secure WordPress automatically changes a few things inside WordPress to make it a little bit more secure.

....

It's better to[ strip down the permissions to "admin"](http://wpcanyon.com/tutorials/10-effective-ways-to-secure-your-wordpress-blog/) and make yourself a new account with full permissions. Then even if hackers manage to get into "admin" account they can do nothing :) They wasted their time.

....

I've also found that the most secure thing you can possibly do is also very simple. After your site is set up simply change your theme file permissions to 444. They can be read, but they can not be changed (ie- hacked by an automated bot).

The ONLY downside is that when you want to modify your theme you need to change the permissions back to 666 temporarily. This is a small price to pay not to get hacked.


via [HOW TO: Secure Your WordPress Blog](http://mashable.com/2010/04/28/wordpress-security-tips/).

Some good advice on security for Wordpress from the comments.
