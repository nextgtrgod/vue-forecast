#!/usr/bin/env sh

echo 'Deploy started'

yarn build
git add dist --force
git commit -m 'deploy'
git subtree push --prefix dist origin gh-pages