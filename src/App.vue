<template>
  <hotNews/>
</template>

<script>
import hotNews from './hotNews/index.vue'

export default {
  name: 'App',
  components: {
    hotNews
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
  width: 60vw;
  margin: 30px auto;
}
</style>
<!-- 移动端适配 -->
<style>
@media screen and (max-width: 768px) {
  #app {
    width: 90vw;
    margin: 20px auto;
  }
}
</style>
