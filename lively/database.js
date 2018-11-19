const mysql = require('mysql');

const config = require('./databaseConfig.js');

class Database {
  constructor(dbConfig) {
    this.connection = mysql.createConnection(dbConfig);
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, (err, rows) => {
        if (err) { return reject(err); }
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) { return reject( err ); }
        resolve();
      });
    });
  }

  async createTables() {
    /* Add code here, and uncomment the appropriate lines in bin/www,
     * to create database tables when starting the application
     *
     * Hint: use CREATE TABLE IF NOT EXISTS
     */

    await this.query('CREATE TABLE IF NOT EXISTS users('
      + 'name varchar(30) primary key'
      +  ')')
      .catch((err) => { console.log(err); throw err; });

  }

  /* Used for testing */
  async clearTables() {
    await database.query('TRUNCATE TABLE shorts');
    await database.query('TRUNCATE TABLE users');
  }
}

const database = new Database(config);

module.exports = database;
