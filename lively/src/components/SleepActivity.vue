<!-- author Bernard Snowden -->

<template>
<!-- the submit event will no longer reload the page -->
  <div class="activityContainer">
    <div>
      <div class="titleContainer">
        <h2 class="list-header"> Sleep </h2>
      </div>

        <div class='form-group'>
          <label for='start-time'>Wake Up Time:</label>
          <input type="text" v-model="startTime" list="times">
          <datalist id="times">
            <option v-for="startTime in times">{{startTime}}</option>
          </datalist>
        </div>

        <div class="days-form-group">
          <div class='day-selection'>
            <label for='sun'>Sun</label>
            <input id='sun' value="Sunday"  v-model="checkedDays" type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='mon'>Mon</label>
            <input id='mon' value="Monday" v-model="checkedDays" type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='tues'>Tues</label>
            <input id='tues' value="Tuesday" v-model="checkedDays" type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='wed'>Wed</label>
            <input id='wed' value="Wednesday" v-model="checkedDays" type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='thurs'>Th</label>
            <input id='thurs' value="Thursday" v-model="checkedDays" type='checkbox'>
          </div>

          <div class="day-selection">
            <label for='fri'>Fri</label>
            <input id='fri' value="Friday" v-model="checkedDays" type='checkbox'>
          </div>

          <div class="day-selection">
            <label for='Sat'>Sat</label>
            <input id='Sat' value="Saturday" v-model="checkedDays" type='checkbox'>
          </div>
        </div>

      <button v-on:click="addSleep"> Add </button>
      <div class="success" v-if="successMessage">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "SleepActivity",

  data() {
    return {
      startTime: '',
      successMessage: '',
      errorMessage: '',
      checkedDays: [],
      times: ["0:00", "0:30", "1:00", "1:30","2:00", "2:30", "3:00", "3:30",
  "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30",
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
  "13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30","19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
  "22:30", "23:00", "23:30"],
    };
  },

  created() {
    eventBus.$on("generateDefaultSchedule", () => {
      this.generateQuickSleepSchedule();
    });
  },

  methods: {
    addSleep: function() {
      const sleepObj = {
        startTime: this.startTime,
        daysOfWeek: this.checkedDays,
      };

      axios.post("/api/activities/addsleep", sleepObj)
      .then(response => {
        this.successMessage = "Successfully added sleep!"
        console.log(response);
        eventBus.$emit('postedActivity', (true));
        setTimeout(this.clearEntries(), 3000);
      })
      .catch(error => {
        console.log(error.response)
      });
    },
    generateQuickSleepSchedule: function() {
      const sleepObj = {
        startTime: "6:00",
        daysOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      };

      axios.post("/api/activities/addsleep", sleepObj)
      .then(response => {
        console.log(response);
        eventBus.$emit('postedActivity', (true));
      })
      .catch(error => {
        console.log(error.response)
      });
    }
  }
};
</script>

<style scoped>
/* .titleContainer{
  text-align: center;
}
.activityContainer {
  display: flex;
  height: 20%;
  width: 20%;
  background-color: lavenderblush;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  margin-left: 20px;
} */

.success {
  color: green,
}

/* .titleContainer {
  margin-left: 25px;
} */

.form-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.day-selection {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 3px;
}

.days-form-group {
  display: flex;
  flex-wrap: wrap;
}

label {
  margin-right: 0.5rem;
}

form {
  width: fit-content;
  margin-left: 15px;
}

input[type='text'], input[type='url'] {
  width: auto;
}

form > * {
  margin-bottom: 1rem;
}

</style>
