<template>
  <div class="app">
    <AppHeader />
    <DataDisplay />
  </div>
</template>

<script>

import AppHeader from '../components/AppHeader.vue'
import DataDisplay from '../components/DataDisplay.vue';


export default {
  name: 'App',
  components: {
    AppHeader,
    DataDisplay
  }
}
</script>

<style>
/* Add your styles here */
</style>