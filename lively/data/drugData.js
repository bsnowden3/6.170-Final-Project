
/**
 * @typedef DrugDrata
 */

/**
 * @class Drugs
 * Class that stores all drug information
 */
class DrugData {
    // TIME OF DAY CAN BE: MORNING, DAY, NIGHT, ANY
    constructor() {
        this.drugInfo = {
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
      }

   /**
   * Get the saved drug data
   */
  static getDrugs() {
    return this.drugInfo;
  }


}

module.exports = DrugData;
