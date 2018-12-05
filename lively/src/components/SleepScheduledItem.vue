<template>
    <div class="component">
      <div class="removeButtonContainer">
        <button <button v-on:click="removeItem(sleep.sleepId)" > Remove </button>
      </div>
      <p>Wake Up Time: {{ sleep.startTime }}</p>
      <p>Day: {{ sleep.dayOfWeek }}</p>
    </div>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "SleepScheduledItem",

  props: {
    sleep: Object,
  },

  methods: {
    removeItem: function(sleepId) {
      console.log("ExerciseScheduledItem", sleepId);
      const deletedSleep = { sleepId: sleepId };
      axios.delete("/api/activities/removeSleep", { data: deletedSleep })
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
