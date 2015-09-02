---
layout: post
title: "Uploading and downloading Slack emoji"
description: "Uploading and downloading Slack emoji"
permalink: "uploading-and-downloading-slack-emoji"
categories: [ 'top' ]
tags: [ 'slack' ]
published: true
---
{% include JB/setup %}

My company recently went to Slack and we didn't have all the fun emoji that I liked from
one of my other Slack groups.  All I had to do was find a Slack API wrapped to download
them from one team, and upload them to mine.  (Doing it manually would take way too long).

I didn't find any one tool that did this, but I found one that
[downloaded](https://github.com/dornerworks/slack-emojis)
and one that [uploaded](https://github.com/smashwilson/slack-emojinator) (MIT)
and combined them at
[https://github.com/bf4/slack-emojis/tree/mine](https://github.com/bf4/slack-emojis/tree/mine)

While we're here, I also have a hacky gem I wrote to [backup my Slack teams.called
'slackup'](https://github.com/bf4/slackup).
