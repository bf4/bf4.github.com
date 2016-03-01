source "https://rubygems.org"

# http://jekyllrb.com/docs/github-pages/
require 'json'
require 'open-uri'
versions =
  begin
    versions = JSON.parse(open('https://pages.github.com/versions.json').read)
    unless $skip_print_versions == true
      require 'pp'
      STDERR.puts 'Gem versions are:'
      pp versions
      $skip_print_versions = true
    end
    versions
  rescue SocketError
    { 'github-pages' => 52 }
  end

gem 'github-pages', versions['github-pages']
