let userData = {};

/**
 * @typedef Users
 * @prop {string} name - some string, valid in a URL path
 * @prop {string} url - link to an external source
 * @prop {string} creator - username
 */

/**
 * @class Users
 * Stores all Users.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User.
   * @param {string} name - User's username
   * @param {string} pass - User's Password
   */
  static addOne(name, pass) {
    userData[name] = pass;
  }

  /**
   * Check if a User exists
   * @param {string} name - User's username
   */
  static checkUser(name) {
    return name in userData
  }


   /**
   * Get the accompanying password to a user.
   * @param {string} name - User's username
   */
  static getPass(name) {
    return userData[name]
  }


}

module.exports = Users;
