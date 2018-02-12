---
layout: post
title: "A tour of string encoding errors"
description: ""
permalink: "a-tour-of-string-encoding-errors"
categories: [ ]
tags: [ruby]
date: 2018-02-12
published: true
---
{% include JB/setup %}

See [https://github.com/bf4/encoded_string](EncodedString) and [specs](https://github.com/bf4/encoded_string/blob/master/spec/encoded_string_spec.rb).

## Pick compatible encoding

```ruby
def pick_encoding(str1, str2)
  Encoding.compatible?(source_a, source_b) || Encoding.default_external
end
```

```ruby
# picks the default external encoding for incompatible encodings
str1 = "\xa1".force_encoding("iso-8859-1")
str2 = "\xa1\xa1".force_encoding("euc-jp")
Encoding.compatible?(str1, str2) #=> nil
pick_encoding(str1, str2) #=> Encoding.default_external
```

```ruby
# https://github.com/rubyspec/rubyspec/blob/91ce9f6549/core/encoding/compatible_spec.rb#L31
# picks a compatible encoding
str1 = "abc".force_encoding Encoding::US_ASCII
str2 = "\u3042".encode("utf-8")
pick_encoding(str1, str2) #=> Encoding::UTF_8
```

## Raised by Encoding and String methods

In MRI 2.1 `'invalid: :replace'` changed to also replace an invalid byte sequence
see https://github.com/ruby/ruby/blob/v2_1_0/NEWS#L176
https://www.ruby-forum.com/topic/6861247
https://twitter.com/nalsh/status/553413844685438976

For example, given:

```ruby
  "\x80".force_encoding("Emacs-Mule").encode(:invalid => :replace).bytes.to_a
```

<pre>
On MRI 2.1 or above: 63  `'?'`
else               : 128 `"\x80"`
</pre>

```
Ruby's default replacement string is:
  U+FFFD ("\xEF\xBF\xBD"), for Unicode encoding forms, else
  ?      ("\x3F")
```

```ruby
REPLACE = "?"
ENCODE_UNCONVERTABLE_BYTES =  {
  :invalid => :replace,
  :undef   => :replace,
  :replace => REPLACE
}
ENCODE_NO_CONVERTER = {
  :invalid => :replace,
  :replace => REPLACE
}
```

### Encoding::UndefinedConversionError

<pre>
    when a transcoding operation fails
    if the String contains characters invalid for the target encoding
    e.g. "\x80".encode('UTF-8','ASCII-8BIT')
    vs "\x80".encode('UTF-8','ASCII-8BIT', undef: :replace, replace: '<undef>')
    # => '<undef>'
</pre>


```ruby
# see https://github.com/ruby/ruby/blob/34fbf57aaa/transcode.c#L4289
# ISO-8859-1 -> UTF-8 -> EUC-JP
# "\xa0" NO-BREAK SPACE, which is available in UTF-8 but not in EUC-JP

source_encoding = Encoding.find('ISO-8859-1')
incompatible_encoding = Encoding.find('EUC-JP')
string = "\xa0 hi I am not going to work".force_encoding(source_encoding)

string.encode(incompatible_encoding)
```

```ruby
wrapped_string_template = "abaaaaaaaaaa%saaaaa"
ascii_arrow_symbol = "\xAE"
utf8_encoding = "UTF-8"
wrapped_string = sprintf(wrapped_string_template, ascii_arrow_symbol).force_encoding("ASCII-8BIT")

wrapped_string.encode(utf8_encoding)
```

### Encoding::CompatibilityError

<pre>
    when Encoding.compatibile?(str1, str2) is nil
    e.g. utf_16le_emoji_string.split("\n")
    e.g. valid_unicode_string.encode(utf8_encoding) << ascii_string
</pre>

```ruby
ascii_arrow_symbol = "\xAE"
utf_8_euro_symbol = "\xE2\x82\xAC"
utf8_encoding = "UTF-8"
ascii_string = ascii_arrow_symbol.force_encoding("ASCII-8BIT")
valid_unicode_string = utf_8_euro_symbol.force_encoding('UTF-8')

valid_unicode_string.encode(utf8_encoding) << ascii_string
```

```ruby
# see https://github.com/rspec/rspec-expectations/blob/f8a1232/spec/rspec/expectations/fail_with_spec.rb#L50
#     https://github.com/rspec/rspec-expectations/issues/201
#     https://github.com/rspec/rspec-expectations/pull/220

binary_poop = '💩'  # [128169] "\u{1F4A9}"
non_ascii_compatible_string) = "This is a pile of poo: #{binary_poop}, yuck".encode("UTF-16LE")

non_ascii_compatible_string.split("\n")
```

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
# see https://github.com/jruby/jruby/blob/c1be61a501/test/mri/ruby/test_transcode.rb#L13
source_encoding = Encoding.find('US-ASCII')
target_encoding = Encoding.find('UTF-8')
string = "I have a bad byté\x80".force_encoding(source_encoding)

string.encode(target_encoding)
```

```ruby
# NOTE: skip on JRuby https://github.com/jruby/jruby/issues/2580
```


### ArgumentError

<pre>
    when operating on a string with invalid bytes
    e.g."\x80".split("\n")
</pre>


```ruby
utf8_encoding = "UTF-8"
message_with_invalid_byte_sequence = "\xEF \255 \xAD I have bad bytes".force_encoding(utf8_encoding)
message_with_invalid_byte_sequence.valid_encoding? #=> false
message_with_invalid_byte_sequence.split("\n")
```

### TypeError

<pre>
    when a symbol is passed as an encoding
    Encoding.find(:"UTF-8")
    when calling force_encoding on an object
    that doesn't respond to #to_str
</pre>


```ruby
Encoding.find(:"UTF-8")
```

## Raised by transcoding methods

###  Encoding::ConverterNotFoundError

<pre>
    when a named encoding does not correspond with a known converter
    e.g. 'abc'.force_encoding('UTF-8').encode('foo')
    or a converter path cannot be found
    e.g. "\x80".force_encoding('ASCII-8BIT').encode('Emacs-Mule')
</pre>


```ruby
# see https://github.com/rubyspec/rubyspec/blob/91ce9f6549/core/string/shared/encode.rb#L12
source_encoding = Encoding.find('ASCII-8BIT')
no_converter_encoding = Encoding::Emacs_Mule
string = "\x80".force_encoding(source_encoding)

string.encode(no_converter_encoding)
```

```ruby
# Skip if RUBY_VERSION < '2.1'
# See comment above ENCODE_UNCONVERTABLE_BYTES in encoded_string.rb
# for why the behavior differs by (MRI) Ruby version.
```

## Raised by byte <-> char conversions

###  RangeError: out of char range

<pre>
    e.g. the UTF-16LE emoji: 128169.chr
</pre>


```ruby
128169.chr
```

## Handling encoding errors

### Convert to matching encoding

```ruby
    ENCODE_UNCONVERTABLE_BYTES =  {
      :invalid => :replace,
      :undef   => :replace,
      :replace => REPLACE
    }
    ENCODE_NO_CONVERTER = {
      :invalid => :replace,
      :replace => REPLACE
    }
    def convert_to_matching_encoding(string, target_encoding)
      string = remove_invalid_bytes(string)
      string.encode(target_encoding)
    rescue Encoding::UndefinedConversionError, Encoding::InvalidByteSequenceError
      string.encode(target_encoding, ENCODE_UNCONVERTABLE_BYTES)
    rescue Encoding::ConverterNotFoundError
      string.dup.force_encoding(target_encoding).encode(ENCODE_NO_CONVERTER)
    end
```

### Remove invalid bytes

Prevents raising an ArgumentError

```ruby
    REPLACE = "?"
    if String.method_defined?(:scrub)
      # https://github.com/ruby/ruby/blob/eeb05e8c11/doc/NEWS-2.1.0#L120-L123
      # https://github.com/ruby/ruby/blob/v2_1_0/string.c#L8242
      # https://github.com/hsbt/string-scrub
      # https://github.com/rubinius/rubinius/blob/v2.5.2/kernel/common/string.rb#L1913-L1972
      def remove_invalid_bytes(string)
        string.scrub(REPLACE)
      end
    else
      # http://stackoverflow.com/a/8711118/879854
      # Loop over chars in a string replacing chars
      # with invalid encoding, which is a pretty good proxy
      # for the invalid byte sequence that causes an ArgumentError
      def remove_invalid_bytes(string)
        string.chars.map do |char|
          char.valid_encoding? ? char : REPLACE
        end.join
      end
    end
```

### Pick compatible encoding

```ruby
Encoding.compatible?(source_a, source_b) || Encoding.default_external
```

### Append string

```ruby
string = convert_to_matching_encoding(string, target_encoding)
string << convert_to_matching_encoding(another_string, target_encoding)
```

### Split string

```ruby
string = convert_to_matching_encoding(string, target_encoding)
string_or_regex = convert_to_matching_encoding(string_or_regex)
string.split(string_or_regex)
```

### Prepare to compare two strings

```ruby
encoding = Encoding.compatible?(actual, expected) || Encoding.default_external

actual   = convert_to_matching_encoding(actual, encoding)
expected = convert_to_matching_encoding(expected, encoding)

diff_output = convert_to_matching_encoding("\n", encoding)
```

and then you can

```ruby
require 'diff/lcs'
require 'diff/lcs/hunk'
@file_length_difference = 0
expected_lines = expected.split("\n").map! { |e| e.chomp }
actual_lines = actual.split("\n").map! { |e| e.chomp }
context_lines = 3

diffs = Diff::LCS.diff(expected_lines, actual_lines)
hunks = diffs.map {|piece|
  Diff::LCS::Hunk.new(
    expected_lines, actual_lines, piece, context_lines, @file_length_difference
  ).tap do |h|
    @file_length_difference = h.file_length_difference
  end
}

format_type = :unified
hunks.each_cons(2) do |prev_hunk, current_hunk|
  begin
    if current_hunk.overlaps?(prev_hunk)
      current_hunk.merge(prev_hunk)
    else
      diff_output << prev_hunk.diff(format_type).to_s
    end
  ensure
    diff_output << "\n"
  end
end

if (last_hunk = hunks.last)
  diff_output << last_hunk.diff(format_type).to_s
  diff_output << "\n"
end
puts diff_output

colorized_diff = diff_output.lines.map do |line|
  case line[0].chr
  when "+"
    green = 32
    "\e[#{green}m#{line}\e[0m"
  when "-"
    red = 31
    "\e[#{red}m#{line}\e[0m"
  when "@"
    if line[1].chr == "@" 
      blue = 34
      "\e[#{blue}m#{line}\e[0m"
    else
      normal = 0
      "\e[#{normal}m#{line}\e[0m"
    end
  else
    normal = 0
    "\e[#{normal}m#{line}\e[0m"
  end
end.join

puts colorized_diff
```
