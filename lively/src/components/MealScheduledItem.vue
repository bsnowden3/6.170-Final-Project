<template>
  <div class="component">
    <p>name: {{ meal.name}}</p>
    <p>userId: {{ meal.userId }}</p>
    <p>mealId: {{ meal.mealId }}</p>
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
};
</script>

<style scoped>

.component {
  width: 25%;
  background-color: whitesmoke;
  padding: 1rem;
}

</style>
