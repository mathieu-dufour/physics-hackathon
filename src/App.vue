<template>
  <div id="app" data-app>
    <SimulatorWrapper></SimulatorWrapper>
  </div>
</template>

<script>
import SimulatorWrapper from './components/SimulatorWrapper.vue'

export default {
  name: 'App',
  components: {
    SimulatorWrapper
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
