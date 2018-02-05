---
layout: post
title: "A tour of string encoding errors"
description: ""
permalink: "a-tour-of-string-encoding-errors"
categories: [ ]
tags: []
date: 2018-02-05
published: false
---
{% include JB/setup %}

[https://github.com/bf4/encoded_string](EncodedString)

https://github.com/bf4/encoded_string/blob/master/spec/encoded_string_spec.rb

## Raised by Encoding and String methods

### Encoding::UndefinedConversionError

<pre>
    when a transcoding operation fails
    if the String contains characters invalid for the target encoding
    e.g. "\x80".encode('UTF-8','ASCII-8BIT')
    vs "\x80".encode('UTF-8','ASCII-8BIT', undef: :replace, replace: '<undef>')
    # => '<undef>'
</pre>

### Encoding::CompatibilityError

<pre>
    when Encoding.compatibile?(str1, str2) is nil
    e.g. utf_16le_emoji_string.split("\n")
    e.g. valid_unicode_string.encode(utf8_encoding) << ascii_string
</pre>

### Encoding::InvalidByteSequenceError

<pre>
    when the string being transcoded contains a byte invalid for
    either the source or target encoding
    e.g. "\x80".encode('UTF-8','US-ASCII')
    vs "\x80".encode('UTF-8','US-ASCII', invalid: :replace, replace: '<byte>')
    # => '<byte>'
</pre>


```ruby
# invalid bytes in the target encoding
"I have a bad byté\x80".force_encoding("US-ASCII").encode("UTF-8")
```

### ArgumentError

<pre>
    when operating on a string with invalid bytes
    e.g."\x80".split("\n")
</pre>

### TypeError

<pre>
    when a symbol is passed as an encoding
    Encoding.find(:"UTF-8")
    when calling force_encoding on an object
    that doesn't respond to #to_str
</pre>

## Raised by transcoding methods

###  Encoding::ConverterNotFoundError

<pre>
    when a named encoding does not correspond with a known converter
    e.g. 'abc'.force_encoding('UTF-8').encode('foo')
    or a converter path cannot be found
    e.g. "\x80".force_encoding('ASCII-8BIT').encode('Emacs-Mule')
</pre>

## Raised by byte <-> char conversions

###  RangeError: out of char range

<pre>
    e.g. the UTF-16LE emoji: 128169.chr
</pre>
