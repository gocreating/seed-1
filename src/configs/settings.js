module.exports = {
  // connection string of mongodb: 'mongodb://root@localhost/seed'
  // connection string of sqlite: 'sqlite://db.sqlite'
  db: 'sqlite://db.sqlite',
  user: {
    bearerToken: {
      expiration: '7 days',
      secret: 'saltForJwtToken',
    },
  },
};