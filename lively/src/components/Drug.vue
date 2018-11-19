<template>


  <div id="drugPage">

    <div id="drugSelection">
      <select id="selectedDrugs">
        <option v-bind:key='drug' v-for="drug in drugs">
          {{ drug }}
        </option>
      </select>
      <button v-on:click="addDrug()">Add Drug</button>

    </div>

    <DrugsList></DrugsList>



  </div>

</template>

<script>
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";
import DrugsList from "./DrugsList"



export default {
  name: "Drug",
  components: {
    DrugsList
  },

  data() {
    return {
      drugs: ["GLP-1 receptor agonists",
              "Metformin",
              "Prandin",
              "Sulfonylureas",
              "Thiazolidinediones"
              ],

    };
  },

  created() {
    eventBus.$on('remove-drug', (data) => {
      this.drugs.push(data);
      this.drugs.sort();
    });
  },

  methods: {
    addDrug: function() {
      var index = document.getElementById("selectedDrugs").selectedIndex;
      let option = document.getElementById("selectedDrugs").options;
      let selection = option[index].text

      let newDrugs = [];

      for( var i = 0; i < this.drugs.length; i++){ 
        if ( this.drugs[i] != selection) {
           newDrugs.push(this.drugs[i])
        }
      }

      this.drugs = newDrugs;

      this.drugs.sort();

      eventBus.$emit('select-drug', selection);

    }
  }
};
</script>

<style>



  

</style>
