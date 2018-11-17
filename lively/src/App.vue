<template>
  <div id="app" class=''>
    <h1>Lively</h1>
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
  flex-direction: column;
  align-items: center;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightblue;
  height: 100vh;
  width: 100vw;
  margin: 0px !important;
  padding: 0px !important;
}

.error-message {
  color: red;
  margin: 2em;
}

</style>

<style scoped>

  h1 {
    height: 15%;
    width: 100%;
  }

</style>
