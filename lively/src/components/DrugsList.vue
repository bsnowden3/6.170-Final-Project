<template>
  <div id="controlPanel">
    <div id="drugList">
      <div class="drugCard" v-if="drugs" v-bind:key='drug' v-for="drug in drugs">
        <div class="drugInfo">
          <div class="picHolder">{{ drug }}</div>
          <div class="infoBox">{{ descriptions[drug] }}</div>
        </div>
        <button class="remove-button button" v-on:click="removeDrug(drug)">Remove Drug</button>
      </div> 
    </div>
    <div>
        <button class="button step-button-left" v-on:click="goBack()">Back</button>
        <button class="button step-button-right" v-on:click="saveDrugs()">Next Step</button>
    </div>
    
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
      drugData:{},
      descriptions: {"Metformin": "Side-effects include: Nausea, Vomiting, Diarrhea, Chills, Heartburn",
                     "Sulfonylureas": "Side-effects include: Hepatitis, Leukopenia, Porphyria",
                     "Thiazolidinediones": "Side-effects include: Congestive Heart Failure, Edema, Fractures",
                     "GLP-1 Receptor Agonists": "Side-effects include: Immunogenecity, Hypoglycemia",
                     "Prandin": "Side-effects include: Hypoglycemia, Weight Gain"}

    };
  },

  created() {
    eventBus.$on('select-drug', (data) => {
      this.drugs.push(data);
      this.drugs.sort();
    });

      // axios.get('/api/drugs/getAllDrugs')
      // .then(response => {
      //     let total = Object.keys(res.data);
      //   //   for (let x = 0; x < total.length; x++) {
      //   //       this.
      //   //   }
      //     this.drugData = res.data

      // })
      // .catch((errorMessage) => {

      // });


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
      // axios.post('/api/drugs/saveDrugs', {'data': this.drugs})
      // .then(response => {
        
      // })
      // .catch((errorMessage) => {

      // });

      eventBus.$emit('drugsSaved', this.drugs);
    },
    goBack: function() {
      eventBus.$emit('drugs-back', true);
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
    height: 180px;
    width: 250px;
    margin: 20px;
    flex: 0 0 auto;
    border: black 1px solid;
    border-radius: 4px;
  }

  #controlPanel{
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
  }

  .picHolder {
    /* height: 60%;
    width: 100%; */
    margin: 10px;
    /* border: black 1px solid; */
  }

  .infoBox{
    height: 65%;
    width: 90%; 
    /* border: black 1px solid;  */
  }

  .drugInfo {
    display: flex;
    height: 60%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .step-button-right{
    float:right;
  }
  .step-button-left{
    float:left;
  }
 
</style>
