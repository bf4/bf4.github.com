---
---

# Git

## merging a branch into master


when on a dev branch and you want to merge into master, do this

{% highlight bash %}
git checkout master && git fetch && git reset --hard origin/master && git checkout - && git merge --ff-only master && git checkout master && git merge --no-ff -
{% endhighlight %}

check that it doesn't break anything in the browser while you run your tests (i know you restarted your browser)

if all is good, do the below (if there are no migrations, just cap deploy.)

{% highlight bash %}
 git push && cap deploy:migrations
{% endhighlight %}


### remove your local branches that you're done with:

{% highlight bash %}
 git checkout master && git reset --hard origin/master; git branch --merged | grep -v '*' | xargs git branch -D
{% endhighlight %}


 o see what else you might have locally that's not merged in, do

    git branch --no-merged

this is what I ran to remove elasticsearch physically and with great brutality from the repo.. takes awhile

    git filter-branch  -f --tree-filter 'rm -rf vendor/elasticsearch' HEAD

see unmerged remote branches

    git branch -r --no-merged

update your references to the remote (when someone else removed a branch)

    git remote prune origin
