<template>
  <div id="app">
    <img src="./assets/vuejs.png" style="width: 700px; height: 300px;">
    <router-view/> <!-- router view에서 view를 가져온다-->

  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    console.log(this.$firebase);
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .todo-container {
    margin: 0 auto;
    width: 700px;
  }
</style>
