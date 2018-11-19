/// @author Bernard Snowden

let sleepData = [];

const uuidv1 = require('uuid/v1');

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
   *  @param name
   *  @param userId
   *  @param sleepId
   *  @param wakeUpTime time user gets up for the day
   *  @param day day sleep occurs
   */
  static addSleep(name, userId, sleepId, wakeUpTime, day) {
    const sleep = { name: name, userId: userId, sleepId: sleepId,
      wakeUpTime: wakeUpTime, day: day}
    sleepData.push(sleep);
    return sleep;
  }

  /**
   * Find sleep with sleepId
   *  @param {string} sleepId id of sleep
   */
  static findMeal(sleepId) {
    return sleepData.filter(sleep => sleepId === sleep.sleepId)[0];
  }

  /**
   * Find Meals associated with userId
   * @param {string} userId
   */
   findUserSleeps(userId) {
     return mealData.filter(sleep => userId === sleep.userId);
   }

}

module.exports = Sleeps;
