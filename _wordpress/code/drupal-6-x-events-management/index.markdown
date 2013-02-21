---
comments: true
date: 2009-09-22 20:37:33
layout: page
published: false
slug: drupal-6-x-events-management
title: Drupal 6.x Events Management
wordpress_id: 239
---

Instructions to create an events manager in drupal 6.x that lists events that are bi-directionally linked to affiliates and locations.


# Modules:


* [Views](http://drupal.org/project/views) 

*  [Content Construction Kit (CCK)](http://drupal.org/project/cck),[Iframe](http://drupal.org/project/iframe),[ImageField](http://drupal.org/project/imagefield) ,[Link](http://drupal.org/project/link) ,  [Computed Field
](http://drupal.org/project/computed_field)

* [Calendar](http://drupal.org/project/calendar) 

* [Backreference](http://drupal.org/project/backreference) (optional)

* [Date](http://drupal.org/project/date) 

*  [GMap Module](http://drupal.org/project/gmap), GMap Location

* [RSVP](http://drupal.org/project/rsvp) (optional)

* [Location](http://drupal.org/project/location) , **Location Add Another, Node Locations
**

* Experimental: Taxonomy,autocategorise, automatic nodetitles, nodeaccess, signup, [Ubercart](http://drupal.org/project/ubercart) ,[Signup Integration for Ubercart](http://drupal.org/project/uc_signup) , [Thickbox](http://drupal.org/project/thickbox) , poll, organic groups, user relationships, [Advanced Poll](http://drupal.org/project/advpoll),[Associated Nodes](http://drupal.org/project/associated_nodes),[Automatic Nodetitles](http://drupal.org/project/auto_nodetitle) ,[autocategorise](http://drupal.org/project/autocategorise) ,[Content Profile](http://drupal.org/project/content_profile),[FCKeditor - WYSIWYG HTML editor](http://drupal.org/project/fckeditor) ,[FileField](http://drupal.org/project/filefield) ,[FlashVideo](http://drupal.org/project/flashvideo),[getID3()](http://drupal.org/project/getid3) ,[Node import](http://drupal.org/project/node_import),[Nodeaccess](http://drupal.org/project/nodeaccess),[Nodequeue](http://drupal.org/project/nodequeue),[Node Relativity](http://drupal.org/project/relativity),[Revisioning](http://drupal.org/project/revisioning) ,[Rules](http://drupal.org/project/rules) ,[Signup](http://drupal.org/project/signup),[Simplenews](http://drupal.org/project/simplenews) ,[Token](http://drupal.org/project/token) ,[Webform](http://drupal.org/project/webform),,

* [Popups API (Ajax Dialogs)](http://drupal.org/project/popups) , [Popups: Add and Reference](http://drupal.org/project/popups_reference)

* [Fivestar](http://drupal.org/project/fivestar) 

* [Voting API](http://drupal.org/project/votingapi)

* [Node Reference Create](http://drupal.org/project/noderefcreate)

* [Pathauto](http://drupal.org/project/pathauto)


# Content Types:




## Event


event


## Location


location


## Affiliate


affiliate

* admin/content/node-type/affiliate

* admin/content/node-type/affiliate/fields

* admin/content/node-type/affiliate/display

** admin/content/node-type/affiliate/display/rss

** admin/content/node-type/affiliate/display/simplenews


# PATHAUTO


admin/build/path/pathauto

node path settings: event/[title-raw] etc


# Views:




## Events View of Upcoming Events


admin/build/views

admin/build/views/add


### DEFAULTS:


Style: Table

Arguments:

* Node Type (display all values, validate: node: Event, Validate user has access to node)

* Date (Event date and time: field_event_datetime, from date. Title: Event. Breadcrumb: Event. Provide default argument: Current date, Validate: node: event. Validate user has access to node.  granularity: month. Date field: Content Event Date and Time field_event_datetime from date, OR)

Fields

* Node: Title (Link this field to its node)
* Content: Event Date - From date Default (Link this field to its node, display from and to dates)
* Content: Event Full node (field_event_location, group multiple values, full node)
* Content: Event Full node (field_event_affiliate, group multiple values, full node)
* Node: Has new content Has new content
* Node: Edit link Edit link

Sort Criteria:
*  Content: Event Date and Time (field_event_datetime) - From date (ascending)

Filters
* Node: published or admin
* Date: Content: Event Date and Time (field_event_datetime) - From date >= now
** is greater than or equal to
** date default: Now

PAGE
* path: events
* menu?


### BLOCK:  EVENTS BY BACKLINKS LOCATION


Arguments (override)
* Search: Links to
** Provide default argument
*** Node ID from URL
** Basic Validation

Fields (override)
* Node: Title

Sort Criteria (override): none
Filters (override)
* Node: published or admin


### BLOCK: EVENTS BY NODEREFERENCE LOCATION (with backreference)


Arguments (override)
* Node: nid
** Provide default argument
*** Node ID from URL
** Basic Validation

Field (override)
* Content: Event Title (format: title link, field_event_reference_location), a nodereference node on the location content type

Filters (override)
* Node: published or admin


### BLOCK: EVENTS NODEREFERENCE AFFILIATES (with backreference)


Same as nodereference location
Fields
* Content: Event (field_event_content) a nodereference node on the affiliates content type

OR: Just display the nodereference type, but then you can't filter it.


### FEED: EVENT RSS FEED


* Title: Use the site name
* Style: RSS Feed
* Row Style: Node
* Path: events/feed
* Attach to: Page


## VIEWS: CALENDAR view with ical feed


BLOCK

* admin/build/path/pathauto

* Events: Events by Nodereference Location

** Display: content

** listed in location/*


* Events: Events by Nodereference Affiliate

** Display: content

** listed in affiliate/*

