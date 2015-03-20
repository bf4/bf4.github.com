---
layout: post
title: "TIL: RubyGem executables now go in exe"
description: "The RubyGem executable dir convention is now exe, not bin"
categories: [ 'ruby' ]
tags: [ 'ruby' , 'rubygems' , 'til' ]
published: true
---
{% include JB/setup %}

**Update 2015-03-20**: [Now cross-posted at http://bundler.io/blog/2015/03/20/moving-bins-to-exe.html](http://bundler.io/blog/2015/03/20/moving-bins-to-exe.html).

[Bundler diff: move gem bins to exe](https://github.com/bundler/bundler/commit/ab3e21784c6c18702869c771fbe7ae23c82cc7c0)

```diff
-  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
+  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
```

I really like this new convention. Since we've started generating
binstubs in `bin`, I've had bizarre errors resulting from forgetting that
my gemspec was specifying that my gem should install **all** the files in `bin`
as executables.  Changing the `executables` directory to `exe` means that
I needn't worry my gem might be including binstubs as exectubles.

I had noticed that RSpec is already doing this when I wrote some code
to check if RSpec was running before starting Simplecov.

```ruby
if defined?(@running_tests)
  @running_tests = false
else
  @running_tests = caller.any? {|line| line =~ /exe\/RSpec/ }
end
```

But it turns out [RSpec has been doing that since 2011](https://github.com/RSpec/RSpec-core/blob/v2.7.0/RSpec-core.gemspec#L19).

I hope you found this helpful. :)
