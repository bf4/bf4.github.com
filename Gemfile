source "https://rubygems.org"
ruby RUBY_VERSION

# http://jekyllrb.com/docs/github-pages/
# To upgrade, run `bundle update github-pages`.
require 'json'
require 'open-uri'

versions = { 'github-pages' => 227 }
unless ENV['BUNDLE_DEFAULT'] == 'true'
  begin
    versions = JSON.parse(URI('https://pages.github.com/versions.json').read)
  rescue SocketError
  else
    unless $skip_print_versions == true
      require 'pp'
      STDERR.puts 'Gem versions are:'
      pp versions
      $skip_print_versions = true
    end
  end
end

group :jekyll_plugins do
  gem 'github-pages', versions['github-pages'], group: :jekyll_plugins
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
