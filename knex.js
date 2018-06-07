const knexConfig = {
    development: {
      client: 'pg',
      connection: 'postgres://dxvloyeb:gbT-rQO8eeCyQUYU_GYdWyw9CaYuQMqZ@pellefant.db.elephantsql.com:5432/dxvloyeb',
      debug: true, // http://knexjs.org/#Installation-debug
      pool: {min : 1 , max : 2}
    },
    production: {
      client: 'pg',
      connection: 'postgres://dxvloyeb:gbT-rQO8eeCyQUYU_GYdWyw9CaYuQMqZ@pellefant.db.elephantsql.com:5432/dxvloyeb'
    }
  };

const environment = process.env.NODE_ENV || 'development';

module.exports = require('knex')(knexConfig[environment]);