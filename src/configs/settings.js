module.exports = {
  server: {
    port: {
      development: 5000,
      test: 4567,
      production: 3000,
    },
  },
  // connection string of mongodb: 'mongodb://root@localhost/seed'
  // connection string of sqlite: 'sqlite://db.sqlite'
  db: {
    development: 'sqlite://db.development.sqlite',
    test: 'sqlite://db.test.sqlite',
    production: 'sqlite://db.production.sqlite',
  },
  user: {
    bearerToken: {
      expiration: '7 days',
      secret: 'saltForJwtToken',
    },
  },
};