<template>
  <div id="app" class=''>
    <!-- Children Components -->
    <div v-if="loginPage" class="mainView">
      <LoginPage/>
    </div>
    
  </div>
</template>

<script>
import LoginPage from "./components/LoginPage.vue";

export default {
  name: "app",
  components: {
    LoginPage,

  },
  data() {
    return {
      loginPage: true,

    };
  },
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

.component {
  padding: 1rem;
}





</style>

<style scoped>

  h1 {
    height: 15%;
    width: 100%;
  }

</style>
