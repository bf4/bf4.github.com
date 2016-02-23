---
layout: post
title: "Recovering a rebased commit from GitHub"
description: "How to get back an unreachable commit that you can still see in GitHub"
permalink: "recover-a-rebased-commit-from-github"
categories: [ 'git' ]
tags: [ 'git', 'github' ]
published: true
gist: https://gist.github.com/bf4/5a6577891aaeaba5718b
---
{% include JB/setup %}

A stupid way to recover a commit that has been rebased and is now unreachable
  ([ref](https://gist.github.com/piscisaureus/3342247#gistcomment-1682760)):

1. Given unreachable commit `https://github.com/org/repo/commits/332a2b9f43f1f8d7730e0a01356ea183dfadd470`
1. See if you can compare it to any earlier commit you have, e.g.
  `https://github.com/org/repo/compare/f571415f4da9cc28edc83242e353966677dabcd2...332a2b9f43f1f8d7730e0a01356ea183dfadd470`.
1. Push your local commit up to a recovery branch:
   `git checkout f571415f4da9cc28edc83242e353966677dabcd2; git checkout -b recovery; git push origin recovery`.
1. See the patch commits:
   `https://github.com/org/repo/compare/recovery...332a2b9f43f1f8d7730e0a01356ea183dfadd470.patch`
   and download as recovery.patch (you could curl unless it's private so blah blah)
1. Apply the patch commits and push up:
   `git am recovery.patch && git push origin recovery`.

Tada! You have now recovered and shared that commit!
