---
layout: post
title: "Set up Headless Chrome with Capybara"
description: ""
permalink: "set-up-headless-chrome-with-capybara"
categories: [ ]
tags: [rails]
date: 2017-10-08
published: true
---
{% include JB/setup %}

To use the Chrome browser for headless testing with Capybara, we need to 1) have the google-chrome
browser installed, 2) have the chrome-driver installed, and 3) have
[Capybara](https://github.com/teamcapybara/capybara) configured to use the headless Chrome browser with the
[Selenium web driver](http://www.seleniumhq.org/docs/03_webdriver.jsp#ruby).

**Note**: a default registration for [:selenium_chrome_headless was added to Capybara 2.15.0](https://github.com/teamcapybara/capybara/blob/2.15.0/History.md#added).

## Install google-chrome

Firstly, there are some version constraints.

We'll want to ensure that the version is `>= 54.0.2840.0` else we'll get an error.

Let's print out the current chrome version.

```bash
google-chrome --version
```

On a debian-based linux box (which many CI environments use), we can install the latest google-chrome as follows:

```bash
curl -L -o google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome.deb
sudo sed -i 's|HERE/chrome\"|HERE/chrome\" --disable-setuid-sandbox|g' /opt/google/chrome/google-chrome
```

## Install chrome-driver

A cross-platform way to install the chrome-driver is to use the `chromedriver-helper` gem.
I wrote this using version 1.1.0.

```bash
gem install chromedriver-helper
chromedriver-update
```

### Updatable installation script


```bash
UPDATE_CHROME_DRIVER="false"
GOOGLE_CHROME_SHIM="/opt/google/chrome/google-chrome"

#  NOTE: without this, we will get a "Chrome version must be >= 54.0.2840.0"-error
google-chrome --version
# install driver if not installed || update drive if we want to update it
if [ ! -d "$HOME/.chromedriver-helper" ] || [ "$UPDATE_CHROME_DRIVER" = "true" ]; then
  # Clear chromedriver cache
  rm -rf $HOME/.chromedriver-helper
  # Update chromedriver
  bundle exec chromedriver-update # assumes chromedriver-helper is in Gemfile
  mkdir -p ~/.chromedriver-helper
  # Update chrome deb
  curl -L -o google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
  mv google-chrome.deb ~/.chromedriver-helper/
fi
# Update google-chrome
sudo dpkg -i ~/.chromedriver-helper/google-chrome.deb
sudo sed -i 's|HERE/chrome\"|HERE/chrome\" --disable-setuid-sandbox|g' "${GOOGLE_CHROME_SHIM}"
# per
#  https://github.com/heroku/heroku-buildpack-chromedriver
#  https://github.com/heroku/heroku-buildpack-google-chrome
#  chromedriver expects Chrome to be installed at /usr/bin/google-chrome,
#  You'll need to tell Selenium/chromedriver that the chrome binary is at /opt/google/chrome/google-chrome
google-chrome --version
```

## Configure Capybara

Update the Gemfile

```diff
-  gem 'capybara-webkit'
+  gem 'capybara-selenium'
+  gem 'chromedriver-helper'
```

Configure Capybara

```ruby
require 'capybara/rspec' # or whatever your test framework is
require 'capybara/rails'
```

And set the the javascript_driver to :headless_chrome

```ruby
Capybara.javascript_driver = :headless_chrome
```

Then we'll want register the selenium webdriver wth the chrome browser

```ruby
require "selenium/webdriver"
driver_name = :selenium
browser_name = :chrome
options = {}

Capybara.register_driver driver_name do |app|
  driver_options = {browser: browser_name}.merge(options)
  Capybara::Selenium::Driver.new(app, driver_options)
end
```

And register the chrome browse as a webdriver.

```ruby
driver_name = :chrome
browser_name = :chrome
options = {}
screen_size = [1920, 1080]

Capybara.register_driver driver_name do |app|
  driver_options = {browser: browser_name}.merge(options)
  Capybara::Selenium::Driver.new(app, driver_options).tap do |driver|
    driver.browser.manage.window.size = Selenium::WebDriver::Dimension.new(*screen_size)
  end
end
```

And finally, register the headless web driver:

```ruby
driver_name = :headless_chrome
browser_name = :chrome
driver_capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
    # see
    # https://robots.thoughtbot.com/headless-feature-specs-with-chrome
    # https://developers.google.com/web/updates/2017/04/headless-chrome
    chromeOptions: {
      args: %w(headless disable-gpu no-sandbox),
      # https://github.com/heroku/heroku-buildpack-google-chrome#selenium
      binary:  ENV.fetch('GOOGLE_CHROME_SHIM', nil)
    }.reject { |_, v| v.nil? }
  )

Capybara.register_driver driver_name do |app|
  Capybara::Selenium::Driver.new(
    app,
    browser: browser_name,
    desired_capabilities: driver_capabilities
  )
end
```

You can debug the chrome version by adding the line:

```ruby
Selenium::WebDriver.for(:chrome).capabilities[:version]
```

## Converting from Capybara-webkit

We had an webkit allowed urls config like:

```ruby
Capybara::Webkit.configure do |config|
  config.block_unknown_urls
  config.allow_url('*.lvh.me')

  config.allow_url('s3.amazonaws.com/assets.whatever.com/*')
end
```

which we replaced with Webmock rules

```ruby
require 'webmock/rspec'
module WebmockConfig
  def self.default_disabled_urls
    [
      '*.lvh.me',
      's3.amazonaws.com/assets.whatever.com/*'
    ]
  end
end
# https://robots.thoughtbot.com/speed-up-javascript-capybara-specs-by-blacklisting-urls
WebMock.disable_net_connect!(allow: WebmockConfig.default_disabled_urls)
```

and we had a screenshot config which we replaced with the screen_size capability above

```
require 'capybara-screenshot/rspec'
Capybara::Screenshot.webkit_options = {width: 1920, height: 1080}
```

## Errors we encountered

### Google-Chrome version too low

> Selenium::WebDriver::Error::SessionNotCreatedError:
> session not created exception: Chrome version must be >= 58.0.3029.0
> (Driver info: chromedriver=2.30.477691 (6ee44a7247c639c0703f291d320bdf05c1531b57),platform=Linux 3.13.0-123-generic x86_64)

This was addressed the the code to update the google-chrome browser and chromedriver.

### Google-Chrome binary not found

>   unknown error: unrecognized Chrome version:
>   HeadlessChrome/59.0.3071.115
>   (Driver info: chromedriver=2.28.455506
>   (18f6627e265f442aeec9b6661a49fe819aeeea1f),platform=Linux 3.13.0-123-generic x86_64)

This was addressed by specifying the binary location via GOOGLE_CHROME_SHIM and the
`chromeOption: { binary ENV.fetch('GOOGLE_CHROME_SHIM', nil) }`

per
- [https://github.com/heroku/heroku-buildpack-chromedriver](https://github.com/heroku/heroku-buildpack-chromedriver)
- [https://github.com/heroku/heroku-buildpack-google-chrome#selenium](https://github.com/heroku/heroku-buildpack-google-chrome#selenium)

> chromedriver expects Chrome to be installed at `/usr/bin/google-chrome`,

> You'll need to tell Selenium/chromedriver that the chrome binary is at `/opt/google/chrome/google-chrome`

### Session clearing code changed

```diff
# https://github.com/teamcapybara/capybara/blob/2.12.1/lib/capybara/session.rb#L92-L119
def clear_test_session!
     page.reset!
-    page.driver.clear_cookies if RSpec.current_example.metadata[:js] == true
+    Capybara.reset_sessions! if RSpec.current_example.metadata[:js] == true
end

+  config.after type: :feature, js: true do
+    Capybara.reset_sessions!
+  end
```


### Some non-clickable elements are found by capybara-headless chrome

This was a test to click an element in a [rails_admin](https://github.com/sferik/rails_admin/) page:

```
Selenium::WebDriver::Error::UnknownError:
  unknown error:
  Element <a class="btn btn-info add_nested_fields" data-association="accounts" data-blueprint-id="accounts_fields_blueprint" href="javascript:void(0)">...</a>
  is not clickable at point (424, 17).
  Other element would receive the click: <a href="/admin/role/171">...</a>
    (Session info: headless chrome=59.0.3071.115)
    (Driver info: chromedriver=2.30.477690 (c53f4ad87510ee97b5c3425a14c0e79780cdf262),platform=Mac OS X 10.11.6 x86_64)

./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/response.rb:69:in `assert_ok'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/response.rb:32:in `initialize'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/http/common.rb:83:in `new'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/http/common.rb:83:in `create_response'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/http/default.rb:107:in `request'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/http/common.rb:61:in `call'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/bridge.rb:170:in `execute'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/oss/bridge.rb:579:in `execute'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/remote/oss/bridge.rb:328:in `click_element'
./.bundle/bundle/ruby/2.4.0/gems/selenium-webdriver-3.4.3/lib/selenium/webdriver/common/element.rb:74:in `click'
```


Things that didn't work:

- checking `element.visible?`, is  `true`
- adding `visible: true` to finder made no difference
- Get location and driving to it had no effect

        native_element = element.native
        native_location = native_element.location #=>    <struct Selenium::WebDriver::Point x=348.375, y=651>
             page.driver.browser.action
               .move_to(native_element, native_location.x, native_location.y)
               .click
        native_location = native_element.location_once_scrolled_into_view #=> #<struct Selenium::WebDriver::Point x=348, y=0>
             page.driver.browser.action
               .move_to(native_element, native_location.x, native_location.y)
               .click

- Elsewhere we could click_add_nested_field, so I tried that

        specific:
           find("#user_accounts_attributes_field", match: :first).find("a.add_nested_fields[data-association='accounts']").click

        general:
          model_name = page.current_url[/(?:admin\/)[^\/]+?/].singularize
          association_name = element.text.split(/\s+/).last.downcase.underscore.pluralize
          click_add_nested_field(model_name, association_name)

- Trying to click the link `element.click_link(element.text)` or `page.click_link(element.text)`

- Since the error pointed to `'#secondary-navigation'`

        I tried:
             evaluate_script("document.querySelector('#secondary-navigation').remove()")

        and the next error pointed to `div.container-fluid`, so I
             evaluate_script("document.querySelector('div.container-fluid').remove()")

        and the next error pointed to `nav.navbar`, so I
             evaluate_script("document.querySelector('nav.navbar').remove()")

        And then there were no more errors.

        For some reason, the nav.navbar is stealing the click events from a non-overlapping element.

        This might be in our code or rails_admin. I looked briefly, but didn't find the source of the bug if, there.

I ended up hacking around this and *just removed the offending elements*:

```ruby
evaluate_script("document.querySelector('nav.navbar').remove()")
```

### Starting an [xvfb](https://en.wikipedia.org/wiki/Xvfb) session around each run:

You can use the [headless](https://github.com/leonid-shevtsov/headless) gem:

```ruby
gem 'headless'
```

And then around each test, start an xvfb session:

```
config.before(:each, js: true) do
  @headless = Headless.new
  @headless.start
end

config.after(:each, js: true) do
  @headless.destroy if defined?(@headless)
end
```

(If xvfb is already running, you'll want to add a condition to disable starting/destroying Headless.

### Alternative browser/driver install

```bash
apt-get install -y xvfb

wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
bash -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
apt-get update
apt-get install -y google-chrome-stable
```

## All the links

- [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
  - [Headless Capybara Feature Specs with Chrome](https://robots.thoughtbot.com/headless-feature-specs-with-chrome)
  - [https://github.com/heroku/heroku-buildpack-chromedriver](https://github.com/heroku/heroku-buildpack-chromedriver/tree/a27f16d4f154de896925a919054d364839b8b50a)
  - [https://github.com/heroku/heroku-buildpack-google-chrome#selenium](https://github.com/heroku/heroku-buildpack-google-chrome/tree/d93581e904e63fe232d8fd997bdfbe6b39fd5a39#selenium)
- [Capybara](https://github.com/teamcapybara/capybara)
  - A default registration for [:selenium_chrome_headless was added to Capybara 2.15.0](https://github.com/teamcapybara/capybara/blob/2.15.0/History.md#added).
  - [Capybara::Session](https://github.com/teamcapybara/capybara/blob/2.12.1/lib/capybara/session.rb#L92-L119)
  - [Speed Up JavaScript Capybara Specs by Blacklisting URLs](https://robots.thoughtbot.com/speed-up-javascript-capybara-specs-by-blacklisting-urls)
- [Selenium web driver](http://www.seleniumhq.org/docs/03_webdriver.jsp#ruby).
- [xvfb](https://en.wikipedia.org/wiki/Xvfb)
  - [Selenium and xvfb](http://elementalselenium.com/tips/38-headless).
  - [headless](https://github.com/leonid-shevtsov/headless) gem.
- [rails_admin](https://github.com/sferik/rails_admin/) page:
