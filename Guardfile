# More info about guard files at https://github.com/guard/guard#readme
# Always run guard with bundle exec
require "guard"
require "listen"
require 'jasmine'

ignore %r{^(coverage|public|vendor|bundle|\.git|_|css|images|backup|wp-content)},
  /\.(pid|coffee|markdown|ico|html|md|sh|png|xml)$/,
  /^\.gitkeep$/


# For debugging, take a look at https://github.com/guard/guard/issues/360#issuecomment-44087831
# TL;DR try
# interactor :off
# notification :off
# LISTEN_GEM_DEBUGGING=2 bundle exec guard -d

guard :jasmine do
  watch(%r{spec/javascripts/.+[sS]pec\.(js\.coffee|js|coffee)$})
  watch(%r{spec/javascripts/fixtures/.+$})
  watch(%r{js/(.+?)\.(js\.coffee|js|coffee)(?:\.\w+)*$}) { |m| "spec/javascripts/#{ m[1] }_spec.#{ m[2] }" }
end
