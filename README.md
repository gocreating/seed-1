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
$ gulp init
$ gulp dev
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

   According to our testing result, if you are using `mongodb`, this step is optional. If you are using `sqlite`, then this step is required, or you will get the **DatabaseError** when running the app.

   ```
   $ gulp init
   ```

4. Run as debug/production mode

  - if you want to start developing your website, then use debug mode with livereload function.

    ```
    $ gulp dev
    ```

  - if you want to put your website into production, then use production mode.

    ```
    $ gulp prod
    ```

  - Moreover, you can turn on `-u` switch to uglify backend script files.

    ```
    $ gulp prod -u
    ```

5. Open `http://localhost:5000`

## Documentation

The documentation is served on gitbook site: [seed](https://www.gitbook.com/book/gocreating/seed)