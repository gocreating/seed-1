# Seed

[![Build Status](https://travis-ci.org/gocreating/seed.svg?branch=master)](https://travis-ci.org/gocreating/seed)

A flexible and scalable suite for building modern websites, using nodejs with express.

## Requirements

- NodeJS
- gulp
- bower

You must install `NodeJS` as the whole programming engine. We use npm and bower as package manager, and gulp as building automation tool. The npm is already equipped with NodeJS, so just install `bower` and `gulp` as follows.

```
$ npm install -g bower
$ npm install -g gulp
```

Then you can start using the CLI operations

## Getting started

```
$ npm install
$ bower install
$ gulp init -d  # development mode
$ gulp build -d # development mode
```

1. Install nodejs packages

   ```
   $ npm install
   ```

2. Install front-end packages

   ```
   $ bower install
   ```

3. Initialize database

   Create tables from schemas, and insert built-in records like root user, default permissions, etc.

   `-d`, `-t`, and `-p` switches will initialize the `development`, `test`, `production` databases, respectively.

   ```
   $ gulp init [-d | -t | -p]
   ```

4. Run as debug/production mode

  - if you want to start developing your website, then use debug mode with livereload function.

    ```
    $ gulp build -d
    ```

  - if you want to put your website into production, then use production mode.

    ```
    $ gulp build -p
    ```

  - Moreover, you can turn on `-u` switch to uglify backend script files.

    ```
    $ gulp build -p -u
    ```

5. Open on browsers

  - Development mode is host on port 5000

    `http://localhost:5000`

  - Production mode is host on port 3000

    `http://localhost:3000`

## Documentation

The documentation is served on gitbook site: [seed](https://www.gitbook.com/book/gocreating/seed)