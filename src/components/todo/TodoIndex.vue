<template>
  <div class="todo-container text-center">
    
    <TodoHeader v-on:createTodo="createTodo"></TodoHeader>
    <TodoList v-bind:todoItems="todos" v-on:deleteTodoData="deleteTodoData"></TodoList>

  </div>
</template>

<script>
  import TodoHeader from './TodoHeader.vue'
  import TodoList   from './TodoList.vue'
  
  export default {
    data() {
      return {
        index:     null,
        content:   null,
        createdAt: null,
        updatedAt: null,
        startDate: null,
        endDate:   null,
        todos:       [],
        todoIndices: [],
        todoList:  this.$firebase.firestore(),
      }
    },

    components: {
      'TodoHeader': TodoHeader,
      'TodoList':   TodoList,
    },

    async created () {
      console.log("created in!");
      
      await this.todoList.collection('todo_list').get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const data = {
            'id':         doc.id,
            'index':      doc.data().index,
            'content':    doc.data().content,
            'createdAt':  doc.data().createdAt,
            'startDate':  doc.data().startDate,
            'endDate':    doc.data().endDate
          }
          this.todos.push(data);
          this.todoIndices.push(doc.data().index);
        });
        console.log(this.todos);
      });
    },
    
    methods: {
      async createTodo (todoItems) {
        console.log("Todo Index Created in");
        
        const primaryKey  = this.getPrimaryKey();
        const currentDate = this.getCurrentDate();
        
        console.log(todo);
        await this.todoList.collection('todo_list').doc().set({
          'index':     primaryKey,
          'content':   todoItems.content,
          'createdAt': currentDate,
          'startDate': todoItems.startDate,
          'endDate':   todoItems.endDate
        });
        const todo = this.setTodoData(primaryKey, todoItems.content, currentDate, todoItems.startDate, todoItems.endDate);
        
        this.todos.push(todo);
        this.todoIndices.push(primaryKey);
        console.log("Todo Index Created end");
      },

      setTodoData (index, content, createAt, startDate, endDate) {
        return {  
          'index':     index,
          'content':   content,
          'createdAt': createAt,
          'startDate': startDate,
          'endDate':   endDate
        }
      },

      getPrimaryKey () {
        const max = this.todoIndices.length == 0 ? 0 : Math.max.apply(null, this.todoIndices) + 1 ;
        if (this.todoIndices.includes(max)) { max + 1 };
        return max;
      },

      getCurrentDate () {
        const date = new Date();
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      },

      deleteTodoData (arrayIndex, todoIndex) {
        console.log("TodoIndex delete Todo Data in");
        this.todos.splice(arrayIndex, 1);
        this.todoList.collection("todo_list").where("index", "==", todoIndex)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            })
          })
          .catch((error) => {
            console.error("Errorr removing document:", error);
          });
      },
    },

    // mounted는 Vue Component가 페이지에 끼워지고(mounted) 나서 호출되는 함수 이다.
    mounted() {
      console.log("created end!");
    },
  }
</script>

<style>
  .todo-container {
    margin: 0 auto;
    width: 700px;
  }
</style>
