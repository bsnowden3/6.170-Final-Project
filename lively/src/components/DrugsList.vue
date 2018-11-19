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

  #drugList {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .drugCard {
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 250px;
    margin: 20px;
    flex: 0 0 auto;
    border: black 4px solid;
    
  }

  #controlPanel{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .picHolder {
    height: 25%;
    width: 80%;
    margin-bottom: 4px;
    border: black 1px solid;
  }

  .infoBox{
    height: 65%;
    width: 90%;
    border: black 1px solid;
  }

  .drugInfo {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>
