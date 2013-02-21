---
comments: true
date: 2010-11-30 17:58:55
layout: post
slug: easy-facebook-birthday-export-to-vcard
title: Easy Facebook Birthday Export to vCard
wordpress_id: 450
categories:
- Code
tags:
- birthday
- export
- facebook
- vcard
---

> The following [sample Facebook desktop application](http://www.sakana.fr/blog/wp-content/plugins/wp-codebox/wp-codebox.php?p=462&download=fb-bdays.pl) exports your friends birthdays in a vCard file format. This file is suitable to be imported into your GMail contacts for example.


via [Facebook API : Exporting your friends birthdays into vCards format - Tech@Sakana – A sysadmin’s blog](http://www.sakana.fr/blog/2010/11/02/facebook-api-exporting-your-friends-birthdays-into-vcards-format/).

I made some modifications to get a the old login token and hard code it in there.  Then I ran [fb-bdays.pl](http://www.sakana.fr/blog/wp-content/plugins/wp-codebox/wp-codebox.php?p=462&download=fb-bdays.pl) > fb-bdays.vcs and imported it into my Google contacts. Easy peasy, and not as ephemeral as syncing a calendar.

(I ran it on OSX Snow Leopard with cpan to install WWW::Facebook::API, Text::vCard::Addressbook, and Date::Parse)
