<!-- author Bernard Snowden -->

<template>
<!-- the submit event will no longer reload the page -->
  <div class="activityContainer">
    <form>
      <div class="titleContainer">
        <h2> Exercise</h2>
      </div>

        <div class='form-group'>
          <label for='name'> Name: </label>
          <input id='name'  type='text' name='name'>
        </div>

        <div class='form-group'>
          <label for='start-time'>Start Time:</label>
          <input type="text" v-model="startTime" list="times">
          <datalist id="times">
            <option v-for="startTime in times">{{startTime}}</option>
          </datalist>
        </div>

        <div class='form-group'>
          <label for='end-time'>End Time:</label>
          <input type="text" v-model="endTime" list="times">
          <datalist id="times">
            <option v-for="endTime in times">{{endTime}}</option>
          </datalist>
        </div>

        <div class="days-form-group">
          <div class='day-selection'>
            <label for='sun'>Sun</label>
            <input id='sun' type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='mon'>Mon</label>
            <input id='mon' type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='tues'>Tues</label>
            <input id='tues' type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='wed'>Wed</label>
            <input id='wed' type='checkbox'>
          </div>

          <div class='day-selection'>
            <label for='thurs'>Th</label>
            <input id='thurs' type='checkbox'>
          </div>

          <div class="day-selection">
            <label for='fri'>Fri</label>
            <input id='fri' type='checkbox'>
          </div>

          <div class="day-selection">
            <label for='Sat'>Sat</label>
            <input id='Sat' type='checkbox'>
          </div>
        </div>

      <button> Add </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "MealActivity",

  data() {
    return {
      startTime: '',
      endTime: '',
      times: ["0:00", "0:30", "1:00", "1:30","2:00", "2:30", "3:00", "3:30",
  "4:00", "4:30", "5:00", "5:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30",
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
  "13:30","14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30","19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
  "22:30", "23:00", "23:30"],
    };
  },

  methods: {

  }
};
</script>

<style scoped>
 .activityContainer {
   display: flex;
   height: 20%;
   width: 20%;
   background-color: silver;
   flex-direction: column;
   flex-wrap: wrap;
   padding: 10px;
   margin: 10px;
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
