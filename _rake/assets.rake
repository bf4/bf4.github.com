require "pathname"
namespace :assets do
  task :update => [:build, :vendor]
  desc "Vendor app assets"
  task :vendor do
    root = Pathname File.expand_path("../..", __FILE__)
    jquery_version = "1.11.1"
    ember_jquery = root.join("_ember/bower_components/jquery/dist/jquery.min.js")
    spreadsheet_key = "0AqHUOZcVEj_XdE5SMzBKSWhINjVtTlh2b0JjUFp4OEE/od6"

    pair_data_url = "http://spreadsheets.google.com/feeds/list/#{spreadsheet_key}/public/values?alt=json"
    download(pair_data_url, root.join("assets/pair.json"))

    jquery_destination = root.join("assets/js/jquery.min.js")
    if ember_jquery.readable?
      cp ember_jquery.to_s, jquery_destination
    else
      jquery_url = "http://ajax.googleapis.com/ajax/libs/jquery/#{jquery_version}/jquery.min.js"
      download(jquery_url, jquery_destination)
    end
  end

  task :build do
    root = Pathname File.expand_path("../..", __FILE__)
    ember_dir = root.join("_ember")
    Dir.chdir(ember_dir) do
      build_cmd = "ember build -prod"
      puts "Building ember javascripts"
      if system(build_cmd)
        puts "Copying ember javascripts"
        cp_cmd = "cp dist/assets/*.js ../assets/"
        system(cp_cmd) or abort "copy command failed with #{$?.inspect}"
      else
        abort "build command failed with #{$?.inspect}"
      end
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
