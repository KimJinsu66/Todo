<template>
  <transition-group name="list" tag="div">
    <div class="todo-list-container border mb-3 p-2" v-for="(todo, index) in todoItems" :key="index">
      <div class="d-flex flex-row-reverse bd-highlight mr-2">
      
        <span class="p-1 bd-highlight" type="button" @click="successTodo(todo, index, todo.index)">
          <i class="far fa-check-circle fa-lg" aria-hidden="true"></i>
        </span>

        <span class="p-1 bd-highlight" type="button" @click="deleteTodo(index, todo.index)">
          <i class="far fa-trash-alt fa-lg" aria-hidden="true"></i>
        </span>

        <span class="p-1 bd-highlight" type="button">
          <router-link
              v-bind:to="{ name: 'todo-show', params: { todo_id: todo.index } }">
            <i class="fas fa-info-circle fa-lg mr-2" aria-hidden="true"></i>
          </router-link>
        </span>

      </div>

      <div class="d-flex">
        <div class="p-2 todo-icon-box">
          <i class="fas fa-clipboard-list fa-2x"></i>
        </div>
        
        <div>
          <div class="p-1 fs-4">
            <p>{{todo.content}}</p>
          </div>
          
          <div class="p-1 fs-6">
            {{ todo.startDate }} ~ {{ todo.endDate }}
          </div>
        </div>

      </div>
    </div>
  </transition-group>
</template>

<script>
  export default {
    props: ['todoItems'],
    data() {
      return {

      }
    },
    
    methods: {
      successTodo (removeTodo, arrayIndex, todoIndex) {
        this.insertFinishTodoData(removeTodo);
        this.deleteTodoData(arrayIndex, todoIndex);
      },

      insertFinishTodoData (removeTodo) {
        const doc = removeTodo.content + "|" + removeTodo.createdAt;
        
        this.$firebase.firestore().collection("finishTodo").doc(doc).set({
          content:   removeTodo.content,
          createdAt: removeTodo.createdAt,
          startDate: removeTodo.startDate,
          endDate:   removeTodo.endDate
        });
      },

      deleteTodo (arrayIndex, todoIndex) {
        if(confirm('Are you sure?')) {
          this.deleteTodoData(arrayIndex, todoIndex);
        }
      },

      deleteTodoData (arrayIndex, todoIndex) {
        this.$emit('deleteTodoData', arrayIndex, todoIndex);
      },
    },
  }
</script>

<style scope>
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
