<template>
  <div id="app">
    <TodoNavbar></TodoNavbar>
    <div class="d-flex w-100 h-100">
      <TodoSideBar></TodoSideBar>
      <div class="w-100">
        <div class="todo-main">
          <router-view/> <!-- router view에서 view를 가져온다-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoNavbar  from './components/todo/TodoNavbar.vue'
  import TodoSideBar from './components/todo/TodoSideBar.vue'
  
  export default {
    name: 'App',
    components: {
      'TodoNavbar':  TodoNavbar,
      'TodoSideBar': TodoSideBar,
    },
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

  .todo-main {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
</style>
