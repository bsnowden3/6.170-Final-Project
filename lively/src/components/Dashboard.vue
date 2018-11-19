
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
        userData: []
    };
  },

  created() {
    eventBus.$on('drugsSaved', (data) => {
        this.onboardingButtonClicked = false;
        this.drugsSavedFlag = true;
    });

    eventBus.$on('generateSchedule', () => {
        this.getUserData();
        this.generateSchedule();
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
                    this.userData = axiosResponse;
                    console.log(axiosResponse);
                })
                .catch( (errorMessage) =>{
                    console.log(errorMessage);
                })
        },

        generateSchedule: function(){
            /*
            1. look at a user's sleep first to determine length of day for each day of the week
            2. create an array for each day of the week (maybe do a ForEach for an array of days of the week?)
                -How to determine array size:
                    -Start Day time: get wake up time
                    -End of day time: get dinner end time and 2 hours to that (make this the end of the day)
                    -Length of day: subtract End of day time - Start day time
                    -DayMins: convert hours to minutes (length of day * 60 mins)
                    -arraySize = DayMins/30 
            3. put things into the array based on their start time
                -How to figure out where to insert the event into the array:
                    1. pointInDay: subtract start time of event - wake time
                    2. pointInDay will equal nth hour of the day this event starts
                    3. Array slot = (DayMins - (pointInDay*60)) / 30
                    4. Determine length of event (endTime - startTime) 
                    5. Determine number of slots of Array to take up, length of Event/30
                    6. Add values in the array for the event to take up the respective blocks

            4. go through each drug saved for User
                    1. check for timeofDay and insert 
                    2. check dictionary to know where meals are
            */
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
