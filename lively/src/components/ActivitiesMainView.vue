<template>
  <div class='activities-main-view'>
    <h1> Enter Your Daily Schedule </h1>
    <div class='activities-addition-section'>
      <h2> Activities </h2>
      <div class='main-content'>
        <!-- Children Components -->
        <SleepActivity />
        <MealActivity/>
        <ExerciseActivity/>
      </div>
    <div v-on:click="generateDefaultSchedule" class="defaultScheduleButton">
      <button> Generate Quick Schedule! </button>
    </div>
    </div>
    <div class='selected-activites-section'>
      <h2> Current Schedule </h2>
      <CurrentScheduleComponent />
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
import CurrentScheduleComponent from "./CurrentScheduleComponent.vue"
import axios from 'axios';
import { eventBus } from "../main";


export default {
  name: "ActivitiesMainView",
  components: {
    MealActivity,
    ExerciseActivity,
    SleepActivity,
    CurrentScheduleComponent
  },
  methods: {
    saveSchedule: function() {
      eventBus.$emit('generateSchedule', (true));
    },
    generateDefaultSchedule: function() {
      eventBus.$emit('generateDefaultSchedule', (true));
    }
  }
};
</script>

<style scoped>
  .activities-main-view {
    flex-wrap: wrap;
  }
  .defaultScheduleButton {
    border-radius: 5px;
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
