<template>
  <div>
    <h3>All Shorts</h3>
    <div v-if='success' class="success-message">
      {{ success }}
    </div>
    <div v-if='error' class="error-message">
      {{ error }}
    </div>

    <div class="short-list">
      <!-- TODO: Step 3: View All Shorts -->
      <shortListItem v-for="short in shorts" v-bind:key='short.name' v-bind:short='short'/>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

import ShortListItem from "./ShortListItem";

export default {
  name: "ShortList",

  data() {
    return {
      error: "",
      success: "",
      shorts: []
    };
  },
  components:{
    ShortListItem
  },
  created: function() {
    // TODO: Step 4 - Refresh Shorts

  },

  mounted: function() {
    this.loadShorts();
  },

  methods: {
    loadShorts: function() {
      // TODO: Step 3 - View All Shorts
      axios.get('/api/shorts')
      .then((res) =>{
        this.shorts = res.data;
        //console.log(this.shorts);
      });
    },

    clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
.short-list {
  display: flex;
  flex-wrap: wrap;
}

.short-list > * {
  margin: 0.5rem;
}
</style>
