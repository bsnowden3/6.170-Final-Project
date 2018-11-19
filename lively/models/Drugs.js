var drugData = {};
/**
 * @typedef Drugs
 */

/**
 * @class Drugs
 * Stores all Drugs.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Drugs {
  /**
   * Add a User.
   * @param {string} name - User's username
   * @param {string} pass - User's Password
   */
  static changeDrugData(drugs, user) {
    drugData[user] = drugs;
  }


}

module.exports = Drugs;
