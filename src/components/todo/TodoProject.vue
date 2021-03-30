<template>
  <div class="w-100">
    <div class="todo-main">
      <div class="project-header">
        <h5><strong>관리함</strong></h5>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoSideBar from './TodoSideBar.vue'

  export default {
    name: 'todo-project',

    components: {
      'TodoSideBar': TodoSideBar,
    }
  }
</script>

<style lang="" scoped>
  .project-header {
    padding: 96px 0 0 0;
  }
</style>
