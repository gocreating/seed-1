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
$ gulp syncdb
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

3. Synchronize database

   According to our testing result, if you are using `mongodb`, this step is optional. If you are using `sqlite`, then this step is necessary, or you will get the **DatabaseError** when running the app.

   ```
   $ gulp syncdb
   ```

4. Run as debug/production mode

   ```
   $ gulp dev/prod
   ```

## Documentation

The documentation is served on gitbook site: [seed](https://www.gitbook.com/book/gocreating/seed)