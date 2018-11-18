//author Bernard Snowden
// Activity is a generic type representing when an item would appear in
// a schedule.

class Activity {

  /**
   * @param {string} name name of the activity
   * @param {string} startTime time when activity begins (recorded in military time)
   * @param {string} endTime time when activity ends (recorde in military time)
   * @param {Array(string)} daysOfWeek array of strings that includes days of week activity occurs
   */
  constructor(name, startTime, endTime, daysOfWeek) {
    this.name = name;
    // TODO this.activityId = someRandomIdNumeber
    this.startTime = startTime;
    this.endTime = endTime;
    this.daysOfWeek = daysOfWeek
  }

}
