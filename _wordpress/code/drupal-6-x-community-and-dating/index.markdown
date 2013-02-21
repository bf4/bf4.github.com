---
comments: true
date: 2009-09-23 10:25:28
layout: page
published: false
slug: drupal-6-x-community-and-dating
title: Drupal 6.x Community and Dating
wordpress_id: 242
---

* ubercart selling items and custom forms http://drupal.org/node/333138

* http://drupal.org/node/466960
* drupal media streaming mp3
* open conference project for limmud chicago


event calendar

http://drupal.org/node/326061#comment-1077193

birthdays
http://drupal.org/project/birthdays
http://drupal.org/project/og_calendar
http://drupal.org/project/sabbath
http://drupal.org/project/signup
feed parser

http://drupal.org/project/feedapi
http://www.tmtdigital.com/node/47
dash media player install instructions
also zina all downloaded in limmudchi
http://groups.drupal.org/node/16850
pft
for surveys, use cck (or maybe webform which is one way)
http://drupal.org/node/117662
handbook for cck
http://drupal.org/node/101723
or use profile fields
http://drupal.org/handbook/modules/profile
http://drupal.org/project/nodeprofile (5.x only)
use civicrm to extend profiles and groups http://drupal.org/node/39236
http://drupal.org/project/modules?text=gallery2
http://drupal.org/project/gallery
http://drupal.org/project/google_analytics
http://drupal.org/project/phplist
http://drupal.org/project/iframe
http://drupal.org/project/docapi
http://drupal.org/project/cck_gmapaddress
http://drupal.org/project/activity
not 6.x yet http://drupal.org/project/listhandler
Directory


Links package: http://drupal.org/node/24719
Links Package
Picasa


iCal feed parser


Daily


, usernode, CRE (COntent Reccomendation Engine), buddylist, private messaging module, CCK, views, and the core profile module. incorporate a custom profile page and you have a drupal dating site.
I am making a tutorial on how to set up a full feature dating/community website on http://dorax.naturalp.org/?q=node/6
Facebook
Drupal for Facebook,
http://drupal.org/project/fb
http://drupal.org/project/fbconnect
post email content
http://drupal.org/node/200702
CSS Gzip
http://drupal.org/project/site_map
http://drupal.org/project/googlenews
http://drupal.org/project/urllist

BAWStats

uses awstats and betterawstats
Search Engine Referers


FeedBurner

http://groups.drupal.org/node/2791

Drupal Twin Cities User Group notes from 2/28/07

Topic - Building a community Drupal site

We started with introductions – again a range of very experienced Drupal devs and configurers and extremely new users and developers.

Core goals of any group site include:
crm
newsletter
locative and event information


We saw some functionality, including custom user profile which were tied into Google Maps (therefore providing pretty cool search result possibilities), custom discussion groups (a CCK type), custom Events (another CCK type) and more.

Here's a brief list of the modules which were enabled in this profile:

    * Bio (possibly CVS head – patched by Allie)
          o Users: profile module – not node-based , bio is node-based. Nodes are nice...
    * CCK
          o image field
          o imagecache
          o date
          o node ref
          o option widgets
          o text
          o user ref
          o view field
          o Content Types created: Image, Discussion (comments plus 'fivestar' rating), News, Events, Page, Profile, Group
    * Core
          o aggregator
          o blog
          o color
          o comment
          o contact
          o help
          o menu
          o poll
          o search
          o statistics
          o taxonomy
          o tracker
          o upload
    * image
          o imagecache – scale, crop, resize, etc.
          o NOT image
    * TinyMCE
          o two profiles – auth and admin
    * JavaScript
          o JS Calendar
          o JavaScript Tools
    * Location
          o gmap
          o geo (new today by m fredrickson)
          o gmap location (not enabled)
          o gmap macro builder (not enabled)
          o gmap views integration
          o location
          o location views
    * Mail
          o mime mail
          o mailing list manager
                + ezmlm - talks to ezmlm (deemed more scalable than php-based systems)
                      # also – php-based email more easily flagged as spam?
          o newsletter
          o send
    * Organic Groups
          o og
          o og vocab
    * Other
          o bio
          o google sitemap
          o imce
          o menutrim (not working?)
          o panels
          o pathauto
          o simplemenu
          o textimage
    * Captcha
    * Views
          o calendar
          o views
          o views bonus pack
          o views rss
          o views ui
    * Voting
          o voting api
          o voting api actions
          o fivestar

Also – access roles setup (1 additional layer - someone between user 1 and authenticated -- a content administration role)
Theme tweaking
Several additional blocks, such as a 'recent news' block
Lots and lots of configuration and refinement of options.

That's about all my notes have -- but I'm sure I missed items. Others - please refine with your recollections.

Thanks again to Allie, Mark and Bobbi of Advantage Labs for presenting!

-------------

Recipe for building a Drupal-powered blogging community website
By dnorman

Drupal, of course. It’s got a blogging module available out of the box (it takes a checkbox to enable it). OK. Blogging is taken care of. Members just have to click “Create content” and select “Blog post”. Easy peasey.

Want to allow members of the community to create their own groups? Organic Groups. It’s amazingly flexible, and has an added bonus, in this case, of also enabling access control to content based on group membership (after enabling Organic Groups, go to the settings page for the module and enable “Access Control”). Meaning that the student teachers could create as many private group contexts as they like, and then grant access to their content to any of their groups (and only those groups) if desired. Very powerful stuff.

OK. So now we have a bunch of student teachers blogging their brains out. That’s a lot of content to keep track of. Their professors and practicum teachers need to keep up on all of the relevant posts, and provide feedback in a timely manner. How to provide tools to let individuals track content that they’re allowed to see, that they haven’t seen yet, and that they need to respond to… Views. Drupal’s Views module is killer for this. It’s basically a database query generator, where you can provide a set of criteria to filter content, and create a display on the website. So I created a couple of handy views to help people keep up.

The first view was a simple “all content that has been posted to any of your groups, sorted in reverse chronological order” - this is the “river of news” display, which meant that members didn’t have to go hunting through their various groups (some had over a dozen group memberships) to find new content. It’s all merged, sorted, and presented to them on the front page of the site. This let members keep their fingers on the pulse of the community - they could see at a glance what was being published in all of the groups they cared about. This view also displayed the number of comments (and any new comments were flagged) so people could easily follow up on conversations.

The second view was intended to help members keep up with new content - essentially an “inbox” to be used by professors and teachers. This view was a clone of the first “river of news” view, but only displayed unread items. As a professor viewed a blog post, it would get dropped out of this view for them.

We also used the Book module to create documentation on the site (how to use the site, as well as pages with links to other resources, an FAQ, etc…) and we enabled the Forum module to create a separate non-blog discussion board within the site (but this never really got used much…)

That’s really all there is to it - Drupal just handles the rest, and once it’s configured it takes very little care and feeding.

Here’s the stuff we used (the site was built a year ago on Drupal 4.7, but I’m listing what would be used as of the current Drupal 5.3):

    * Drupal 5.3
    * Organic Groups module
    * Views module
    * LDAP Integration module (current 5.3 branch borks on UCalgary’s LDAP, so you might have to play a bit)
    * Insert View module (for embedding the views on the front page)
    * TinyMCE module (for a rich text editor while creating/editing content)
    * Anarchy Media Player (non Drupal - add the Standalone JS version as a block in your site theme’s header and all media will be embedded automatically)


http://www.nonprofittechblog.org/towards-a-new-kind-of-nonprofit-website-part-i
http://www.nonprofittechblog.org/why-your-nonprofits-volunteer-base-should-blog-for-your-nonprofit
http://www.nonprofittechblog.org/towards-a-new-kind-of-nonprofit-website-part-ii

Key modules we will be discussing will be blog, imagecache, nodequeue, Content Construction Kit (CCK) and Views. These modules constitute the core of any good Drupal community site as together they allow for a nearly infinite level of layout customization. CCK and Views are a profoundly powerful aspect of Drupal but they require a high level of technical knowledge to use properly. CCK allows you to create customized blog entries in which certain fields are used to specifically fill in portions of a magazine layout like the teaser thumbnail Views are a way in Drupal to customize the ordering and layout of specific pieces of content on your Web site. Those of you who have used report builders in Raiser’s Edge or Crystal Reports will be surprised that there is now the same capability in a CMS. Learn more about Views here. For those of you in Joomla world, CCK and Views don’t have any equivalents although there is something in beta that is rolling out.

They have created a customized distribution of Drupal called Acquia Drupal that bolsters Drupal’s ability to become a community website.

* perhaps community tasks for ppl to volunteer to bring things http://drupal.org/project/community_tasks
* I should look at panels at some point http://drupal.org/project/panels


job search http://drupal.org/project/jobsearch
classifieds http://drupal.org/project/ed_classified

userwall http://drupal.org/project/user_wall
attach taxonomy terms to a field http://drupal.org/project/field_taxonomy

branding drupal page http://www.trellon.com/services/website_development/anatomy
civicrm http://drupal.org/project/civicrm
http://drupal.org/project/activism (also may allow volunteering)

ell a friend
http://drupal.org/project/send
http://drupal.org/project/tellafriend_node

transaction? http://drupal.org/project/transaction

hides all troll postings http://drupal.org/project/cave *

community building http://drupal.org/node/206724
actions http://drupal.org/node/298476
potluck? webform http://drupal.org/handbook/modules/webform
uc node checkout instructions http://drupaleasy.com/blogs/ultimike/2009/03/event-registration-ubercart

open inviter http://openinviter.com/article.php?service=drupal
http://drupal.org/node/483570 facebookstream

use: jewishmeetup for keeping track of friends birthdays, looking for events in chicago, finding people based on age/sex, looking for groups chicago based people are in. what else? blogging? w moderators and extra fields that can be added and search criteria and phone numbers and address and public/private information for user-defined fields

http://drupal.org/project/check_heavy_ui

honeypot http://drupal.org/project/httpbl
spam http://drupal.org/project/mollom
bad behavior http://drupal.org/project/badbehavior

contentprofile
webform
messaging
activity
flag?
shoutbox?
chat?
