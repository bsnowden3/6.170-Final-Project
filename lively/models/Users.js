let userData = [];
const database = require("../database");
const mysql = require('mysql');
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
   * @param {string} userId - random generated id for each user
   * @param {string} username - User's username
   * @param {string} password - User's Password
   */
  static addOne(userId,username, password) {
    //userData[name] = pass;
    return database.query(`INSERT INTO users(id,username, password) values("${userId}",${mysql.escape(username)},${mysql.escape(password)})`);

    // const user = {userId, username, password};
    // userData.push(user);
    // return user;
  }

  /**
   * 
   * @param {string} userId 
   */
  static checkUserInSession(userId){
    return database.query(`SELECT * FROM userSession WHERE userId = "${userId}"`);
  }

  /**
   * Add a session id to keep track of a user having an active session/logged in
   * @param {string} sessionId - session id, long string
   * @param {string} userId - user id, long string
   */
  static addSessionId(sessionId, userId){
    return database.query(`INSERT INTO userSession(sessionId,userId) values("${sessionId}","${userId}")`);
  }
  /**
   * updates an exisiting session so there are many sessions for the same user
   * @param {string} sessionId 
   * @param {string} userId 
   */
  static updateSessionId(sessionId, userId){
    return database.query(`UPDATE userSession SET sessionId = "${sessionId}" WHERE userId = "${userId}"`);
  }

  /**
   * deletes a session
   * @param {string} sessionId 
   */
  static removeUserSession(sessionId){
    return database.query(`DELETE from userSession where sessionId = "${sessionId}"`);
  }


  /**
     * returns user based on provided username
     * @param {string} username
     * @return {User} if User found
     */
    static findUser(username){

      return database.query(`SELECT * FROM users
        WHERE username = ${mysql.escape(username)}
      `);
      //return userData.filter(userVal => userVal.username === username)[0];
  }

  static findUserByID(id){

    return database.query(`SELECT * FROM users
      WHERE id = "${id}"
    `);
    //return userData.filter(userVal => userVal.username === username)[0];
}


   /**
   * Get the accompanying password to a user.
   * @param {string} username - User's username
   */
  static getPass(username) {
    const userFound = userData.filter(userVal => userVal.username === username)[0];
    return userFound.password;
  }

   /**
     * deletes a user
     * @param {string} username
     * @return {promise}
     */
    static deleteUser(username){
      return database.query(`delete from users where username = ${mysql.escape(username)}`);

  }

  /**
  * Save user onboardingStatus
  * @param {string} userId - User's id
  */
  static async saveUserOnboardingStatus(userId) {
    return database.query(`UPDATE users SET onboardingComplete = 1 WHERE id='${userId}';`);
  }

}

module.exports = Users;
