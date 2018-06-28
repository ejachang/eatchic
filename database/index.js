const { Client } = require('pg');

// const client = new Client({
//   user: '',
//   password: '',
//   database: '',
// });

// pool.query('select NOW()', (err, res) => {
//   // console.log(err, res);
// });

// example connection String = const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
// var config = parse('postgres://someuser:somepassword@somehost:381/somedatabase')
const client = new Client(process.env.DATABASE_URL);

module.exports = { client };
