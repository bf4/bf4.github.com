---
comments: true
date: 2009-06-04 13:38:07
layout: page
slug: ical-for-events-manager
title: iCal for Events Manger
wordpress_id: 33
---

The [plugin](http://wordpress.org/extend/plugins/icalendar-for-events-manager/)

Changelog

1.0.4 6/10/09

Added get parameter forceoffset to use the wordpress gmt_offset option if the timezone isn't working correctly.

Fixed line breaks in descriptions.

1.0.3 6/9/09
Changed description output to encoded quotable to preserve line breaks

Added these configuration get parameters for time zones:
tzlocation, e.g. America/Chicago
tzoffset_standard, e.g. -0600
tzname, e.g. CST
tzname_daylight, e.g. CDT
tzoffset_daylight, e.g. -0500
I haven't robustly tested this. I think you can find these values [here](http://www.w3.org/2002/12/cal/tzd/)

Added ability to cron output to a file with these get parameters
ical   outputs to the screen
ical=cron  outputs to an ics file and displays success message
ical=rss outputs to an ics file and should be subscribable by an rss reader for cronless update
ical=ics get the ics file if available
This seems to be working right now

Example with output to screen:
Feed will be at http://your-web-address/?ical
Example with output to screen and custom timezones
Feed will be at http://your-web-address/?ical&tzlocation=America/Chicago etc.
Example with cron or rss file creation and custom timezones
Feed will be at http://your-web-address/?ical=rss&tzlocation=America/Chicago etc.
Feed will be at http://your-web-address/?ical=cron&tzlocation=America/Chicago etc.
Example to get ics file
Feed will be at http://your-web-address/?ical=ics

1.0.2  6/8/09 Currently, the timezone information is hardcoded as Chicago in the ical-ec.php file. The next version will allow editing this from the admin panel
