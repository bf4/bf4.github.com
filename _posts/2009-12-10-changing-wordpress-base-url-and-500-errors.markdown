---
comments: true
date: 2009-12-10 15:22:37
layout: post
slug: changing-wordpress-base-url-and-500-errors
title: Changing Wordpress Base URL and 500 Errors
wordpress_id: 279
tags:
- apache
- westhost
- Wordpress
---

Apparently this a known thing at my webhost that when the Wordpress administrator changes the base url settings from, say http://foo.com to http://bar.com, Wordpress drops an .htaccess file in the wrong place.  Instead of putting it in /var/www/html/wordpress/.htaccess, it puts it in /.htaccess causing all of Apache's served pages to return a 500 server error.

Does anyone else have that problem?  It certainly raised my blood pressure when everything suddenly went down.  Good thing [WestHost](http://bit.ly/mywesthost) has great tech support.
