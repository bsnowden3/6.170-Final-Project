let userData = [];

/**
 * @typedef User
 * @prop {string} id - unique id of user
 * @prop {string} username - username of user account
 * @prop {string} password - password of user account
 */

/**
 * @class Users
 * stores all users
 * all methods are static
 */ 
class Users {
  /**
   * Add a User.
   * @param {string} id - random generated id for each user
   * @param {string} username - User's username
   * @param {string} password - User's Password
   */
  static addOne(userId,username, password) {
    //userData[name] = pass;
    const user = {userId, username, password};
    userData.push(user);
    return user;
  }

  /**
     * returns user based on provided username
     * @param {string} username 
     * @return {User} if User found 
     */
    static findUser(username){
      return userData.filter(userVal => userVal.username === username)[0];
  }


   /**
   * Get the accompanying password to a user.
   * @param {string} username - User's username
   */
  static getPass(username) {
    const userFound = userData.filter(userVal => userVal.username === username)[0];
    return userFound.password;
  }


}

module.exports = Users;
