// dotenv is needed to access .env file in root of a project
require('dotenv').config();

// run once to create database
// pgtools can create and drop postgres dbs in node
// const pgtools = require('pgtools');

// const config = {
//   user: process.env.USER,
//   host: process.env.HOST,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// }

// pgtools.createdb(config, 'todos', (err, res) => {
//   if (err) {
//     console.error(err);
//     process.exit(-1);
//   }
//   console.log(res);
// });

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

try {
  pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id serial primary key,
    name varchar(255),
    checked bool
  );`, (err, res) => {
    console.log(err, res);
  });
  // pool.query(`SELECT * FROM todos;`, (err, res) => {
  //   console.log(err, res);
  //   pool.end();
  // });
} catch (err) {
  console.error(err);
}

module.exports = pool;

// const client = new Client({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });
// client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
