
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

             <div v-if="scheduleGenerated">
              {{ userSchedule }}
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
        scheduleGenerated: false,
        userData: {},
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
        userDrugs: [],

    };
  },

  created() {
      
    eventBus.$on('drugsSaved', (data) => {
        this.onboardingButtonClicked = false;
        this.drugsSavedFlag = true;
        this.userDrugs = data;
    });

    eventBus.$on('generateSchedule', () => {


        this.getUserData();

    });

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
                    // this.userData = axiosResponse.data.userData;
                    let list = Object.keys(axiosResponse.data.userData);
                    for(let i = 0; i < list.length; i++) {
                        this.userData[list[i]] = axiosResponse.data.userData[list[i]];
                    }

                    this.generateSchedule();

                })
                .catch( (errorMessage) =>{
                    console.log(errorMessage);
                })
        },

        generateSchedule: function(){
            var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                        "Friday", "Saturday"]

            let schedule = {"Sunday": [], "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [],
                            "Friday": [], "Saturday": []};

            let menu = {"Sunday": {"B": 0, "L": "-", "D": "-"}, 
                        "Monday": {"B": 0, "L": "-", "D": "-"}, 
                        "Tuesday": {"B": 0, "L": "-", "D": "-"}, 
                        "Wednesday": {"B": 0, "L": "-", "D": "-"}, 
                        "Thursday": {"B": 0, "L": "-", "D": "-"},
                        "Friday": {"B": 0, "L": "-", "D": "-"}, 
                        "Saturday": {"B": 0, "L": "-", "D": "-"}};

            let mealType = ["Breakfast", "Lunch", "Dinner"];

            // user data = {exercise, meals, sleeps}
            // ea. == objects with start and end times;

            // GO THROUGH EACH DAY OF THE WEEK TO GET SCHEDULE
            for(let i = 0; i < week.length; i++) {
                let dayOfWeek = week[i];
                let wakeTime = ["0", "0"];
                //FIND THE CORRECT WAKE TIME FOR THE GIVEN DAY
                for(let i = 0; i < this.userData.sleeps.length; i++){
                    if (this.userData.sleeps[i].day == dayOfWeek) {
                        wakeTime = this.userData.sleeps[i].startTime.split(":");
                        break;
                    }
                }

                //GET ARRAY SIZE FOR THE DAY
                let wakeHour = parseInt(wakeTime[0],10);
                let lengthOfDay = 23 - wakeHour;
                let dayMins = lengthOfDay * 60;
                let arraySize = dayMins/30;
                if(parseInt(wakeTime[1], 10) != 0 ){
                    arraySize--;
                }

                //MODIFY ARRAY ON GIVEN DAY TO BE ARRAY OF SIZE ARRAY SIZE WITH 
                // DUMMY VAR "-"
                let newA = []
                for (let f = 0; f < arraySize; f++) {
                    newA.push("-")
                }
                newA[0] = "wake";
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

                    if (parseInt(startTime[1], 10) != 0) {
                        startSlot++;
                    }

                    //FIND SLOT FOR END
                    let endInDay = parseInt(endTime[0], 10) - wakeHour; 
                    let endSlot = (endInDay*60)/30;


                    if (parseInt(endTime[1], 10) == 30) {
                        endSlot++;
                    }

                    // FILL SLOTS
                    daySchedule[startSlot] = e;
                    daySchedule[endSlot] = e;

                    //FILL IN BETWEEN SLOTS
                    for(let z = startSlot; z <= endSlot; z++) {
                        daySchedule[z] = "exercise";
                    }


                }

                //PLACE MEALS IN SCHEDULE
                for(let y = 0; y < meals.length; y++) {
                    // let e = meals[y];

                    let startTime1 = ["0", "0"];
                    let endTime1 = ["0", "0"];

                    // Get Start and End Times
                    startTime1 = meals[y].startTime.split(":");
                    endTime1 = meals[y].endTime.split(":");

                    //FIND SLOT FOR START
                    let pointInDay1 = parseInt(startTime1[0], 10) - wakeHour; 
                    let startSlot1 = (pointInDay1*60)/30;

                    if (parseInt(startTime1[1], 10) != 0) {
                        startSlot1++;
                    }

                    //FIND SLOT FOR END
                    let endInDay1 = parseInt(endTime1[0], 10) - wakeHour; 
                    let endSlot1 = (endInDay1*60)/30;

                    if (parseInt(endTime1[1], 10) != 0) {
                        endSlot1++;
                    }

                    // FILL SLOTS
                    daySchedule[startSlot1] = meals[y];
                    daySchedule[endSlot1] = meals[y];

                    // KEEP TRACK OF MEALS 
                    if (meals[y].name == "Breakfast"){
                        menu[dayOfWeek]["B"] = endSlot1
                    }
                    else if (meals[y].name == "Lunch") {
                        menu[dayOfWeek]["L"] = endSlot1
                    }
                    else {
                        menu[dayOfWeek]["D"] = endSlot1
                    }

                    //FILL IN BETWEEN SLOTS
                    for(let b = startSlot1; b <= endSlot1; b++) {
                        daySchedule[b] = "eat";
                    }

                }

                this.userSchedule = schedule;
                this.userMenu = menu;
                // PUT IN DRUGS

                this.fillDrugs(dayOfWeek);


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

            this.onboarding = false
            this.onboardingButtonClicked = false
            this.drugsSavedFlag = false
            this.scheduleGenerated =  true
        },

        fillDrugs: function(dayOfWeek) {

            // GO THROUGH EACH DRUG
            for(let d = 0; d < this.userDrugs.length; d++) {
                let drug = this.userDrugs[d];
                let freq = this.drugData[drug]["frequency"];

                // TAKE DRUG FREQUENCY TIMES
                let lastSlot = 0;
                for(let i = 0; i < freq; i++) {

                    //ALWAYS CHECK BREAKFAST FIRST
                    if(i == 0){
                        let slot = this.userMenu[dayOfWeek]["B"];
                        let daySchedule = this.userSchedule[dayOfWeek]
                        if (daySchedule[slot] == "-") {
                            daySchedule[slot] = 'take ' + drug;
                        }
                        else {
                            this.greedyScheduler(slot, drug, daySchedule);
                        }
                        lastSlot = slot;
                    } 

                    //CHECK LUNCH NEXT
                    else if(i == 1){
                        let slot = this.userMenu[dayOfWeek]["L"];
                        if(slot == "-") {
                            slot = lastSlot;
                        }
                        let daySchedule = this.userSchedule[dayOfWeek]
                        if (daySchedule[slot] == "-") {
                            daySchedule[slot] = 'take ' + drug;
                        }
                        else {
                            this.greedyScheduler(slot, drug, daySchedule);
                        }
                        lastSlot = slot;
                    }

                    //CHECK DINNER LAST
                    else{
                        let slot = this.userMenu[dayOfWeek]["D"];
                        if(slot == "-") {
                            
                            slot = lastSlot;
                        }
                        let daySchedule = this.userSchedule[dayOfWeek]
                        if (daySchedule[slot] == "-") {
                            daySchedule[slot] = 'take ' + drug;
                        }
                        else {
                            this.greedyScheduler(slot, drug, daySchedule);
                        }
                        lastSlot = slot;
                    }  
                }
            }

        },
        
        greedyScheduler: function(slot, drug, daySchedule) {
            let placed = false;

            // TRY AND FIND THE EARLIEST SLOT AFTER THE LAST MEAL
            while(slot < daySchedule.length) {
                if (daySchedule[slot] == "-") {
                    daySchedule[slot] = 'take ' + drug;
                    placed = true;
                    return
                }
                else {
                    slot++;
                }
            }

            // IF NONE EXIST FIND EARLIEST POSSIBLE
            if (!placed) {
                slot = 0;
                while(slot < daySchedule.length) {
                    if (daySchedule[slot] == "-") {
                        daySchedule[slot] = 'take' + drug;
                        placed = true;
                        break;
                    }
                    else {
                        slot++;
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
