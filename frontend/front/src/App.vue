<template>
  <div id="app">
    <AppHeader /> 
    <router-view/>
  </div>
</template>

<script>

import AppHeader from './components/AppHeader.vue'

export default {
  name: "app",
  components: {
    AppHeader
  }
 
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>