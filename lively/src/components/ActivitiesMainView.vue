<template>
  <div class='activities-main-view'>
    <h1> Enter Your Daily Schedule </h1>
    <div class='activities-addition-section'>
      <h2> Activities </h2>
      <div class='main-content'>
        <!-- Children Components -->
        <MealActivity/>
        <ExerciseActivity/>
        <JobActivity/>
        <SleepActivity />
      </div>
    </div>
    <div class='selected-activites-section'>
      <h2> Current Schedule </h2>

    </div>
  </div>
</template>

<script>

import MealActivity from "./MealActivity.vue";
import ExerciseActivity from "./ExerciseActivity.vue";
import JobActivity from "./JobActivity.vue";
import SleepActivity from "./SleepActivity.vue";

export default {
  name: "ActivitiesMainView",
  components: {
    MealActivity,
    ExerciseActivity,
    JobActivity,
    SleepActivity
  }
};
</script>

<style scoped>
  .activities-main-view {
    flex-wrap: wrap;
    background-color: white;
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
