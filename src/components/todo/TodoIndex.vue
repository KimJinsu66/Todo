<template>
  <div>
    <div class="d-flex w-100 h-100">
      <TodoSideBar></TodoSideBar>
      <div class="todo-main">
        <div class="date-header d-flex mt-5">
          <div class="date-box d-flex">
            <h5><strong>오늘</strong></h5>
            <small v-bind:style="{fontWeight: 400, marginLeft: '6px', paddingTop: '3px'}">{{ currentDate }}</small>
          </div>

          <!-- 구현 예정 -->
          <div class="sort-box"></div>
        </div>
        
        <TodoList v-bind:todoItems="todos" v-on:deleteTodoData="deleteTodoData"></TodoList>
        <TodoHeader v-on:createTodo="createTodo"></TodoHeader>
      </div>
    </div>
  </div>
</template>

<script>
  import TodoHeader  from './TodoHeader.vue'
  import TodoList    from './TodoList.vue'
  import TodoSideBar from './TodoSideBar.vue'
  
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
        todoList:    this.$firebase.firestore(),
        currentDate: this.getCurrentDate(),
      }
    },

    components: {
      'TodoHeader':  TodoHeader,
      'TodoList':    TodoList,
      'TodoSideBar': TodoSideBar,
    },

    async created () {
      await this.todoList.collection('todo_list').get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
          const data = {
            'id':         doc.id,
            'index':      doc.data().index,
            'content':    doc.data().content,
            'createdAt':  doc.data().createdAt,
            'endDate':    doc.data().endDate
          }

          this.todos.push(data);
          this.todoIndices.push(doc.data().index);
        });
      });
    },
    
    methods: {
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
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },

      deleteTodoData (arrayIndex, todoIndex) {
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

<style scoped>
  .todo-container {
    margin: 0 auto;
    width: 700px;
  }
  .todo-main {
    // margin-left: 300px;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
  }
</style>
