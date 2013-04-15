#!/usr/bin/env bash
find . \( -iname '*.md' -o -iname '*.markdown' \) | xargs perl -pi -w -e 's/\s(http[^\s]+)\b/ [$1]($1)/g;'
