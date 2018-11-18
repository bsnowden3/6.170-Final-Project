
<template>
     <div class="dashboard">
         <div v-if="onboarding">
            <button v-on:click="startOnboarding" class="button">Start Onboarding Process</button>
         </div>

         <div v-else>
            <button v-on:click="editDrugs" class="button">Edit Drugs</button>
            <button v-on:click="editActivities" class="button">Edit Activites</button>
        </div>
    
        <div v-show="!onboardingButtonClicked">
        </div>
     </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import { setInterval } from "timers";

export default {
  name: "Dashboard",

  data() {
    return {
        onboarding: true,
        onboardingButtonClicked: false,
    };
  },

  methods: {
        /**
         * onboarding flag
         */
        onboarding:function(){
            this.onboardingButtonClicked = true;
        },
    }

};
</script>

<style>

  
  

</style>
