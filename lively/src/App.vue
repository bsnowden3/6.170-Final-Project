<template>
  <div id="app" class=''>
    <!-- Children Components -->
    <div v-if="loginPage" class="mainView">
      <LoginPage/>
    </div>
    <div v-else>
      <dashboard/>
    </div>

  </div>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";
import Dashboard from "./components/Dashboard";
import { eventBus } from "./main";

export default {
  name: "app",
  components: {
    LoginPage,
    Dashboard
  },
  data() {
    return {
      loginPage: true,

    };
  },

  created: function(){
    
    /**
     * check the database to see if use session exists, so on refresh the UI doesn't look like the user
     * is loggged out
     */
    axios.get('/api/users/checkSession')
      .then(res =>{
          console.log("session checking");
          console.log(res);
          if(res.data == "true") {
              this.loginPage = false;
          }else{
            this.loginPage = true;
          }
      })
      .catch((e) => {
          console.log("session call didn't work");
      });
    
    
    
    /**
     * updating ui after creating user or logging in user
     */
    eventBus.$on("signed-in", (username) =>{
        this.loginPage = false;
    });

    eventBus.$on("signOut-success", () =>{
        this.loginPage = true;
    });


        eventBus.$on('test', (data) => {
        console.log("TEST")
    //   this.drugs.push(data);
    //   this.drugs.sort();
    });

  }
};



</script>

<!-- global styles -->
<style>

#app {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.mainView {
  display: flex;
  height: 85%;
  width: 100%;
  top:35%;
  position:absolute;
  flex-direction: column;
  align-items: center;
}
.dashboard{
  width: 100%;
}
.navbar{
    top:0%;
    left:0%;
    width: 100%;
    height:8vh;
    background:whitesmoke;
    margin-bottom:10px;
    position: absolute;
    padding: 0;

}

.navbar-list{
    list-style-type: none;
    font-size:18px;
    margin:0;
    padding:0;
}
  

.success-message {
  color: green;
  margin:2em;
}
.error-message {
  color: red;
  margin: 2em;
}


form {
  border:1px white solid;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(255,255,255,.1);
  background-color: white;
  border-radius: 4px;
}
.form-group{
  margin:0.5em;
}
.form-input {
  display: block;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button{
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  margin:3px;
  font-size:14px;
}
.button{
  cursor: pointer;
  border-radius: 4px;
  font-size:16px;
}
.remove-button{
  background-color:red;
  color:white;
  margin:5px;
}

.component {
  padding: 1rem;
}

.step-header{
  text-align:center;
  color:white;
  margin:20px;
  font-size:1.8em;
}

.activityContainer {
  display: flex;
  height: 20%;
  width: 20%;
  background-color: lavenderblush;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  margin-left: 20px;
  margin-right:20px;
  border-radius:5px;
}

.titleContainer{
  text-align: center;
}

</style>

<style scoped>

  h1 {
    height: 15%;
    width: 100%;
  }

</style>
