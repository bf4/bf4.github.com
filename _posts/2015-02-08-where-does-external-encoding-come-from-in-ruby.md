---
layout: post
title: "Where does external encoding come from in Ruby?"
description: "Or, how can I just get my Encoding.default_external to be UTF-8?"
tags: ["ruby"]
categories: [ 'ruby' ]
published: false
---
{% include JB/setup %}

Ruby derives `Encoding.default_external`


https://github.com/rspec/rspec-support/compare/19e967a834e5cc9bb9d727ef59c5f580c1a74423%5E...master#diff-6f77530d5756f8c02ca078ddecaa891cR63

+        # Encoding Exceptions:
+        #
+        # Raised by Encoding and String methods:
+        #   Encoding::UndefinedConversionError:
+        #     when a transcoding operation fails
+        #     if the String contains characters invalid for the target encoding
+        #     e.g. "\x80".encode('UTF-8','ASCII-8BIT')
+        #     vs "\x80".encode('UTF-8','ASCII-8BIT', undef: :replace, replace: '<undef>')
+        #     # => '<undef>'
+        #   Encoding::CompatibilityError
+        #     when Encoding.compatibile?(str1, str2) is nil
+        #     e.g. utf_16le_emoji_string.split("\n")
+        #     e.g. valid_unicode_string.encode(utf8_encoding) << ascii_string
+        #   Encoding::InvalidByteSequenceError:
+        #     when the string being transcoded contains a byte invalid for
+        #     either the source or target encoding
+        #     e.g. "\x80".encode('UTF-8','US-ASCII')
+        #     vs "\x80".encode('UTF-8','US-ASCII', invalid: :replace, replace: '<byte>')
+        #     # => '<byte>'
+        #   ArgumentError
+        #     when operating on a string with invalid bytes
+        #     e.g."\x80".split("\n")
+        #   TypeError
+        #     when a symbol is passed as an encoding
+        #     Encoding.find(:"UTF-8")
+        #     when calling force_encoding on an object
+        #     that doesn't respond to #to_str
+        #
+        # Raised by transcoding methods:
+        #   Encoding::ConverterNotFoundError:
+        #     when a named encoding does not correspond with a known converter
+        #     e.g. 'abc'.force_encoding('UTF-8').encode('foo')
+        #     or a converter path cannot be found
+        #     e.g. "\x80".force_encoding('ASCII-8BIT').encode('Emacs-Mule')
+        #
+        # Raised by byte <-> char conversions
+        #   RangeError: out of char range
+        #     e.g. the UTF-16LE emoji: 128169.chr
 # https://github.com/rubyspec/rubyspec/blob/91ce9f6549/core/encoding/compatible_spec.rb#L31
+        it "picks a compatible encoding" do


{% highlight ruby%}
f.respond_to?(:bar)         #=> false
f.respond_to?(:bar, true)   #=> true
{% endhighlight %}

References:


https://github.com/rspec/rspec-support/pull/151#issuecomment-70045539


Figured it out, or at least the meaning of `\x82`:

```ruby
egrave =  "é".encode('UTF-8') #=> "é"
egrave.bytes #=>  [195, 169]
encoded_egrave = egrave.encode('utf-16le') #=> "\u00E9" 
encoded_egrave.bytes #=> > [233, 0] 
# but "\x82" aka 130 is egrave in extended ascii, so on windows
"\x82".force_encoding('ibm437').encode('utf-8') #=> 'é'
# and thus we can reverse it to 
egrave.encode('ibm437') #=> "\x82"
```

Though I'm not sure why it would be encoding it as `ibm437` on windows, and not `utf-16le`.  I'm guessing the internal encoding might be `ibm437`.


Hmm, looking at http://stackoverflow.com/questions/1259084/what-encoding-code-page-is-cmd-exe-using and https://github.com/ruby/ruby/blob/9fd7afefd04134c98abe594154a527c6cfe2123b/ext/win32ole/win32ole.c#L540, 
it appears you can get the current encoding (codepage) on windows in the command prompt by running `chcp` and change it to utf8 via `chcp 65001`.

(on erica's computer was 437!!!)

I'd like to add that and `export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8` as documented pre-conditions for running the test suite.


per http://stackoverflow.com/questions/21289181/char174-returning-the-value-of-char0174-why which links to http://www.theasciicode.com.ar/extended-ascii-code/angle-quotes-guillemets-right-pointing-double-angle-french-quotation-marks-ascii-code-174.html

> It is all about character encoding. 174 (AE in hex) is ® in Unicode, but it is « in Extended ASCII code.

e.g. CP1252 or Windows-1251 or something like that
But I didn't add that specific string and haven't looked into the origins in the suite. 

-------




RUBYOPT="-E utf-8" \
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
 rvm ruby-1.9.2-p330,ruby-1.9.3-p551,ruby-2.0.0-p598,ruby-2.1.5,ruby-2.2.0,jruby-1.7.18,rbx-2.2.2 do \
 ruby -e 'p [RUBY_VERSION, RUBY_ENGINE, Encoding.default_external, __ENCODING__] + "\x80".force_encoding("ASCII-8BIT").force_encoding("Emacs-Mule").encode(:invalid => :replace).bytes.to_a'

 for version in 1.9 2.0; do \
 export JRUBY_OPTS="-Xcompat.version=${version}" ; \
 LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 \
  rvm jruby-1.7.18 do \
 ruby -e 'p [RUBY_VERSION, RUBY_ENGINE, Encoding.default_external, __ENCODING__] + "\x80".force_encoding("ASCII-8BIT").force_encoding("Emacs-Mule").encode(:invalid => :replace).bytes.to_a' ; done







export RUBYOPT="-E utf-8" # illegal switch on 1.8.7
https://github.com/ruby/ruby/blob/ca24e581ba/encoding.c#L1398

 * The default external encoding is initialized by the locale or -E option.


 * encoding may not be valid.  Be sure to check String#valid_encoding?.

 0xAE.chr.unpack('U*')
ArgumentError: malformed UTF-8 character

export LANG=en_US.UTF-8 
export LC_ALL=en_US.UTF-8
https://github.com/bf4/rspec-support/commit/db2c3a43e1cdb0fc1491394328f78c712aa9ed19
https://github.com/bf4/rspec-support/commit/8894d0cec3b5b7ee88d2cc72f0ab50afc19abb71
export JRUBY_OPTS='--server -Xcompile.invokedynamic=false'
export JRUBY_OPTS='--server -Xcompile.invokedynamic=false -Xcompat.version=2.0'
jruby --properties

http://stackoverflow.com/questions/5908774/set-global-default-encoding-for-ruby-1-9
LC_ALL= LANG= ruby -e 'p Encoding.default_external'
#<Encoding:US-ASCII>
Either is set : that value is used
$ LC_ALL=en_US.UTF-8 LANG= ruby -e 'p Encoding.default_external'
#<Encoding:UTF-8>

$ LC_ALL= LANG=en_US.UTF-8 ruby -e 'p Encoding.default_external'
#<Encoding:UTF-8>
Both are set : LC_ALL takes precedence
$ LC_ALL=C LANG=en_US.UTF-8 ruby -e 'p Encoding.default_external'
#<Encoding:US-ASCII>

$ LC_ALL=en_US.UTF-8 LANG=C ruby -e 'p Encoding.default_external'

http://blog.pixelastic.com/2014/09/06/compass-utf-8-encoding-on-windows/

 on windows, the default encoding is usually CP1252. And in the end, you end up with every UTF-8 char encoded as three separate CP1252 chars.
 
 Encoding.default_external = 'utf-8'
 You have to set 'Lucida Console' as console font in window properties.
You may change console code page by 'chcp' command:

C:\XP\system32>chcp
Active code page: 1251

C:\XP\system32>chcp 65001
Active code page: 65001 <------- UTF-8

I use this:

# encoding: utf-8

#Kernel::system('chcp 1251>nul')

Encoding.default_external = Encoding.find(Encoding.locale_charmap)
Encoding.default_internal = __ENCODING__

[STDIN, STDOUT, STDERR].each do |io|
  io.set_encoding(Encoding.default_external, Encoding.default_internal)
end

puts
"[#{Encoding.locale_charmap}::#{Encoding.default_external}|#{Encoding.default_internal}]"

puts 'ÐŸÑ€ÐµÐ²ÐµÐ´!'
But my code crashes whenever Ruby faces a string that contains a
non-CP866 character (like em dash "—"):

in `write': U+2014 from UTF-8 to IBM866
(Encoding::UndefinedConversionError)




-----
If I understand your question, it's why talk about UTF-8 when we're talking about ISO-8859-1 -> EUC-JP?  If that's your question, [it's because when Ruby determines a conversion path it passes through UTF-8](https://github.com/ruby/ruby/blob/34fbf57aaa/transcode.c#L3119-lL3121)

```ruby
 p Encoding::Converter.search_convpath("ISO-8859-1", "EUC-JP")
   #=> [[#<Encoding:ISO-8859-1>, #<Encoding:UTF-8>],
    #    [#<Encoding:UTF-8>, #<Encoding:EUC-JP>]]
```

and see https://github.com/ruby/ruby/blob/34fbf57aaa/transcode.c#L4242-L4250 and https://github.com/ruby/ruby/blob/34fbf57aaa/transcode.c#L3917-L3973 (and maybe https://github.com/ruby/ruby/blob/34fbf57aaa/transcode.c#L4289-L4294 etc)

And then probably also look at the weirdness that is converter not found: https://github.com/rubyspec/rubyspec/blob/archive/core/string/shared/encode.rb#L96-L101

https://github.com/rubyspec/rubyspec/blob/91ce9f6549/core/string/fixtures/utf-8-encoding.rba








00000
      SAFE_CHR = Hash.new { |h, x| h[x] = x.chr rescue ("U+%.4X=" % [x]) }
      def safe_codepoints(str)
        str.each_codepoint.map {|codepoint| SAFE_CHR[codepoint] }
      rescue ArgumentError
        str.each_byte.map {|byte| SAFE_CHR[byte] }
      end
      def expect_identical_string(str1, str2, expected_encoding = str1.encoding)
        expect(str1.encoding).to eq(expected_encoding)

        str1_bytes = safe_codepoints(str1)
        str2_bytes = safe_codepoints(str2)
        return unless str1_bytes != str2_bytes
        str1_differences = []
        str2_differences = []
        str2_bytes.each_with_index do |str2_byte, index|
          str1_byte = str1_bytes.fetch(index) do
            str2_differences.concat str2_bytes[index..-1]
            return
          end
          if str1_byte != str2_byte
            str1_differences << str1_byte
            str2_differences << str2_byte
          end
        end
        expect(str1_differences.join).to eq(str2_differences.join)
      end




Obviously the changes to script/functions.sh and .travis.yml would have to be pushed to rspec-dev, if the look good to you.

For shelling out I've enjoyed using this snippet as it lets me stream the output as the process is running, rather than having to wait.

require 'pty'
# should consider trapping SIGINT in here
def run(cmd)
  puts cmd
  child_process = ''
  result = ''
  # http://stackoverflow.com/a/1162850
  # stream output of subprocess
  begin
    PTY.spawn( cmd ) do |stdin, stdout, pid|
      begin
        # Do stuff with the output here. Just printing to show it works
        stdin.each do |line|
          print line
          result << line
        end
        child_process = PTY.check(pid)
      rescue Errno::EIO
        puts "Errno:EIO error, but this probably just means " +
              "that the process has finished giving output"
      end
    end
  rescue PTY::ChildExited
    puts "The child process exited!"
  end
  unless child_process.success?
    exitstatus = child_process.exitstatus
    puts "FAILED: #{child_process.pid} exited with status #{exitstatus.inspect} due to failed command #{cmd}"
    exit exitstatus || 1
  end
  result
end
though in metric_fu I do use Open3.popen3

    def execute
      mf_debug "Running #{summary}"
      captured_output = ''
      captured_errors = ''
      thread = ''
      Open3.popen3("#{library_name}", *arguments) do |stdin, stdout, stderr, wait_thr|
        captured_output << stdout.read.chomp
        captured_errors << stderr.read.chomp
        thread = wait_thr
      end
    rescue StandardError => run_error
      handle_run_error(run_error)
    rescue SystemExit => system_exit
      handle_system_exit(system_exit)
    ensure
      print_errors
      return captured_output, captured_errors, thread.value
    end

    def handle_run_error(run_error)
      @errors << "ERROR: #{run_error.inspect}"
    end

    def handle_system_exit(system_exit)
      status =  system_exit.success? ? "SUCCESS" : "FAILURE"
      message = "#{status} with code #{system_exit.status}: " <<
        "#{system_exit.message}: #{system_exit.backtrace.inspect}"
      if status == 'SUCCESS'
        mf_debug message
      else
        @errors << message
      end
    end

    def print_errors
      return if @errors.empty?
      STDERR.puts "ERRORS running #{summary}"
      @errors.each do |error|
        STDERR.puts "\t" << error
      end
    end




+     UNDEF_FALLBACK = Hash.new { |h, x| h[x] = "U+%.4X" % [x] }
      # snip ENCODING_STRATEGY =
        :cannot_convert => {
            # :invalid => :nil,                                                                                                                                                                           
            :undef   => :replace,
-           :replace => REPLACE,
+           :fallback => UNDEF_FALLBACK
          },  



The LC_etc changes are to make explicit that we expect our tests to run with external UTF-8 encoding.  Travis does this, but our suite does not.  So, on my vagrant box (rake-dev-compiler, btw), the default encoding is ISO-8859-1, which causes expectation failures.  Rather than debug expectation failures stemming from different external encodings, I just made sure we always test against the same external encoding.  https://github.com/bf4/rspec-support/commit/db2c3a43e1cdb0fc1491394328f78c712aa9ed19  In the future, we might want to try something like [`EnvUtil.with_default_external`](https://github.com/jruby/jruby/blob/c1be61a501d1295fa1ea9f894e1a8e186411f32a/test/mri/ruby/envutil.rb#L150) to test these cases explicitly.
2. Typos.. yeah, sorry, happens
3. I'll change per your recommendations, which I agree with.
4. The safe_chr rescue is a RangeError.  If the codepoint is `128169` (pile of poo), then `128169.chr` raises `RangeError: 128169 out of char range` in which case it returns ` ("U+%.4X" % [128169]) #=> "U+1F4A9"`.  Contrariwise, `63.chr` returns `?`.  The idea behind the safe_chr, safe_codepoints, and expect_identical_string is to provide the most useful failure info if the strings aren't the same.

First, it checks if the strings are the same encoding. If not, it's a failure.
Next, it turns them into bytes/codepoints for comparison. If they're the same, success!  If not, we try to produce the most useful failure message.

If we did a straight-up bytes comparison, we would just get a diff of numbers which is pretty undreadable.  So, what I try to do, is encode all the codepoints I can, then compare the characters in the strings until there is a difference, then output that.

Rescuing the ArgumentError in safe_codepoints is if the string has an invalid byte sequence, it raises that on string.codepoints, so I fall back to just bytes.






---------



     # see https://github.com/rubyspec/rubyspec/blob/91ce9f6549/core/encoding/find_spec.rb#L57
      describe 'Ensure tests are running with utf-8 encoding' do

        it 'default_internal' do
          if Encoding.default_external == Encoding.find('locale')
            expected_encoding = ''
          else
            expected_encoding = utf8_encoding
          end
          expect(Encoding.default_internal.to_s).to eq(expected_encoding)
        end

        it 'default_external' do
          expect(Encoding.default_external.to_s).to eq(utf8_encoding)
        end

        it 'locale' do
          skip "Not sure how to determine locale (#{Encoding.find('locale')})"\
            "from LC_ALL or on windows"
        end

        it 'filesystem' do
          encoding = Encoding.find('filesystem').to_s
          if OS.windows?
            skip "Not sure how to tell filesystem encoding is #{encoding}"
            expect(encoding).to eq(utf8_encoding)
          end
        end

        it 'current script (file)' do
          expect(__ENCODING__.to_s).to eq(utf8_encoding)
        end
      end


----

        # see https://github.com/ruby/ruby/blob/34fbf57aaa/transcode.c#L4289
        # ISO-8859-1 -> UTF-8 -> EUC-JP
        # "\xa0" NO-BREAK SPACE, which is available in UTF-8 but not in EUC-JP
