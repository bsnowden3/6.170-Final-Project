
<template>
     <div class="dashboard">
         <div class="navbar">
             <ul class="navbar-list">
                 <li class="navbar-logo">Lively</li>
                 <li class="navbar-item"><button class="navbar-button" v-on:click="signOut">Sign Out</button></li>
             </ul>
         </div>
         <div class="mainSection">
            <div v-if="onboarding">
                <button v-on:click="startOnboarding" class="button">Start Onboarding Process</button>
                <button v-on:click="signOut" class="button">Sign Out</button>
            </div>

            <div v-if="onboardingButtonClicked">
                <Drug/>
            </div>

            <div v-if="drugsSavedFlag">
              <ActivitiesMainView/>
            </div>

            <!-- this will appear after the onboarding process is complete -->
            <!-- <div v-if="drugsSavedFlag">
                <button v-on:click="editDrugs" class="button">Edit Drugs</button>
                <button v-on:click="editActivities" class="button">Edit Activites</button>
            </div> -->
        </div>
     </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import { setInterval } from "timers";
import Drug  from "./Drug"
import ActivitiesMainView from "./ActivitiesMainView"
// import {drugInfo} from "../../data/drugData.js"

const drugInfo = require("../../data/drugData.js");

export default {
  name: "Dashboard",
  components: {
    Drug,
    ActivitiesMainView,
  },
  data() {
    return {
        onboarding: true,
        onboardingButtonClicked: false,
        drugsSavedFlag: false,
        userData: [],
        drugData: {
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
},
        userSchedule: {},
        userMenu: {},
        userDrugs: []
    };
  },

  created() {
    eventBus.$on('drugsSaved', (data) => {
        this.onboardingButtonClicked = false;
        this.drugsSavedFlag = true;
        this.userDrugs = data.data;
    });

    eventBus.$on('generateSchedule', () => {
        console.log("GENERATING")
        this.getUserData();
        this.generateSchedule();
        console.log(this.userSchedule);
    });

    // axios.get("/getAllDrugs")
    // .then(response => {
    //     console.log(response);
    // })
    // .catch(error => {

    // });

  },

  methods: {
        /**
         * onboarding flag
         */
        startOnboarding:function(){
            this.onboardingButtonClicked = true;
            this.onboarding = false;
        },
        signOut:function(){
            axios.post("/signout")
            .then(() => {
                eventBus.$emit("signOut-success", true);
            })
            .catch(errorMessage => {
                console.log(errorMessage);
            })
        },

        /**
         * this is the function that figures out the schedule for the patient
         */
        getUserData: function(){
            
            //get request to get all user data
            axios.get("/api/users/userData")
            .then( (axiosResponse) => {
                 const fullResponse = axiosResponse.response === undefined
                        ? axiosResponse
                        : axiosResponse.response;
                    const abridgedResponse = {
                        data: fullResponse.data,
                        status: fullResponse.status,
                        statusText: fullResponse.statusText,
                    };
                    this.userData = axiosResponse;
                    console.log(axiosResponse);
                })
                .catch( (errorMessage) =>{
                    console.log(errorMessage);
                })
        },

        generateSchedule: function(){
            let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                        "Friday", "Saturday"]

            let schedule = {"Sunday": [], "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [],
                            "Friday": [], "Saturday": []};

            let menu = {"Sunday": {"B":"-", "L": "-", "D": "-"}, 
                        "Monday": {"B":"-", "L": "-", "D": "-"}, 
                        "Tuesday": {"B":"-", "L": "-", "D": "-"}, 
                        "Wednesday": {"B":"-", "L": "-", "D": "-"}, 
                        "Thursday": {"B":"-", "L": "-", "D": "-"},
                        "Friday": {"B":"-", "L": "-", "D": "-"}, 
                        "Saturday": {"B":"-", "L": "-", "D": "-"}};

            // user data = {exercise, meals, sleeps}
            // ea. == objects with start and end times;

            // GO THROUGH EACH DAY OF THE WEEK TO GET SCHEDULE
            for(let i = 0; i < week.length; i++) {
                let dayOfWeek = week[i];
                let wakeTime = ["0", "0"];
                //FIND THE CORRECT WAKE TIME FOR THE GIVEN DAY
                for(let i = 0; i < this.userData.sleeps.length; i++){
                    if (this.userData.sleeps[i].day == dayOfWeek) {
                        wakeTime = this.userData.sleeps[i].wakeTime.split(":");
                        break;
                    }
                }

                //GET ARRAY SIZE FOR THE DAY
                let wakeHour = parseInt(wakeTime[0],10);
                let lengthOfDay = 23 - wakeTime[wakeHour];
                let dayMins = lengthOfDay * 60;
                let arraySize = dayMins/30;
                if(parseInt(wakeTime[1], 10) != 0 ){
                    arraySize--;
                }

                //MODIFY ARRAY ON GIVEN DAY TO BE ARRAY OF SIZE ARRAY SIZE WITH 
                // DUMMY VAR "-"
                let newA = []
                for (let x = 0; x < arraySize; x++) {
                    newA.push("-")
                }
                schedule[dayOfWeek] = newA;

                const meals = this.userData.meals.filter(m => m.day == dayOfWeek);
                const exercise = this.userData.exercises.filter(e => e.day == dayOfWeek);

                let daySchedule = schedule[dayOfWeek];

                //PLACE EXERCISE IN SCHEDULE
                for(let x = 0; x < exercise.length; x++) {
                    let e = exercise[x];
                    let startTime = ["0", "0"];
                    let endTime = ["0", "0"];

                    // Get Start and End Times
                    startTime = e.startTime.split(":");
                    endTime = e.endTime.split(":");

                    //FIND SLOT FOR START
                    let pointInDay = parseInt(startTime[0], 10) - wakeHour; 
                    let startSlot = (pointInDay*60)/30;

                    if (parseInt(startTime[0], 10) != 0) {
                        startSlot++;
                    }

                    //FIND SLOT FOR END
                    let endInDay = parseInt(endTime[0], 10) - wakeHour; 
                    let endSlot = (endInDay*60)/30;

                    if (parseInt(endTime[0], 10) != 0) {
                        endSlot++;
                    }

                    // FILL SLOTS
                    daySchedule[startSlot] = e;
                    daySchedule[endSlot] = e;

                    //FILL IN BETWEEN SLOTS
                    for(let x = startSlot; x <= endSlot; x++) {
                        daySchedule[x] = "exercise";
                    }


                }

                //PLACE MEALS IN SCHEDULE
                for(let x = 0; x < meals.length; x++) {
                    let e = meals[x];
                    let startTime = ["0", "0"];
                    let endTime = ["0", "0"];

                    // Get Start and End Times
                    startTime = e.startTime.split(":");
                    endTime = e.endTime.split(":");

                    //FIND SLOT FOR START
                    let pointInDay = parseInt(startTime[0], 10) - wakeHour; 
                    let startSlot = (pointInDay*60)/30;

                    if (parseInt(startTime[0], 10) != 0) {
                        startSlot++;
                    }

                    //FIND SLOT FOR END
                    let endInDay = parseInt(endTime[0], 10) - wakeHour; 
                    let endSlot = (endInDay*60)/30;

                    if (parseInt(endTime[0], 10) != 0) {
                        endSlot++;
                    }

                    // FILL SLOTS
                    daySchedule[startSlot] = e;
                    daySchedule[endSlot] = e;

                    // KEEP TRACK OF MEALS 
                    if (e.name == "Breakfast"){
                        menu[dayOfWeek]["B"] = endslot
                    }
                    else if (e.name == "Lunch") {
                        menu[dayOfWeek]["L"] = endslot
                    }
                    else {
                        menu[dayOfWeek]["D"] = endslot
                    }

                    //FILL IN BETWEEN SLOTS
                    for(let x = startSlot; x <= endSlot; x++) {
                        daySchedule[x] = "eat";
                    }

                }

                this.userSchedule = schedule;
                this.userMenu = menu;
                // PUT IN DRUGS

                this.fillDrugs(week);

            }

            /*
            1. look at a user's sleep first to determine length of day for each day of the week
            2. create an array for each day of the week (maybe do a ForEach for an array of days of the week?)
                -How to determine array size:
                    -Start Day time: get wake up time
                    -End of day time: get dinner end time and 2 hours to that (make this the end of the day)
                    -Length of day: subtract End of day time - Start day time
                    -DayMins: convert hours to minutes (length of day * 60 mins)
                    -arraySize = DayMins/30 
            3. put things into the array based on their start time and add the event and slot into a dictionary
                -How to figure out where to insert the event into the array:
                    1. pointInDay: subtract start time of event - wake time
                    2. pointInDay will equal nth hour of the day this event starts
                    3. Array slot = (pointInDay*60) / 30
                    4. Determine length of event (endTime - startTime) 
                    5. Determine number of slots of Array to take up, length of Event/30
                    6. Add values in the array for the event to take up the respective blocks

            4. go through each drug saved for User
                    1. check for timeofDay and insert 
                    2. check dictionary to know where meals are
            */
        },

        fillDrugs: function(week) {
            // GO THROUGH EACH DAY
            for(let j = 0; j < week.length; j++){
                let dayOfWeek = week[j];

                // GO THROUGH EACH DRUG
                for(d = 0; d < this.userDrugs.length; d++) {
                    let drug = this.userDrugs[d];
                    let freq = this.drugInfo[drug]["frequency"];

                    // TAKE DRUG FREQUENCY TIMES
                    for(i = 0; i < freq; i++) {

                        //ALWAYS CHECK BREAKFAST FIRST
                        if(i == 0 && this.userMenu[dayOfWeek]["B"] != "-"){
                            let slot = this.userMenu[dayOfWeek]["B"];
                            let daySchedule = this.userSchedule[dayOfWeek]
                            if (daySchedule[slot] == "-") {
                                daySchedule[slot] == 'take ' + drug;
                            }
                            else {
                                greedyScheduler(slot, drug, daySchedule);
                            }
                        } 

                        //CHECK LUNCH NEXT
                        else if(i == 1 && this.userMenu[dayOfWeek]["L"] != "-"){
                            let slot = this.userMenu[dayOfWeek]["L"];
                            let daySchedule = this.userSchedule[dayOfWeek]
                            if (daySchedule[slot] == "-") {
                                daySchedule[slot] == 'take ' + drug;
                            }
                            else {
                                greedyScheduler(slot, drug, daySchedule);
                            }
                        }

                        //CHECK DINNER LAST
                        else{
                            let slot = this.userMenu[dayOfWeek]["D"];
                            let daySchedule = this.userSchedule[dayOfWeek]
                            if (daySchedule[slot] == "-") {
                                daySchedule[slot] == 'take ' + drug;
                            }
                            else {
                                greedyScheduler(slot, drug, daySchedule);
                            }
                        }  
                    }
                }
            }

        },
        
        greedyScheduler: function(slot, drug, daySchedule) {
            placed = false;

            // TRY AND FIND THE EARLIEST SLOT AFTER THE LAST MEAL
            while(slot < daySchedule.length) {
                if (daySchedule[slot] == "-") {
                    daySchedule[slot] == 'take ' + drug;
                    placed = true;
                    break;
                }
                else {
                    slot++;
                }
            }

            // IF NONE EXIST FIND EARLIEST POSSIBLE
            if (!placed) {
                let greedSlot = 0;
                while(greedSlot < daySchedule.length) {
                    if (daySchedule[greedSlot] == "-") {
                        daySchedule[greedSlot] == 'take' + drug;
                        placed = true;
                        break;
                    }
                    else {
                        greedSlot++;
                    }
                }
            }

            // THIS IS A FAILED SCHEDULE (NO ROOM FOR DRUG)
            if (!placed) {
                //TODO SOME ERROR 
            }

        }



    }

};
</script>

<style>

.mainSection{
  margin-top:5em;
}

.navbar-logo{
    font-weight: bold;
    font-family: cursive;
    font-size:30px;
    margin-left:20px;
    display:inline;
    text-align: center;
}

.navbar-item{
    margin-right:20px;
    margin-top:15px;
    display:inline;
    text-align: center;
    float:right;
}

.navbar-button{
    border:none;
    background:none;
    cursor: pointer;
    font-size:16px;
    font-weight: bold;
}

.navbar-button:hover{
    color: #4257b2;
    text-decoration: underline;
    text-decoration-color: #4257b2;
}

</style>
