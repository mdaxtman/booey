#!/bin/bash

git reset --hard HEAD
git checkout master
rm -rf node_modes
npm i
./install

exit 0
