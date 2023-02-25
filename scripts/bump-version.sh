#!/bin/bash

commit() {
  git add .
  git commit -m "build(release): bump version to v$version"
}

while getopts 'cv:-:' flag; do
  case "${flag}" in
    v) version=$OPTARG ;;
    c) is_commit=true ;;
    -) if [ "$OPTARG" = "commit-git" ]
       then
        is_commit=true
       fi ;;
  esac
done

if [ -z "$version" ]
then
  echo "Fatal! No version provided."
  exit 1
fi

sed -i "s/version.*/version: '$version',/" ../src/config/docs/basicInfo.ts

npm version $version --git-tag-version false

[ "$is_commit" = true ] && commit