require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB
  },
  test: {
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
