---
comments: true
date: 2012-06-15 15:02:16
layout: post
slug: wow-i-really-understand-mapreduce-now
title: Wow, I really understand MapReduce now!
wordpress_id: 605
categories:
- Code
- tech
tags:
- hadoop
- hive
---

Here at the [Hadoop session at WindyCityDB](http://windycitydb.org/sessions/#segel)

**Really high level MapReduce**

1) Take one input, process into many outputs

2) Process those many outputs, and generate one output

Why? Because our data sets are so huge, we've split up the tasks to make it more efficient.  The data is split across many nodes on the HDFS system. That is, MapReduce is a way of processing data so huge you can't do it a more conventional way.

**Slightly lower level**

Using the 'Hello World' of MapReduce, the WordCount algorithm, per Dean Wampler

* Mapping Phase

1) Input all of Shakespeare

2) Break up all the words (i.e. map them into key value pairs, e.g. 'wanton' => 1, where wanton has a count of 1)

3) Sort them

* Shuffle phase

1) Send all the mapped 'wanton' key/value pairs to the same reducer node, joining on the values e.g. 'wanton' => [1,1,1,1,1] where for each occurrence of 'wanton', we are aggregating it's count of 1

* Reducing Phase

1) Count up all the values for the each word, so the e.g. 'wanton' appears 5 times

Also see: [http://www.thinkbiganalytics.com/services_educate](http://www.thinkbiganalytics.com/services_educate)
