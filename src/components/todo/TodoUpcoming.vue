<template>
  <div class="w-100">
    <div class="todo-main">
      <div class="upcoming-header">
        <h5><strong>{{ currentMonth }}월 {{ currentYear }}</strong></h5>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoSideBar from './TodoSideBar.vue'
  export default {
    name: 'todo-upcoming',
    date () {
      return {
        currentYear:  null,
        currentMonth: null,
        currentDate:  null,
      } 
    },

    components: {
      'TodoSideBar': TodoSideBar,
    },

    created () {
      this.getCurrentDate();
    },

    methods: {
      getCurrentDate () {
        const currentDate = new Date();
        this.currentYear  = currentDate.getFullYear();
        this.currentMonth = currentDate.getMonth() + 1;
        this.currentDate  = currentDate.Date();
      },
    },

  }
</script>

<style scoped>
  .upcoming-header {
    padding: 96px 0 0 0;
  }
</style>
