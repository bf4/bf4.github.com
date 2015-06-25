require "pathname"
namespace :assets do
  desc "Vendor app assets"
  task :vendor do
    root = Pathname File.expand_path("../..", __FILE__)
    jquery_version = "1.11.1"
    ember_version = "release" # canary
    spreadsheet_key = "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6"

    pair_data_url = "http://spreadsheets.google.com/feeds/list/#{spreadsheet_key}/public/values?alt=json"
    download(pair_data_url, root.join("assets/pair.json"))

    jquery_url = "http://ajax.googleapis.com/ajax/libs/jquery/#{jquery_version}/jquery.min.js"
    download(jquery_url, root.join("js/jquery.min.js"))

    [
      "ember-template-compiler.js",
      "ember.prod.js",
      "ember.debug.js",
    ].each do |file|
      url = "http://builds.emberjs.com/#{ember_version}/#{file}"
      download(url, root.join("js/#{file}"))
    end
  end

  def download(url, output)
    cmd = <<-CURL
curl '#{url}' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36' \
  --compressed \
  -o #{output.to_s}
    CURL
    puts "Running #{cmd}"
    `#{cmd}`
  end

end
