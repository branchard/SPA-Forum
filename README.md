[![Build Status](https://travis-ci.org/branchard/SPA-Forum.svg?branch=master)](https://travis-ci.org/branchard/SPA-Forum)
[![Dependency Status](https://www.versioneye.com/user/projects/589a8c16475a4f003e6362eb/badge.svg?style=flat)](https://www.versioneye.com/user/projects/589a8c16475a4f003e6362eb)
[![Code Climate](https://codeclimate.com/github/branchard/SPA-Forum/badges/gpa.svg)](https://codeclimate.com/github/branchard/SPA-Forum)

# SPA-Forum
A Single Page Application Forum

System dependencies (not exhaustive)
------------------------------------
- php: > 5.5 && <= 7.0.14 (dont work with php 7.1.1)
- mysql
- composer
- pdo_mysql php driver
- pdo_sqlite php driver (for tests)

How to run the projects
-----------------------
1. Clone the project
2. Go into the projet directory : `$ cd SPA-Forum/`
3. Install PHP dependencies: `$ composer install`
4. Install Node dependencies: `$ npm install`
5. Load SQL schema: `(mysql) source ./resources/sql/schema.sql`
6. Load default fixtures: `(mysql) source ./resources/sql/fixtures_default.sql`
7. Load extra fixtures: `(mysql) source ./resources/sql/fixtures_extra.sql`
8. Pack the js with webpack : `$ ./node_modules/.bin/webpack --config webpack.config.js`
9. Run the projet: `$ composer run`
10. Open [127.0.0.1:8000](http://127.0.0.1:8000/) in your favorite browser.

TODO
----
- env file (with database informations)
- prod env
- unit tests
- js strore refactoring
- better auth system
- user registration system
