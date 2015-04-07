---
layout: post
title: "Gem templates with Thor"
description: ""
categories: [ 'ruby' ]
tags: [ 'ruby' , 'rubygems' , 'bundler', 'thor' ]
published: true
---
{% include JB/setup %}

tl;dr see [https://github.com/bf4/gemnerator](https://github.com/bf4/gemnerator)

# App Templates

Both Rails and Bundler use Thor for generating app/gems from a template.

## Rails

`bundle exec rake rails:template LOCATION=$HOME/rails_templates/mine.rb`

ref: [http://technology.stitchfix.com/blog/2014/01/06/rails-app-templates](http://technology.stitchfix.com/blog/2014/01/06/rails-app-templates)/

## Bundler

`bundle gem NAME`

uses `Thor` to apply the [`new_gem` template](https://github.com/bundler/bundler/tree/master/lib/bundler/templates) just like rails templates do, which suspenders uses.  I've been meaning to generalize that code... right now I have something like the following... behaves similarly to a rails template.

## Configuring

Only the Rails template is configurable (via the `LOCATION` variable).

So, if you want to customize building gems, you either have to
copy and paste or roll your own gem template generator.


## Simple templated gem generator

Core code:

```ruby
# Usage:
# ruby __FILE__ NAME
# https://github.com/erikhuda/thor/wiki/Generators
# http://blog.tamouse.org/swaac/2014/03/08/playing-around-with-thor-generators/
# Inheriting from Thor::Group causes the defined methods to be executed in order
# rather than subcommands, when inheriting from 'Thor'
# e.g. https://github.com/bundler/bundler/blob/91633430cb/lib/bundler/cli.rb#L339-L352
#      https://github.com/bundler/bundler/blob/91633430cb/lib/bundler/cli/gem.rb#L18-L103
#      https://github.com/bundler/bundler/blog/91633430cb/lib/bundler/templates/newgem/Gemfile.tt
# class Bundler::CLI < Thor
#   class Gem
#     def initialize(options, gem_name, thor)
#      def run
#        opts = { :name => name, etc.
#        templates = { "Gemfile.tt" => "Gemfile", etc
#        templates.each do |src, dst|
#          thor.template("newgem/#{src}", target.join(dst), opts)
#        end
#   def gem(name)
#      Gem.new(options, name, self).run
#   end
#   def self.source_root
#     File.expand_path(File.join(File.dirname(__FILE__), 'templates'))
#   end
require 'thor'
require 'thor/group'
class Gemnerator < Thor::Group
  include Thor::Actions
add_runtime_options!
  class_option :verbose, default: false

  # expect one argument upon invocation,
  argument :name
  attr_reader :template_file

  def initialize(args = [], options = {}, config = {})
    @template_file = config.fetch(:template_file)
    super
    # Will apply template in File.join(destination_root, name)
    self.destination_root = config[:projects_root]
  end

  desc <<-FOO
Description:
  This generator makes or updates gems from a template
FOO

 def self.source_root
    File.expand_path("../templates/new_gem",__FILE__)
  end

  def app_name
    @app_name ||= snake_name
  end

  def apply_template
    apply(template_file, verbose: options[:verbose])
  end

  # munging on potential input from the user
  # 'Able & Louis: Go @@CRAXY@@' becomes
  # ["Able", "Louis", "Go", "CRAXY"]
  def name_components
    @_name_components ||= name.scan(/[[:alnum:]]+/)
  end

  # ["Able", "Louis", "Go", "CRAXY"] become
  # able_louis_go_craxy
  def snake_name
    @_snake_name ||= name_components.map(&:downcase).join("_")
  end
end
projects_root = ENV.fetch('PROJECT_DIR')
template = ENV.fetch("LOCATION")
fail "No template LOCATION value given. Please set LOCATION either as path to a file or a URL" if template.nil?
fail "Template #{template} does not exist" unless File.readable?(template)
template = File.expand_path(template) if template !~ %r{\A[A-Za-z][A-Za-z0-9+\-\.]*://}
args = ARGV
config = {
  projects_root: projects_root,
  template_file: template
}
Gemnerator.start(args, config)
```
refs:
- [https://github.com/erikhuda/thor/wiki/Generators](https://github.com/erikhuda/thor/wiki/Generators)
- [http://blog.tamouse.org/swaac/2014/03/08/playing-around-with-thor-generators](http://blog.tamouse.org/swaac/2014/03/08/playing-around-with-thor-generators)/
- [https://github.com/bundler/bundler/blob/91633430cb/lib/bundler/cli.rb#L339-L352](https://github.com/bundler/bundler/blob/91633430cb/lib/bundler/cli.rb#L339-L352)
- [https://github.com/bundler/bundler/blob/91633430cb/lib/bundler/cli/gem.rb#L18-L103](https://github.com/bundler/bundler/blob/91633430cb/lib/bundler/cli/gem.rb#L18-L103)
- [https://github.com/bundler/bundler/blog/91633430cb/lib/bundler/templates/newgem/Gemfile.tt](https://github.com/bundler/bundler/blog/91633430cb/lib/bundler/templates/newgem/Gemfile.tt)

### The Gemnerator Gem!!

See [https://github.com/bf4/gemnerator](https://github.com/bf4/gemnerator)

Example usage:

`LOCATION=./gem.rb PROJECT_DIR=~/projects ruby gemnerator.rb gem-fu`

(Also see [the ore gem](https://github.com/ruby-ore/ore).
The ore gem could be the starting point to customize your gem creation.)
