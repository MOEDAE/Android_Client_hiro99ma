#!/bin/sh

for fname in `find ./ -name '*.template'`; do
	echo $fname
	sed -i -e 's/\t/    /g' $fname
	sed -i -e 's/ *$//' $fname
done
