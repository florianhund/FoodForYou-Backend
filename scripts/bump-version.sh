#!/bin/bash

if [ -z "$1" ]
then
  echo "Fatal! No version provided."
  exit 1
else
  version=$1
fi

sed -i "s/version.*/version: '$version',/" ../src/config/docs/basicInfo.ts

npm version $version --git-tag-version false

git add .
git commit -m "build(release): bump version to v$version"
