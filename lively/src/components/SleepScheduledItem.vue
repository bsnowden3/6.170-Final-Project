<template>
  <div class="component">
    <p>sleepId: {{ sleep.sleepId }}</p>
    <p>userId: {{ sleep.userId }}</p>
    <p>Start Time: {{ sleep.startTime }}</p>
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
};
</script>

<style scoped>

.component {
  width: 25%;
  background-color: whitesmoke;
  padding: 1rem;
}

</style>
