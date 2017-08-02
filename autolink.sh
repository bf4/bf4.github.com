#!/usr/bin/env bash

find_files() {
  find . \( -iname '*.md' -o -iname '*.markdown' \)
}

files="$@"
if [ -z "$files" ]; then files="$(find_files)"; fi
echo -e "$files" | xargs perl -pi -w -e 's/\s(http[^\s]+)\b/ [$1]($1)/g;'
