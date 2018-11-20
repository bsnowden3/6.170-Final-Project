<template>
  <div class="component">
    <p>exerciseId: {{ exercise.exerciseId }}</p>
    <p>userId: {{ exercise.userId }}</p>
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
    exercise: Object,
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
