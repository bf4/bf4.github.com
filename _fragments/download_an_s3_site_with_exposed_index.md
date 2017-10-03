---
layout: post
title: "Download a S3-served website whose index listing is exposed"
published: true
---
{% include JB/setup %}

Suppose there's a website you'd like to mirror locally that you can tell is served via an
AWS S3 website. Here's a way to download it if the S3 index is exposed.

If the site is [http://flaws.cloud/](http://flaws.cloud/), and it is served by an S3
bucket named `flaws.cloud`, then you can visit the S3 bucket at
[http://flaws.cloud.s3.amazonaws.com/](http://flaws.cloud.s3.amazonaws.com/).

1) Create a new directory, let's call it `flaws-cloud`, and `cd` into it.

2) Create a script `run.sh`:

```bash
cat << 'EOF' > run.sh
#!/usr/bin/env bash

BUCKET_NAME="flaws.cloud" exec ./download-s3-site.sh
EOF

chmod u+x run.sh

```

and make it executable `chmod u+x run.sh`.

3) In the same directory, paste the script below as '`download-s3-site.sh`' and make it executable.

4) You can then download the site by running `./run.sh`.

I separated the configuration (run.sh) from the actual script (download-s3-site.sh) just to make it more
easily reusable for me.

```bash
cat << 'EOF' > download-s3-site.sh
#!/usr/bin/env bash

set -eou pipefail

if [ -z "${BUCKET_NAME:-}" ]; then echo "[FATAL] BUCKET_NAME not set" >&2 ; exit 1; fi
OVERWRITE="${OVERWRITE:-false}"
DEBUG="${DEBUG:-false}"

info()    { echo "[INFO] $*" >&2 ; }
debug()   { if [ "$DEBUG" = "true" ]; then echo "[DEBUG] $*" >&2 ; fi ; }

download() {
  local remote_filename local_filename
  remote_filename="$1"
  local_filename="$2"

  if [ "$OVERWRITE" = "true" ] || [ ! -e "${local_filename}" ] ; then
    curl \
      --insecure \
      --silent --show-error \
      --location \
      --create-dirs \
      "https://${BUCKET_NAME}.s3.amazonaws.com${remote_filename}" \
      --output "${local_filename}"
  else
    debug "Already downloaded ${local_filename}"
  fi
}

download_file() {
  local remote_filename
  remote_filename="$1"
  download "/${remote_filename}" "${remote_filename}"
}

download_index() {
  download "" index.xml
}

download_files() {
  ruby -rrexml/document -e 'REXML::Document.new(STDIN.read).root.each_element("//Key") {|elem| puts elem.text }' \
    < index.xml \
    | while read -r remote_filename; do
        download_file "$remote_filename"
      done
}

main() {
  download_index
  download_files
}

main
EOF

chmod u+x download-s3-site.sh
./run.sh

```
