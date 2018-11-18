<template>
     <form class="component">
          <h1 class="logoStyle">Lively</h1>
          <div class="form-group">
              <label for="username">Username</label>
              <input class="form-input" id="username" v-model.trim="username" type="text" name="username" required>

              <label for="password">Password</label>
              <input class="form-input" id="password" v-model.trim="password" type="password" name="password" required>
          </div>
          <div class="form-group">
              <input class="form-button" type="button" value="Login" v-on:click="logIn()">
              <input class="form-button" type="button" value="Sign Up" v-on:click="signUp()">
          </div>
      
         <div v-if="success" class="success-message">
             {{success}}
         </div>

        <div v-if="errors.length" class="error-message">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" v-bind:key="error.id">
                    {{error}}
                </li>
            </ul>
        </div>
     </form>

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
      success: "",
      errors: []

    };
  },

  methods: {

    signUp: function () {
      let hash = bcrypt.hashSync(this.password);
      axios.post('/signUp', {'username': this.username, 'password': hash})
      .then(response => {
        this.success = "User created successfully!"
        eventBus.$emit('signed-in', this.username);
        console.log(response);
      })
      .catch(errorMessage => {
        const fullResponse = errorMessage.response === undefined
            ? errorMessage
            : errorMessage.response;
        const abridgedResponse = {
            data: fullResponse.data,
            status: fullResponse.status,
            statusText: fullResponse.statusText,
        };
        let messageText = JSON.stringify(abridgedResponse.data);
        this.errors.push(messageText);
        console.log("------");
        console.log(errorMessage);
            })
      .then( () => {
        this.resetForm();
        this.clearMessages();
      });
    },

    logIn: function() {
       axios.post('/login', {'username': this.username, 'password': this.password})
       .then(response => {
          this.success = "User signed-in successfully!"
        eventBus.$emit('signed-in', this.username);
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
          this.errors.push(messageText);
          console.log("------");
          console.log(errorMessage);
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

  }
};
</script>

<style>

  .credBox {
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

  .logoStyle{
    font-style: italic;
    font-weight: bold;
    text-align: center;
    font-family: cursive;
  }

</style>
