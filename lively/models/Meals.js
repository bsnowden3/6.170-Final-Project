// @author Bernard Snowden

const database = require("../database");
const mysql = require('mysql');

const uuidv1 = require('uuid/v1');

/**
 * @typedef Meal
 * @prop {string} userId - user meal belongs to
 * @prop {string} mealId - id of meal activity
 * @prop {string} startTime - startTime
 * @prop {string} endTime - endTime
 */

 /**
  * @class Meals
  * stores all meals
  * all methods are static
  */

class Meals {

  /**
   *  @param name
   *  @param userId
   *  @param mealId
   *  @param mealSize
   *  @param startTime
   *  @param endTime
   *  @param day day of week activity occurs
   */
  static async addMeal(meal) {
    // mealData.push(meal);

    try {
      const sql = `INSERT INTO userMealsRegimen (mealId, userId, startTime, endTime, dayOfWeek) VALUES (
                  '${meal.mealId}',
                  '${meal.userId}', 
                  '${meal.startTime}',
                  '${meal.endTime}',
                  '${meal.day}') ;`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find meal with userId
   *  @param {string} userId
   */
  static async findUserMeals(userId) {
    try {
      const sql = `SELECT * FROM userMealsRegimen WHERE userId='${userId}';`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUserMeal(mealId) {
    try {
      const sql = `DELETE * FROM userMealsRegimen WHERE mealId='${mealId}';`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = Meals;
