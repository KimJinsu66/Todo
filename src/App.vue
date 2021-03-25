<template>
  <div id="app">
    <TodoNavbar></TodoNavbar>
    <router-view/> <!-- router view에서 view를 가져온다-->

  </div>
</template>

<script>
  import TodoNavbar from './components/todo/TodoNavbar.vue'
  export default {
    name: 'App',
    components: {
      'TodoNavbar': TodoNavbar,
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    // text-align: center;
    color: #2c3e50;
    // margin-top: 60px;
  }

  .todo-container {
    margin: 0 auto;
    width: 700px;
  }
</style>
