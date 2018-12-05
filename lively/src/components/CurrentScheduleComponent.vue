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

  <!-- <div class="dataContainer">
    <div class="list">
      <h5> Sunday </h5>
      <div v-for="activity in activitiesByDay['Sunday']">
        <div v-if="activity.activityType === 'meal'">
          <MealScheduledItem v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>

    <div class="list">
    <h5> Monday </h5>
      <div v-for="activity in activitiesByDay['Monday']">
        <div v-if="activity.activityType == 'meal'">
          <MealScheduledItem  v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>

    <div class="list">
      <h5> Tuesday </h5>
      <div v-for="activity in activitiesByDay['Tuesday']">
        <div v-if="activity.activityType == 'meal'">
          <MealScheduledItem v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>

    <div class="list">
      <h5> Wednesday </h5>
      <div v-for="activity in activitiesByDay['Wednesday']">
        <div v-if="activity.activityType == 'meal'">
          <MealScheduledItem v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>

    <div class="list">
      <h5> Thursday </h5>
      <div v-for="activity in activitiesByDay['Thursday']">
        <div v-if="activity.activityType == 'meal'">
          <MealScheduledItem v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>

    <div class="list">
      <h5> Friday </h5>
      <div v-for="activity in activitiesByDay['Friday']">
        <div v-if="activity.activityType == 'meal'">
          <MealScheduledItem v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>

    <div class="list">
      <h5> Saturday </h5>
      <div v-for="activity in activitiesByDay['Saturday']">
        <div v-if="activity.activityType == 'meal'">
          <MealScheduledItem v-bind:meal='activity.data'/>
        </div>
      </div>
    </div>
  </div> -->

</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import SleepScheduledItem from './SleepScheduledItem';
import MealScheduledItem from './MealScheduledItem';
import ExerciseScheduledItem from './ExerciseScheduledItem';

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
      activities: [],
      activitiesByDay: {"Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [],
      "Friday": [], "Saturday": [], "Sunday": [] },
    };
  },
  mounted() {
    this.loadSleeps();
    this.loadMeals();
    this.loadExercises();
    this.allActivities();
    this.sortActivitiesByDay();
    eventBus.$emit('postedActivity',(true));
    console.log(this.activitiesByDay);
  },
  created() {
    this.sortActivitiesByDay();
    eventBus.$on('postedActivity', () => {
      this.loadSleeps();
      this.loadMeals();
      this.loadExercises();
      this.allActivities();
      this.sortActivitiesByDay();
    });
    eventBus.$on('deletedActivity', () => {
      this.loadSleeps();
      this.loadMeals();
      this.loadExercises();
      this.allActivities();
      this.sortActivitiesByDay();
    });
  },

  methods: {
      loadSleeps: async function() {
        await axios.get('/api/activities/allSleeps').then((response) => { console.log(response); this.sleeps = response.data.sleeps; } );
      },
      loadMeals: async function() {
        await axios.get('/api/activities/allMeals').then((response) => { console.log(response); this.meals = response.data.meals; } );
      },
      loadExercises: async function() {
        await axios.get('/api/activities/allExercises').then((response) => { console.log(response); this.exercises = response.data.exercises; });
      },
      allActivities: function() {
          axios.get('/api/activities/allActivities').then((response) => { console.log(response); this.activities = response.data; });
      },
      sortActivitiesByDay: async function() {
        this.activitiesByDay = {"Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [],
        "Friday": [], "Saturday": [], "Sunday": []};

        let day;
        for(day in this.activitiesByDay) {
          console.log(this.meals.length);
          for(let i = 0; i < this.meals.length; i++) {
            if(day == this.meals[i].dayOfWeek) {
              this.activitiesByDay[day].push({time: this.meals[i].startTime, activityType: "meal", data: this.meals[i]})
            }
          }

          for(let j = 0; j < this.sleeps.length; j++) {
            if(day == this.sleeps[j].dayOfWeek) {
              this.activitiesByDay[day].push({time: this.sleeps[j].startTime, activityType: "sleep", data: this.sleeps[j]})
            }
          }

          for(let k = 0; k < this.exercises.length; k++) {
            if(day == this.exercises[k].dayOfWeek) {
              this.activitiesByDay[day].push({time: this.exercises[k].startTime, activityType: "exercise", data: this.exercises[k]})
            }
          }
        }
        console.log(this.activitiesByDay);
      },
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
