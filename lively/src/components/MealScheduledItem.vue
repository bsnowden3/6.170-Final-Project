<template>
  <div class="component">
    <div class="removeButtonContainer">
      <button class="remove-button" v-on:click="removeItem(meal.mealId)"> Remove </button>
    </div>
    <p>Day: {{meal.dayOfWeek}} </p>
    <p>Start Time: {{ meal.startTime }}</p>
    <p>EndTime: {{ meal.endTime }}</p>
  </div>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "MealScheduledItem",

  props: {
    meal: Object,
  },

  methods: {
    removeItem: function(mealId) {
      console.log("ExerciseScheduledItem", mealId);
      const deletedMeal = { mealId: mealId };
      axios.delete("/api/activities/removeMeal", { data: deletedMeal })
      .then((response) => {
        eventBus.$emit('deletedActivity', []);
      })
      .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>

.component {
  width: auto;
  background-color: whitesmoke;
  padding: 1rem;
  border-radius: 5px;
  margin: 5px;
}

.removeButtonContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

</style>
