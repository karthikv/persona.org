#!/bin/bash

# syntax:
# compile-json.sh locale-dir/ json-dir/ 

lockfile="/tmp/browserid2012-compile-json.lock"

function usage() {
    echo "syntax:"
    echo "compile.sh locale-dir/ json-dir"
    exit 1
}

# check if the lockfile exists
if [ -e $lockfile ]; then
    echo "$lockfile present, exiting"
    exit 99
fi

# check if file and dir are there
if [[ ($# -ne 2) || (! -d "$1") || (! -d "$2") ]]; then usage; fi

touch $lockfile
for pofile in `find $1 -type f -name "*.po"`; do
    dir=`dirname $pofile`
    subdir=`dirname $dir`
    lang=`basename $subdir`
    stem=`basename $pofile .po`
    jsonfile="$2/${lang}/${stem}.json"
    mkdir -p $2/${lang}
    echo -n ";var json_locale_data = " > $jsonfile
    po2json.js -p  $pofile >> $jsonfile
    echo ";" >> $jsonfile
done
rm $lockfile
