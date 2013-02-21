---
comments: true
date: 2010-09-13 14:12:34
layout: post
slug: a-js-game-in-1024-bytes
title: A JS game in 1024 bytes
wordpress_id: 420
categories:
- Code
---

A JS game in 1024 bytes


> Bouncing Beholder

My JS1K entry---a JavaScript platform game that fits in 1024 bytes.

(See here for my old, space-defense game entry.)

Use the arrow keys to move and jump. Collect as many coins as you can. Be wary of purple-colored grass.

This is the code (newlines added):

c=document.body.children[0];h=t=150;L=w=c.width=800;u=D=50;H=[];R=Math.random;for($ in C=
c.getContext('2d'))C[$[J=X=Y=0]+($[6]||'')]=C[$];setInterval("if(D)for(x=405,i=y=I=0;i<1e4;)L=\
H[i++]=i<9|L<w&R()<.3?w:R()*u+80|0;$=++t%99-u;$=$*$/8+20;y+=Y;x+=y-H[(x+X)/u|0]>9?0:X;j=H[o=\
x/u|0];Y=y<j|Y<0?Y+1:(y=j,J?-10:0);with(C){A=function(c,x,y,r){r&&a(x,y,r,0,7,0);fillStyle=c.P\
?c:'#'+'ceff99ff78f86eeaaffffd45333'.substr(c*3,3);f();ba()};for(D=Z=0;Z<21;Z++){Z<7&&A(Z%6,w/\
2,235,Z?250-15*Z:w);i=o-5+Z;S=x-i*u;B=S>9&S<41;ta(u-S,0);G=cL(0,T=H[i],0,T+9);T%6||(A(2,25,T-7\
,5),y^j||B&&(H[i]-=.1,I++));G.P=G.addColorStop;G.P(0,i%7?'#7e3':(i^o||y^T||(y=H[i]+=$/99),\
'#c7a'\));G.P(1,'#ca6');i%4&&A(6,t/2%200,9,i%2?27:33);m(-6,h);qt(-6,T,3,T);l(47,T);qt(56,T,56,\
h);A(G);i%3?0:T<w?(A(G,33,T-15,10),fc(31,T-7,4,9)):(A(7,25,$,9),A(G,25,$,5),fc(24,$,2,h),D=B&y\
>$-9?1:D);ta(S-u,0)}A(6,u,y-9,11);A(5,M=u+X*.7,Q=y-9+Y/5,8);A(8,M,Q,5);fx(I+'¢',5,15)}D=y>h?1:D"
,u);onkeydown=onkeyup=function(e){E=e.type[5]?4:0;e=e.keyCode;J=e^38?J:E;X=e^37?e^39?X:E:-E}


via [Bouncing Beholder [JS1k entry]](http://marijn.haverbeke.nl/js1k.html).

[Just the game](http://benjaminfleischer.com/wp-content/uploads/2010/09/bouncinggame.html)
