<template>
  <div class="component">
    <div class="removeButtonContainer">
      <button v-on:click="removeItem(exercise.exerciseId)"> Remove </button>
    </div>
    <p> Name: {{exercise.name}} </p>
    <p> Day: {{exercise.dayOfWeek}} </p>
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

  methods: {
    removeItem: function(exerciseId) {
      console.log("ExerciseScheduledItem", exerciseId);
      const deletedExercise = { exerciseId: exerciseId };
      axios.delete("/api/activities/removeExercise", { data: deletedExercise })
      .then((response) => {
        eventBus.$emit('deletedActivity', []);
      })
      .catch(error => console.log(error));
    },
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
