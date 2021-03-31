<template>
  <div>
    <div class="date-header d-flex mt-5">
      <div class="date-box d-flex" v-if="outOfDateTodos.length != 0">
        <h5><strong>기한이 지난</strong></h5>
      </div>
      <div class="sort-box"></div>
    </div>
    <TodoList v-bind:todoItems="outOfDateTodos" v-on:deleteTodoData="deleteTodoData"></TodoList>
    
    <div class="date-header d-flex mt-5">
      <div class="date-box d-flex">
        <h5><strong>오늘</strong></h5>
        <small v-bind:style="{fontWeight: 400, marginLeft: '6px', paddingTop: '3px'}">
          {{ currentDate }}
        </small>
      </div>
      <div class="sort-box"></div>
    </div>
    
    <TodoList v-bind:todoItems="todos" v-on:deleteTodoData="deleteTodoData"></TodoList>
    <TodoInput v-on:createTodo="createTodo"></TodoInput>
  </div>
</template>

<script>
  import TodoInput   from './TodoInput.vue'
  import TodoList    from './TodoList.vue'
  import EventBus    from '../common/eventBus.js'

  export default {
    data() {
      return {
        index:        null,
        content:      null,
        createdAt:    null,
        updatedAt:    null,
        startDate:    null,
        endDate:      null,
        todos:          [],
        todoIndices:    [],
        outOfDateTodos: [],
        todoList:    this.$firebase.firestore(),
        currentDate: this.getCurrentDate(),
      }
    },

    components: {
      'TodoInput': TodoInput,
      'TodoList':  TodoList,
    },

    async created () {
      console.log(this.todoList);
      await this.todoList.collection('todo_list').orderBy("endDate").get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          const data = {
            'id':         doc.id,
            'index':      doc.data().index,
            'content':    doc.data().content,
            'createdAt':  doc.data().createdAt,
            'endDate':    doc.data().endDate,
          }

          this.todos.push(data);
          this.todoIndices.push(doc.data().index);
        });
      });
      
      this.extractOutOfDateTodos(this.todos);
    },
    
    methods: {
      extractOutOfDateTodos (todos) {
        const currentDate = new Date(this.currentDate);
        this.outOfDateTodos = todos.filter( todo => new Date(todo.endDate) < currentDate  );
        this.todos          = todos.filter( todo => new Date(todo.endDate) >= currentDate );
      },

      async createTodo (todoItems) {
        console.log("Todo Index Created in");
        
        const primaryKey  = this.getPrimaryKey();
        const currentDate = this.getCurrentDate();
        
        await this.todoList.collection('todo_list').doc().set({
          'index':     primaryKey,
          'content':   todoItems.content,
          'createdAt': currentDate,
          'endDate':   todoItems.endDate
        });

        const todo = this.setTodoData(primaryKey, todoItems.content, currentDate, todoItems.endDate);
        
        this.todos.push(todo);
        this.todoIndices.push(primaryKey);
      },

      setTodoData (index, content, createAt, endDate) {
        return {  
          'index':     index,
          'content':   content,
          'createdAt': createAt,
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
        let day = date.getDate();
        console.log(("00"+day.toString()).slice(-2));
        return `${date.getFullYear()}-${date.getMonth() + 1}-${("00"+day.toString()).slice(-2)}`;
      },

      isTodosData (todoEndDate) {
        const currentDate = new Date(this.currentDate);
        console.log(currentDate);
        return new Date(todoEndDate) < currentDate ;
      },

      deleteTodoData (arrayIndex, todoIndex, todoEndDate) {
        this.isTodosData(todoEndDate) ? this.outOfDateTodos.splice(arrayIndex, 1) : this.todos.splice(arrayIndex, 1) ; 
        this.deleteFirebaseData(todoIndex);      
      },

      deleteFirebaseData (todoIndex) {
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

<style scoped>
</style>
