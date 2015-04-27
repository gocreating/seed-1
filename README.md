# Seed

A flexible and scalable suite for building modern websites, using nodejs with express.

## Requirements

You must install `NodeJS` as the whole programming engine. We use npm and bower as package manager, and gulp as building automation tool. The npm is already equipped with NodeJS, so just install `bower` and `gulp` as follows.

```
$ npm install -g bower
$ npm install -g gulp
```

Then you can start using the CLI operations

## Getting started

1. Install nodejs packages

   ```
   $ npm install
   ```

2. Install front-end packages

   ```
   $ bower install
   ```

3. Synchronize database

   ```
   $ gulp syncdb
   ```

4. Run as debug/production mode

   ```
   $ gulp dev/prod
   ```

## Documentation

The documentation is served on gitbook site: [seed](https://www.gitbook.com/book/gocreating/seed)