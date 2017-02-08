[![Build Status](https://travis-ci.org/branchard/SPA-Forum.svg?branch=master)](https://travis-ci.org/branchard/SPA-Forum)
[![Dependency Status](https://www.versioneye.com/user/projects/589a8c16475a4f003e6362eb/badge.svg?style=flat)](https://www.versioneye.com/user/projects/589a8c16475a4f003e6362eb)
[![Code Climate](https://codeclimate.com/github/branchard/SPA-Forum/badges/gpa.svg)](https://codeclimate.com/github/branchard/SPA-Forum)

# SPA-Forum
A Single Page Application Forum

syteme dependencies :
- php: > 5.5 && <= 7.0.14 (dont work with php 7.1.1)
- mysql
- composer
- pdo_mysql

1. composer install
2. Load sql schema
3. Load fictures
4. ./node_modules/.bin/webpack --config webpack.config.js --watch &
5. composer run
