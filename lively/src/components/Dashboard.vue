
<template>
     <div class="dashboard">
         <div v-if="onboarding">
            <button v-on:click="startOnboarding" class="button">Start Onboarding Process</button>
         </div>

         <div v-else>
            <button v-on:click="editDrugs" class="button">Edit Drugs</button>
            <button v-on:click="editActivities" class="button">Edit Activites</button>
        </div>
    
        <div v-show="onboardingButtonClicked">
            <Drug></Drug>
        </div>

        <div v-show="drugsSavedFlag">

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
        },
    }

};
</script>

<style>

  
  

</style>
