<template>
  <div class='activities-main-view'>
    <h1> Enter Your Daily Schedule </h1>
    <div class='activities-addition-section'>
      <h2> Activities </h2>
      <div class='main-content'>
        <!-- Children Components -->
        <MealActivity/>
        <ExerciseActivity/>
        <SleepActivity />
      </div>
    </div>
    <div class='selected-activites-section'>
      <h2> Current Schedule </h2>

    </div>
    <div>
      <button v-on:click="saveSchedule"> Save Schedule! </button>
    </div>
  </div>
</template>
<script>

import MealActivity from "./MealActivity.vue";
import ExerciseActivity from "./ExerciseActivity.vue";
import SleepActivity from "./SleepActivity.vue";
import axios from 'axios';
import { eventBus } from "../main";


export default {
  name: "ActivitiesMainView",
  components: {
    MealActivity,
    ExerciseActivity,
    SleepActivity,
  },
  methods: {
    saveSchedule: function() {
      eventBus.$emit('generateSchedule', (true));
    }
  }
};
</script>

<style scoped>
  .activities-main-view {
    flex-wrap: wrap;
  }
  .main-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .activities-addition-section {
    display: flex;
    flex-direction: column;
  }
</style>
