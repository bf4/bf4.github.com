---
comments: true
date: 2011-03-09 14:52:40
layout: post
slug: hoptoad-the-cloud-and-the-pond-ahead
title: Hoptoad, the cloud, and the pond ahead
wordpress_id: 544
categories:
- IT
tags:
- hoptoad
- mongodb
- nosql
---

> 

> 
> ### Enter MongoDB
> 
> 
In order to display exception details quickly, we decided to make use of MongoDB, removing temporary file system and S3 storage alltogether. When an exception hits our API, we do the same processing we’ve always done but store it in a MongoDB collection instead. The three main advantages to you are:

> 
> 
	
>   * _Error details are always available_, immediately after we receive them. Therefore you can click on the error URL that you receive on the notification emails and start seeing details for the error with no delay.
> 
	
>   * A more robust storage approach, where _app instance failures will never cause details to be completely lost_. With careful planning, disk space is not an issue either.
> 
	
>   * _Better response times_: A nice by-product of this change has been that both storing and reading the data has improved the response time of the application by roughly 30%.
> 




via [Hoptoad, the cloud, and the pond ahead](http://feedproxy.google.com/~r/GiantRobotsSmashingIntoOtherGiantRobots/~3/c5r_lpLj3eI/3743877956).
