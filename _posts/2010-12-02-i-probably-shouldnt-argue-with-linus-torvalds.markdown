---
comments: true
date: 2010-12-02 17:00:12
layout: post
slug: i-probably-shouldnt-argue-with-linus-torvalds
title: I probably shouldn't argue with Linus Torvalds
wordpress_id: 492
categories:
- Code
tags:
- git
- linus
- rebase
- scm
---

> Umm. Rebasing often makes things much _worse_.
>
>The real problem is that maintainers often pick random - and not at all stable - points for their development to begin with. They just pick some random "this is where Linus -git tree is today", and do their development on top of that. THAT is the problem - they are unaware that there's some nasty bug in that version.
>
>It's actually made worse by rebasing. A lot of people end up rebasing on top of such a random kernel (again, just because it's the 'most recent'). It's very annoying.
>
>Not to mention that rebasing easily results in bugs of its own, when you do hit merge conflicts or double-apply something that already got applied (and wasn't seen as a duplicate and merged away automatically, because the code had been further modified since). We had that in the DVB pull request just yesterday.
>
>> So in short this is a call for, possibly, cleaner History in main Kernel.
>> Please remind me why re-writing history is a bad thing.
>
>Rebasing doesn't result in cleaner history. It just results in _incorrect_ history that looks simpler.
>
>To get cleaner history, people should try to keep their tree clean.
>Not add random patches to random branches, and not start random branches at random points in time that aren't necessarily stable.
>
>Linus


via [LKML: Linus Torvalds: Re: {painfully BISECTED} Please revert f25c80a4b2: arch/um/drivers: remove duplicate structure field initialization](http://lkml.org/lkml/2010/9/28/362).

Nonetheless....

Regarding the rebase command, actually, you can just do this:

    
    git pull --rebase


And, I'd agree that rebasing is generally a bad idea.  It can introduce a whole bunch of problems by rewriting history.

I only rebase now if I'm on "branch" and I just committed/merged a patch to "branch" and before I push to origin, instead of

    
    git fetch; git pull


I

    
    git pull --rebase


In this case, I don’t think it "results in incorrect history" since my new commit has never been in the history before, and, in reality, it should be a commit to the most recent version, anyhow, no?

And this ensures my history is a perfect mirror of origin.  Why create a merge commit "origin/branch into branch" when I’m really just putting a new commit on origin?

That is, the only time I’d use a rebase, at this point.  (and I also

    
    git reset --hard origin/branch; git checkout -b workingbranch


before starting work to ensure my history matches origin. Then I

    
    git checkout branch; git merge --no-commit --no-ff --log workingbranch


review the commit

    
    git commit -a


then

    
    git pull --rebase; git push origin branch


).

Perhaps, the better idea, though, is to

    
    git checkout branch; git pull origin branch; git merge --no-ff --no-commit --log workingbranch; git commit -a; git push origin branch
