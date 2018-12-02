var drugData = {};
const database = require("../database");
const mysql = require('mysql');

var drugInfo = {
  "Metformin": {
      "frequency": 1,
      "withFood": false,
      "sideEffects": "Nausea, Vomiting, Diarrhea, Chills, Heartburn",
      "timeOfDay": "MORNING"

  },

  "Sulfonylureas": {
      "frequency": 1,
      "withFood": true,
      "sideEffects": "Hepatitis, Leukopenia, Porphyria",
      "timeOfDay": "MORNING"
  },

  "Thiazolidinediones": {
      "frequency": 1,
      "withFood": false,
      "sideEffects": "Congestive Heart Failure, Edema, Fractures",
      "timeOfDay": "ANY"
  },

  "GLP-1 receptor agonists": {
      "frequency": 2,
      "withFood": true,
      "sideEffects": "Immunogenecity, Hypoglycemia",
      "timeOfDay": "ANY"
  },

  "Prandin": {
      "frequency": 3,
      "withFood": true,
      "sideEffects": "Hypoglycemia, Weight Gain",
      "timeOfDay": "ANY"
  }
}

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
  static async wipeDrugData(userID,) {
    // drugData[userID] = drugs;

    try {
        const sql = `DELETE FROM userDrugsRegimen WHERE userId='${userID}';`;
        const response = await database.query(sql);
        return response;
      } catch (error) {
        throw error;
      }
  }

  static async addDrug(drug, userID) {
    // drugData[user] = drugs;

    try {
        const sql = `INSERT INTO userDrugsRegimen VALUES ('${userID}', 
                    '${drug}', 
                    '000') ;`;
        const response = await database.query(sql);
        return response;
      } catch (error) {
        throw error;
      }
  }

  static async createDrug(drug, data) {
    // drugData[user] = drugs;

    try {
        const sql = `INSERT INTO userDrugsRegimen VALUES ('${userID}', 
                    '${drug}', 
                    '000') ;`;
        const response = await database.query(sql);
        return response;
      } catch (error) {
        throw error;
      }
  }

  static getUserDrugs(user) {

    return drugData[user];
  }

  static async getDrugs() {
    try {
      const sql = `SELECT * FROM drugs WHERE 1;`;
      const response = await database.query(sql);
      return response;
    } catch (error) {
      throw error;
    }
  }


}

module.exports = Drugs;
