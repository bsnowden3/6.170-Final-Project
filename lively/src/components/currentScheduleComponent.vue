
<template>

  <div class="dataContainer">

    <div class="list">
    <h5> Sleep Activities</h5>
    <SleepScheduledItem v-for="sleep in sleeps" v-bind:sleep='sleep'/>

    </div>


    <div class="list">
      <h5> Meal Activities</h5>
      <MealScheduledItem v-for="meal in meals"  v-bind:meal='meal'/>

    </div>

    <div class="list">
      <h5> Exercise  Activities</h5>
      <ExerciseScheduledItem v-for="exercise in exercises"  v-bind:exercise='exercise'/>

    </div>

  </div>

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import SleepScheduledItem from './SleepScheduledItem';
import MealScheduledItem from './ExerciseScheduledItem';
import ExerciseScheduledItem from './SleepScheduledItem';

export default {
  name: "CurrentScheduleComponent",
  components: {
    SleepScheduledItem,
    MealScheduledItem,
    ExerciseScheduledItem,
  },
  data() {
    return {
      sleeps: [],
      meals: [],
      exercises: [],
    };
  },
  mounted() {
    this.loadSleeps();
    this.loadMeals();
    this.loadExercises();
  },
  created() {
    eventBus.$on('postedActivity', () => {
      this.loadSleeps();
      this.loadMeals();
      this.loadExercises();
    });
  },

  methods: {
      loadSleeps: function() {
        axios.get('/api/activities/allSleeps').then((response) => { console.log(response); this.sleeps = response.data.sleeps; } );
      },
      loadMeals: function() {
        axios.get('/api/activities/allMeals').then((response) => { console.log(response); this.meals = response.data.meals; } );
      },
      loadExercises: function() {
        axios.get('/api/activities/allExercises').then((response) => { console.log(response); this.exercises = response.data.exercises; });
      }
    }
};
</script>

<style>
 .dataContainer {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
 }

 .list {
   display: flex;
   flex-direction: column;
 }

</style>
