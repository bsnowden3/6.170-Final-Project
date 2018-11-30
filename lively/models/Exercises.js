// @author Bernard Snowden

let exerciseData = [];

const uuidv1 = require('uuid/v1');
const database = require("../database");
const mysql = require('mysql');

/**
 * @typedef Exercise
 * @prop {string} userId - user exercise belongs to
 * @prop {string} exerciseId - id of exercise activity
 * @prop {string} startTime - startTime
 * @prop {string} endTime - endTime
 * * @prop {string} day - day of Week activity occurs
 */

 /**
  * @class Exercises
  * stores all exercises
  * all methods are static
  */

class Exercises {

  /**
   *  @param name
   *  @param userId
   *  @param exerciseId
   *  @param startTime
   *  @param endTime
   *  @param daysOfWeek
   *  @param {Array(string)} daysOfWeek array of strings that includes days of week activity occurs
   */
  static async addExercise(exerciseId, name, startTime, endTime, dayOfWeek, userId) {
    try {
      const sql = `INSERT INTO userExerciseRegimen (exerciseId, name, startTime, endTime, dayOfWeek, userId)
      VALUES ('${exerciseId}', '${name}', '${startTime}', '${endTime}', '${dayOfWeek}', '${userId}');`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find exercise with exerciseId
   *  @param {string} exerciseId id of exercise
   */
  static async findExercise(exerciseId) {
    try {
      const sql = `SELECT * FROM userExerciseRegimen WHERE exerciseId='${exerciseId}';`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find exercises associated with userId
   * @param {string} userId
   */
   static async findUserExercises(userId) {
     try {
       const sql = `SELECT * FROM userExerciseRegimen WHERE userId='${userId}';`;
       const response = await database.query(sql);
       return response;
     } catch (error) {
       throw error;
     }
   }

}

module.exports = Exercises;
