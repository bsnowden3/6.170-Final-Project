<template>


  <div id="drugPage">
    <h2 class="step-header">Step 1: Add your prescribed drugs</h2>
    <div id="drugSelection">
      <div id="selectionBackground">
        <select id="selectedDrugs">
          <option v-bind:key='drug' v-for="drug in drugs">
            {{ drug }}
          </option>
        </select>
        <button class="button" v-on:click="addDrug()">Add Drug</button>
      </div>

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
      drugs: ["GLP-1 Receptor Agonists",
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


 axios.get('/api/drugs/getUserDrugs')
              .then(response => {
                  let drugs = response.data;
                  let newDrugs = [];
                  for(let i = 0; i < drugs.length; i++) {
                    let drug = drugs[i].drugId;
                    this.putDrug(drug);
                  }


              })
              .catch((errorMessage) => {

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

    },

    putDrug: function(drug) {

      let selection = drug;

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

  #drugSelection {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #selectionBackground {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px; 
    min-height: 75px;
    /* max-width: 250px; */
  }

  #steps {
    background-color: grey;
  }

   #selectedDrugs{
    font-size:20px;
    margin:10px;
  }


</style>
