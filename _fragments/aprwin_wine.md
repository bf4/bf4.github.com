---
layout: post
title: "APRwin and wine"
published: true
---
{% include JB/setup %}

Here's what I did to get [APRwin](http://www.occ.gov/tools-forms/tools/compliance-bsa/aprwin-software.html)
running under wine and packaged in an OSX dmg.

```sh
# INSTALL wine, winetrick
brew update
brew install wine winetricks

# INSTALL dependency
winetricks mfc42 # Visual C++ 6.0 run-time

# RUN
wine aprwin-software-exe.exe

# PACKAGE 'Bottle' into OSX dmg

\curl -O http://winebottler.kronengberg.org/combo/builds/WineBottlerCombo__1.7.31.dmg
open WineBottlerCombo__1.7.31.dmg

1. Drag 'wine' and 'wine bottler' to Applications
2. open 'wine bottler'
3. advanced, create a new prefix
4. select the aprwin-software-exe.exe file
5. check the box for mfc42
6. check the box to include all files in the .app
7. create it in your Applications folder named e.g. APRWIN

Aside: If you managed to extract the chm from the exe, you can read it with CHMOX
```
