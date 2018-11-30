const mysql = require('mysql');

const config = require('./databaseConfig.js');

class Database {
  constructor(dbConfig) {
    this.connection = mysql.createPool(dbConfig);
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
    let createUsersTable = `CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(255) primary key not null unique, 
        username VARCHAR(255) not null unique, 
        password VARCHAR(255) not null,
        onboardingComplete TINYINT(1)
    )`;
    await database.query(createUsersTable)

    let createDrugsTable = `CREATE TABLE IF NOT EXISTS drugs(
        id VARCHAR(255) primary key not null unique, 
        name VARCHAR(255) not null unique,
        frequency INT not null, 
        time_of_day VARCHAR(255) not null,
        side_effects VARCHAR(255) not null
    )`;

    await database.query(createDrugsTable);

    let createUserDrugsRegimenTable = `CREATE TABLE IF NOT EXISTS userDrugsRegimen(
        userId VARCHAR(255) REFERENCES users(id),
        drugId VARCHAR(255) REFERENCES drugs(id), 
        startTime VARCHAR(255) not null	
    )`;
    
    await database.query(createUserDrugsRegimenTable);

    let createMealsTable = `CREATE TABLE IF NOT EXISTS meals(
        id VARCHAR(255) primary key not null unique,
        name VARCHAR(255) not null unique,
        size VARCHAR(255) not null
    )`;  

    await database.query(createMealsTable);


    let createUserMealsRegimenTable = `CREATE TABLE IF NOT EXISTS userMealsRegimen(
        mealId VARCHAR(255) REFERENCES meals(id), 
	    userId VARCHAR(255) REFERENCES users(id),
        startTime VARCHAR(255) not null,
        endTime VARCHAR(255) not null,	
        dayOfWeek VARCHAR(255) not null
    )`;  
    await database.query(createUserMealsRegimenTable);

    let createUserSleepScheduleTable = `CREATE TABLE IF NOT EXISTS userSleepSchedule(
        sleepId VARCHAR(255) primary key not null unique,
        startTime VARCHAR(255) not null,
        dayOfWeek VARCHAR(255) not null,
        userId VARCHAR(255) REFERENCES users(id)
    )`;  
    await database.query(createUserSleepScheduleTable);

    let createUserExerciseScheduleTable = `CREATE TABLE IF NOT EXISTS userExerciseSchedule(
        exerciseId VARCHAR(255) primary key not null unique,
        name VARCHAR(255) not null,
        startTime VARCHAR(255) not null,
        endTime VARCHAR(255) not null,
        dayOfWeek VARCHAR(255) not null,
        userId VARCHAR(255) REFERENCES users(id)
    )`;  
    await database.query(createUserExerciseScheduleTable);

}

  /* Used for testing */
  async clearTables() {
    await database.query('TRUNCATE TABLE shorts');
    await database.query('TRUNCATE TABLE users');
  }
}

const database = new Database(config);

module.exports = database;
