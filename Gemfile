source "https://rubygems.org"

# http://jekyllrb.com/docs/github-pages/
require 'json'
require 'open-uri'
versions =
  begin
    JSON.parse(open('https://pages.github.com/versions.json').read)
  rescue SocketError
    { 'github-pages' => 37 }
  end

gem 'github-pages', versions['github-pages']
# gem "jekyll"
# gem "rdiscount"
