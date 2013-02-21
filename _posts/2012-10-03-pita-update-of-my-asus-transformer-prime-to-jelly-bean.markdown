---
comments: false
date: 2012-10-03 10:07:20
layout: post
slug: pita-update-of-my-asus-transformer-prime-to-jelly-bean
title: PITA update of my Asus Transformer Prime to Jelly Bean
wordpress_id: 656
categories:
- software
tags:
- android
- asus
- tablet
---

As noted on the androidpolice forum  in the comments, my  Asus Transformer Prime to Jelly Bean OTA [update to android was available  but the update failed,](http://www.androidpolice.com/2012/09/27/asus-transformer-prime-tf201-jelly-bean-ota-rolling-out-now/#comment-664824494) and then the update was no longer 'available'.  (Maybe it was because 'Cut the Rope' was running at the time?)


> [spydie](http://www.androidpolice.com/2012/09/27/asus-transformer-prime-tf201-jelly-bean-ota-rolling-out-now/#) • [6 days ago](http://www.androidpolice.com/2012/09/27/asus-transformer-prime-tf201-jelly-bean-ota-rolling-out-now/#comment-664824494) Mine said update available. I downloaded it. It asked if I wanted to install it now. I said yes. It went through the usual, verify the download, power-down, restart, finish installing. Got a triangle over the android guy. Failed to install. Can't get it to re-download (says there's no update) and can't find the download on my tab (anyone know where the download is stored?) to try to install it again. I'm stuck on 4.0.3 now and no update in sight.


I tried to install manually from SD micro card, but nothing happened. I then discovered a post that explained [that my Mac was unzipping the firmware update file twice](http://www.theandroidsoul.com/update-asus-transformer-prime-in-us-to-android-4-1-jelly-bean-officially/). So, I downloaded the firmware, in terminal, unzipped it once, and put that zip file on my SD micro cad, and the update went successfully. Yay!


>

>
>

>   1. If the build number starts with “TW”, your SKU is TW. Similarly, if your build number starts with “US”, you must download the firmware for the US SKU. Similarly for WW, you need to download the WW firmware.
>

>   2. Now that you have checked the SKU version of your tablet, download the corresponding stock firmware file from the links below:

* [US Firmware](http://dlcdnet.asus.com/pub/ASUS/EeePAD/TF201/US_epad_user_10_4_2_15_UpdateLauncher.zip)
* [TW Firmware](http://dlcdnet.asus.com/pub/ASUS/EeePAD/TF201/TW_epad_user_10_4_2_15_UpdateLauncher.zip)
* [WW Firmware](http://dlcdnet.asus.com/pub/ASUS/EeePAD/TF201/WW_epad_10_4_2_15_UpdateLauncher.zip)




Now I wonder if I really needed to do that factory reset and lose all my settings and data :(



The file I downloaded was "US_epad_user_10_4_2_15_UpdateLauncher.zip" but the unzipped archive I put on the SD card was "US_epad-user-10.4.2.15.zip"
