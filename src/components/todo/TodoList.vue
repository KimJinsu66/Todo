<template>
  <transition-group name="list" tag="div">
    <div 
      class="todo-box border-bottom mb-2 p-2" 
      v-for="(todo, index) in todoItems" 
      :key="index"
    >
      <div class="d-flex flex-row-reverse bd-highlight mr-2">
      
        <span class="p-1 bd-highlight" type="button" @click="successTodo(todo, index, todo.index)">
          <i class="far fa-check-circle fa-lg" aria-hidden="true"></i>
        </span>

        <span class="p-1 bd-highlight" type="button" @click="deleteTodo(index, todo.index, todo.endDate)">
          <i class="far fa-trash-alt fa-lg" aria-hidden="true"></i>
        </span>

        <span class="p-1 bd-highlight" type="button">
          <router-link
              v-bind:to="{ name: 'todo-show', params: { todo_id: todo.index } }">
            <i class="fas fa-info-circle mr-2" aria-hidden="true"></i>
          </router-link>
        </span>

      </div>

      <div class="row">
        <div class="col-md-1 pt-1 todo-icon-box text-center">
          <i class="fas fa-clipboard-list fa-lg"></i>
        </div>
        
        <div class="col-md-11 text-left d-flex justify-content-between ">
          <div class="fs-5 pt-1">
            {{todo.content}}
          </div>
          
          <div class="date-box fs-6">
            <em>{{ todo.startDate }} ~ {{ todo.endDate }}</em>
          </div>
        </div>

      </div>
    </div>
  </transition-group>
</template>

<script>
  export default {
    props: ['todoItems',],
    
    data() {
      return {
        
      }
    },
    
    methods: {
      successTodo (removeTodo, arrayIndex, todoIndex) {
        this.insertFinishTodoData(removeTodo);
        this.deleteTodoData(arrayIndex, todoIndex, removeTodo.endDate);
      },

      insertFinishTodoData (removeTodo) {
        const doc = removeTodo.content + "|" + removeTodo.createdAt;
        
        this.$firebase.firestore().collection("finishTodo").doc(doc).set({
          content:   removeTodo.content,
          createdAt: removeTodo.createdAt,
          startDate: removeTodo.createdAt,
          endDate:   removeTodo.endDate
        });
      },

      deleteTodo (arrayIndex, todoIndex, todoEndDate) {
        if(confirm('Are you sure?')) {
          this.deleteTodoData(arrayIndex, todoIndex, todoEndDate);
        }
      },

      deleteTodoData (arrayIndex, todoIndex, todoEndDate) {
        this.$emit('deleteTodoData', arrayIndex, todoIndex, todoEndDate);
      },
    },
  }
</script>

<style scoped>
  a {
    color: black !important;
  }
  
  .todo-list-container {
    border-radius:
  }

  .date-box {
    padding: 15px 8px 0 0;
  }

  .todo-icon-box {
    padding-left: 24px;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
