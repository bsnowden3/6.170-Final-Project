// @author Bernard Snowden

let mealData = [];

const uuidv1 = require('uuid/v1');

class Meal {

  /**
   * @param {string} name name of the activity
   * @param {string} startTime time when activity begins (recorded in military time)
   * @param {string} endTime time when activity ends (recorde in military time)
   * @param {Array(string)} daysOfWeek array of strings that includes days of week activity occurs
   */
  constructor(name, userId, mealId, startTime, endTime) {
    this.name = name;
    this.userId = userId;
    this.mealId = mealId;
    // TODO this.activityId = someRandomIdNumeber
    this.startTime = startTime;
    this.endTime = endTime;
    this.daysOfWeek = daysOfWeek
  }

  /**
   *  @param {Meal}
   *  @param {Array(string)} daysOfWeek array of strings that includes days of week activity occurs
   */
  static addMeal() {

  }

  /**
   *  @param {string} mealId
   *
   */
  static findMeal() {

  }

}
