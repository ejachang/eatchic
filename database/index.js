const { Client } = require('pg');
// const { user, password, database } = require('./config/index.js');

// const client = new Client({
//   user: user,
//   password: password,
//   database: database,
// });

// pool.query('select NOW()', (err, res) => {
//   console.log(err, res);
// });

const client = new Client(process.env.DATABASE_URL);

module.exports = { client };
