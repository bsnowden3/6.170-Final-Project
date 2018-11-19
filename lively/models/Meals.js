// @author Bernard Snowden

let mealData = [];

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
  static addMeal(meal) {
    mealData.push(meal);
    return meal;
  }

  /**
   * Find meal with mealId
   *  @param {string} mealId id of meal
   */
  static findMeal(mealId) {
    return mealData.filter(meal => mealId === meal.mealId)[0];
  }

  /**
   * Find Meals associated with userId
   * @param {string} userId
   */
   findUserMeals(userId) {
     return mealData.filter(meal => userId === meal.userId);
   }

}

module.exports = Meals;
