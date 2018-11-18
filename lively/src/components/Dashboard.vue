
<template>
     <div class="dashboard">
         <div class="navbar">
             <ul class="navbar-item">
                 <li>Lively</li>
             </ul>
         </div>
         <div class="mainSection">
            <div v-if="onboarding">
                <button v-on:click="startOnboarding" class="button">Start Onboarding Process</button>
                <button v-on:click="signOut" class="button">Sign Out</button>

            </div>
        
            <div v-if="onboardingButtonClicked">
                <Drug></Drug>
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
    }

};
</script>

<style>

  .mainSection{
  margin-top:5em;
}

</style>
