<template>


  <div id="logPage">
    <!-- TODO: Fix Form -->
    <!-- TODO: ERROR CORRECTION -->
    <!-- TODO: UPDATE FUNCTION TO GO TO USERS API -->
    <form id="loginBox">
      <div id="signLabel">
        Sign In
      </div>
        <div class="credBox">
          <label for="username">Username:</label>
          <input name="username" v-model.trim="username" id="username" placeholder="Username" required>
        </div>
        <div class="credBox">
          <label for="password">Password:</label>
          <input name="password" v-model.trim="password" id="password" placeholder="Password" required>
        </div>
        <div id="btnBox">
          <button v-on:click="logIn()">Log In</button>
          <button v-on:click="signUp()">Sign Up</button>
        </div>

    </form>

    <div v-if="errors.length" class="error-message">
      <b> Please correct the folowing error(s): </b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.id">
          {{error}}
        </li>
      </ul>
    </div>


  </div>

</template>

<script>
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";
import bcrypt from "bcrypt-nodejs";
import { setInterval } from "timers";


const saltRounds = 10;

export default {
  name: "LoginPage",

  data() {
    return {
      username: "",
      password: "",
      errors: []

    };
  },

  methods: {

    signUp: function () {
      let hash = bcrypt.hashSync(this.password);
      axios.post('/signUp', {'username': this.username, 'password': hash})
      .then(response => {
        serverBus.$emit('signed', true);
      })
      .catch((errorMessage) => {
        const fullResponse = errorMessage.response === undefined
          ? errorMessage
          : errorMessage.response;
        const abridgedResponse = {
          data: fullResponse.data,
          status: fullResponse.status,
          statusTest: fullResponse.statusText
        };
        let messageText = JSON.stringify(abridgedResponse.data);
        this.errors.push(JSON.parse(messageText).error);
      })
      .then( () => {
        this.resetForm();
        this.clearMessages();
      });
    },

    logIn: function() {
       axios.post('/login', {'username': this.username, 'password': this.password})
       .then(response => {
         serverBus.$emit('signed', true);
       })
       .catch(errorMessage => {
          const fullResponse = errorMessage.response === undefined
            ? errorMessage
            : errorMessage.response;
          const abridgedResponse = {
            data: fullResponse.data,
            status: fullResponse.status,
            statusTest: fullResponse.statusText
          };
          let messageText = JSON.stringify(abridgedResponse.data);
          this.errors.push(JSON.parse(messageText).error);
        })
        .then( () => {
          this.resetForm();
          this.clearMessages();
        });
    },

    resetForm: function() {
      this.username = ""
      this.password = ""
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.success = "";
      }, 5000)
    },

    showErrors: function(errorMessage) {
        const fullResponse = errorMessage.response === undefined
          ? errorMessage
          : errorMessage.response;
        const abridgedResponse = {
          data: fullResponse.data,
          status: fullResponse.status,
          statusTest: fullResponse.statusText
        };
        let messageText = JSON.stringify(abridgedResponse.data);
        this.errors.push(JSON.parse(messageText).error);
    }

  }
};
</script>

<style>

  #loginBox {
    /* display: flex; */
    /* flex-direction: column; */
    background-color: whitesmoke;
    height: 450px;
    width: 700px;
    /* align-items: center;
    padding: 30px; */

  }

  #logPage {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  

</style>
