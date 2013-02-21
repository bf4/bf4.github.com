---
comments: true
date: 2009-06-08 13:05:02
layout: page
slug: icalendar-events-for-multiple-calendars
title: iCalendar Events For Multiple Calendars
wordpress_id: 76
---

Wordpress [iCalendar Events for multiple calendars](http://wordpress.org/extend/plugins/ical-events-for-multiple-calendars/)

Note, this plugin may already do this better; I haven't tested it, yet.  [AmR iCal Events List](http://wordpress.org/extend/plugins/amr-ical-events-list/)

Version 0.1

== Description ==

I am currently modifying this from my private version to one that is more easily extensible in the admin section.  This version may not work right.
Not widgetized in this version.
Example code.  I like to use the Execute PHP Widget to encapsulate this code:

<?php  ICalEvents::display_two_events('url1=http://example.com/cal.ics&url2=http://test.com/cal.ics&link_description=1&limit=30&alt_open=1&custom_reload1=86400&custom_reload2=32850000&gmt_start=' . time()); ?>
Here are the parameters to display two events:
url1 = url of the first iCalendar
url2 = url of the second iCalendar
link_description = 1 if you want to include the link description
limit = the number of events to display
alt_open = 1 if it's not loading properly without this
custom_reload1 = time in milliseconds before the cached copy is reloaded for url1
custom_reload2 = time in milliseconds before the cached copy is reloaded for url2
gmt_start=' . time()  you can use this to set the start time for events being displayed

and you can manually reload it by loading your page yourdomain.org/?ical_events_reload=1 if you are logged in as admin

== Installation ==

1. Unzip in your plugins directory.
1. Activate the plugin through the 'Plugins' menu in WordPress.
1. Best to also install for now the Execute PHP Widget and put it on your sidebar
1. Put the php code in your widget and save

== Frequently Asked Questions ==

= When will this be widgetized =
I don't know; hopefully soon
= When will you move the customization to the admin section =
I don't know; hopefully soon
= This doesn't work =
Leave me a comment with the details and I'll try to fix it.
