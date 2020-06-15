#!/usr/bin/env sh

echo 'Deploy started'

yarn build
git add dist --force
git commit -m 'deploy'
git subtree push --prefix dist origin gh-pages --force

echo 'Deployed: \033[1;32;4mhttps://nextgtrgod.github.io/vue-forecast/\033[0m'
echo ''