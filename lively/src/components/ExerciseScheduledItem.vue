<template>
  <div class="short-list-item component">
    <p>Name: {{ exercise.name }}</p>
    <p>mealId: {{ exercise.mealId }}</p>
    <p>Start Time: {{ exercise.startTime }}</p>
    <p>End Time: {{ exercise.endTime }}</p>
  </div>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "ExerciseScheduledItem",

  props: {
    exercise: []
  },
};
</script>
