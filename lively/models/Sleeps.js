/// @author Bernard Snowden

let sleepData = [];

const uuidv1 = require('uuid/v1');
const database = require("../database");
const mysql = require('mysql');

/**
 * @typedef Sleep
 * @prop {string} userId - user meal belongs to
 * @prop {string} sleepId - id of sleep activity
 * @prop {string} wakeUpTime - startTime
 * @prop {string} day - day of sleep
 */

 /**
  * @class Sleeps
  * stores all sleeps
  * all methods are static
  */

class Sleeps {

  /**
   *  @param userId
   *  @param sleepId
   *  @param wakeUpTime time user gets up for the day
   *  @param day day sleep occurs
   */
  static async addSleep(sleepId, startTime, dayOfWeek, userId) {
    try {
      const sql = `INSERT INTO userSleepRegimen (sleepId, startTime, dayOfWeek, userId)
      VALUES ('${sleepId}', '${startTime}', '${dayOfWeek}', '${userId}');`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find sleep with sleepId
   *  @param {string} sleepId id of sleep
   */
  static async findMeal(sleepId) {
    try {
      const sql = `SELECT * FROM userSleepRegimen WHERE sleepId='${sleepId}';`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find Meals associated with userId
   * @param {string} userId
   */
   static async findUserSleeps(userId) {
     try {
       const sql = `SELECT * FROM userSleepRegimen WHERE userId='${userId}';`;
       const response = await database.query(sql);
       return response;
     } catch (error) {
       throw error;
     }
   }

   /**
    * Delete sleeps associated with sleepId
    * @param {string} sleepId
    */
    static async deleteSleep(sleepId) {
      try {
        const sql = `DELETE FROM userSleepRegimen WHERE sleepId='${sleepId}';`;
        const response = await database.query(sql);
        return response;
      } catch (error) {
        throw error;
      }
    }

}

module.exports = Sleeps;
