const { Client } = require('pg');

// const client = new Client({
//   user: '',
//   password: '',
//   database: '',
// });

// pool.query('select NOW()', (err, res) => {
//   // console.log(err, res);
// });

const client = new Client(process.env.DATABASE_URL);

module.exports = { client };
