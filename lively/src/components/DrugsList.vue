<template>
  <div id="controlPanel">
    <div id="drugList">
      <div class="drugCard" v-if="drugs" v-bind:key='drug' v-for="drug in drugs">
        <div class="drugInfo">
          <div class="picHolder">{{ drug }}</div>
          <div class="infoBox">{{ descriptions[drug] }}</div>
        </div>
        <button v-on:click="removeDrug(drug)">Remove Drug</button>
      </div> 
    </div>
    <button v-on:click="saveDrugs()">Next Step</button>
  </div>

</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "DrugsList",

  data() {
    return {
      drugs: [],
      descriptions: {"Metformin": "descrip1",
                     "Sulfonylureas": "descrip2",
                     "Thiazolidinediones": "descrip3",
                     "GLP-1 receptor agonists": "descrip4",
                     "Prandin": "descrip5"}

    };
  },

  created() {
    eventBus.$on('select-drug', (data) => {
      this.drugs.push(data);
      this.drugs.sort();
    });
  },

  methods: {
    removeDrug: function(drug) {
      let newDrugs = [];

      for( var i = 0; i < this.drugs.length; i++){ 
        if ( this.drugs[i] != drug) {
           newDrugs.push(this.drugs[i])
        }
      }

      this.drugs = newDrugs;

      this.drugs.sort();
      eventBus.$emit('remove-drug', drug);
    },

    saveDrugs: function() {
      axios.post('/api/drugs/saveDrugs', {'data': this.drugs})
      .then(response => {
        serverBus.$emit('drugsSaved', this.drugs);
      })
      .catch((errorMessage) => {

      });
    }
  }
};
</script>

<style scoped>

</style>
