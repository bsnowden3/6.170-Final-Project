// @author Bernard Snowden

let exerciseData = [];

const uuidv1 = require('uuid/v1');

/**
 * @typedef Exercise
 * @prop {string} userId - user exercise belongs to
 * @prop {string} exerciseId - id of exercise activity
 * @prop {string} startTime - startTime
 * @prop {string} endTime - endTime
 */

 /**
  * @class Exercises
  * stores all exercises
  * all methods are static
  */

class Exercises {

  /**
   *  @param name
   *  @param userId
   *  @param exerciseId
   *  @param startTime
   *  @param endTime
   *  @param daysOfWeek
   *  @param {Array(string)} daysOfWeek array of strings that includes days of week activity occurs
   */
  static addExercise(name, userId, exerciseId, startTime, endTime, daysOfWeek) {
    const exercise = { name: name, userId: userId, exerciseId: exerciseId,
      startTime: startTime, endTime: endTime}
    exerciseData.push(exercise);
    return exercise;
  }

  /**
   * Find exercise with exerciseId
   *  @param {string} exerciseId id of exercise
   */
  static findExercise(exerciseId) {
    return exerciseData.filter(exercise => exerciseId === exercise.exerciseId)[0];
  }

  /**
   * Find exercises associated with userId
   * @param {string} userId
   */
   findUserExercises(userId) {
     return exerciseData.filter(exercise => userId === exercise.userId);
   }

}

module.exports = Exercises;