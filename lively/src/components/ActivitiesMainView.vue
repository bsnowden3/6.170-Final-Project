<template>
  <div class='activities-main-view'>
    <div class='activities-addition-section'>
      <h2 class="header"> Step 2: Enter your Daily Schedule </h2>
      <div class='main-content'>
        <!-- Children Components -->
        <SleepActivity />
        <MealActivity/>
        <ExerciseActivity/>
      </div>
    <div class="def-schedule" v-on:click="generateDefaultSchedule" class="defaultScheduleButton">
      <button> Generate Quick Schedule! </button>
    </div>
    </div>
    <div class='selected-activites-section'>
      <h2> Current Schedule </h2>
      <CurrentScheduleComponent />
    </div>
    <div class="buttonContainer">
      <div class="back-button">
        <button class="button" v-on:click="goBack"> Back </button>
      </div>
      <div class="save-schedule">
        <button class="button" v-on:click="saveSchedule"> Save Schedule! </button>
      </div>
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
      axios.post('/api/users/saveonboarding', {});
    },
    generateDefaultSchedule: function() {
      eventBus.$emit('generateDefaultSchedule', (true));
    },
    goBack: function() {
      eventBus.$emit('activitiesBack',(true));
    }
  }
};
</script>

<style scoped>
  .activities-main-view {
    flex-wrap: wrap;
    justify-content: center;
  }

  h2.header {
    color: white;
    align-self: center;
  }

  .button {
    font-size: 16px;
    border-radius: 5px;
    background-color: "black";
    width: auto;
    height: auto;
    align-self: flex-end;
  }

  .def-schedule {
    font-size: 16px;
    border-radius: 5px;
    background-color: "black";
    width: auto;
    height: auto;
  }
  .save-schedule {
    align-self: flex-end;
  }
  .main-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .activities-addition-section {
    display: flex;
    flex-direction: column;
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
  }
</style>
