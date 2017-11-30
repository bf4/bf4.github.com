---
layout: post
title: "Standard responses"
published: true
---
{% include JB/setup %}

You don't say what version of THING you're on or code examples how you're using THING and what's different from your expectations.

You also don't say what you've tried, or what docs you've read,
so it's hard to know your investment in solving it yourself vs. asking the internet to do the work for you.
If that sounds harsh, sorry, it just comes from experience handling open source issues.

QUICK GUESS AT WHAT IT COULD BE FROM EXPERIENCE, RATHER THAN INVESTIGATION.

It is a common problem in asking tech questions to not give enough info.
I recommend you take a look at [Simon Tathan's 'How to Report Bugs Effectively'](https://www.chiark.greenend.org.uk/~sgtatham/bugs.html) or
[CONTRIBUTING.md#filing-an-issue](https://github.com/rails-api/active_model_serializers/blob/f5ec8ed9d4624afa6ede9b39d51d145b53b1f344/CONTRIBUTING.md#filing-an-issue) or
[yourbugreportneedsmore.info](https://github.com/norman/yourbugreportneedsmore.info/blob/master/index.html)

Quoting the last one:

   <h1>Hello there!</h1>
    <p>
      You've been directed to this website because you submitted a bug report to
      an open source project, but you provided too little information for the
      developers to be able to help you. Does this look familiar?
    </p>
    <blockquote>
      <em>
        Hi, I'm getting a weird error when I use &lt;program&gt;, do you know
        what might be wrong?
      </em>
    </blockquote>
    <p>
      Debugging software is hard, even when you have the code in front of you.
      Now imagine, trying to debug software on somebody else's computer, without
      any access to the code, without knowing what operating system is on the
      computer, or even what version of your software is being used. Your only
      hint is that "there's a weird error" and you have 1 line out of a 50 line
      stack trace to work with. Sound impossible? That's because it is!
    </p>
    <h2>So you want help?</h2>
    <p>
      If you want to actually get your problem solved, here is how you can
      submit a good bug report that a developer will actually respond to:
    </p>
    <ul>
      <li>
        Got a stack trace? Send the whole thing - or better yet, send a link to
        it pasted on <a href="http://gist.github.com">Gist</a> or <a
        href="http://pastie.org">Pastie</a>.
      </li>
      <li>
        Provide context, for example what version of Ruby or Python or COBOL or
        whatever you're using, as well as the code that causes the problem.
        Again, Gist and Pastie are your friends.
      </li>
      <li>
        Better yet, create a small program that reproduces the problem, and put
        it on <a href="http://github.com">Github</a>, or zip it and send it in
        an email.
      </li>
      <li>
        Even better yet, if you are able to, add a failing test case that
        demonstrates the problem you are having, and send it as a pull request
        or patch.
      </li>
    </ul>
    <h2>Too much info?</h2>
    <p>
      If you only remember one thing, remember this: <b>reproducibility is
      key.</b> If I can't reproduce your problem, I can't fix it.
    </p>
    <h2>Not enough info?</h2>
    <p>
      For a longer guide on proper bug reporting, please check
      <a href="https://www.chiark.greenend.org.uk/~sgtatham/bugs.html">Simon Tatham's excellent article</a>.
    </p>

I also recommend taking a look at the slides for [Maintaining Open Source Projects](https://speakerdeck.com/bf4/maintaining-open-source-projects-1).

<script async class="speakerdeck-embed" data-id="8d3e96d048340132a44d7a1615f61d30" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
