
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
                <Drug/>>
            </div>

            <!-- this will appear after the onboarding process is complete -->
            <div v-if="drugsSavedFlag">
                <button v-on:click="editDrugs" class="button">Edit Drugs</button>
                <button v-on:click="editActivities" class="button">Edit Activites</button>
            </div>
        </div>
     </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import { setInterval } from "timers";
import Drug  from "./Drug"

export default {
  name: "Dashboard",
  components: {
    Drug
  },
  data() {
    return {
        onboarding: true,
        onboardingButtonClicked: false,
        drugsSavedFlag: false
    };
  },

  created() {
    eventBus.$on('drugsSaved', (data) => {
        this.onboardingButtonClicked = false;
        drugsSavedFlag = true;
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
