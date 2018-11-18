// @author Bernard Snowden

let sleepData = [];

const uuidv1 = require('uuid/v1');

class Meal {

  /**
   * @param {string} name name of the activity
   * @param {string} wakeUpTime time when activity begins (recorded in military time)
   * @param {string} bedTime time when activity ends (recorde in military time)
   * @param {Array(string)} daysOfWeek array of strings that includes days of week activity occurs
   */
  constructor(name, userId, sleepId, wakeUpTime, bedTime, daysOfWeek) {
    this.name = name;
    this.userId = userId;
    this.sleepId = sleapId;
    // TODO this.activityId = someRandomIdNumeber
    this.startTime = startTime;
    this.endTime = endTime;
    this.daysOfWeek = daysOfWeek
  }

  /**
   *  @param {Sleep}
   */
  static addSleep() {

  }

  /**
   *  @param {string} sleepId
   *
   */
  static findSleep() {

  }

}
