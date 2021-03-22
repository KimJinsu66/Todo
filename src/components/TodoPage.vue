<template>
  <div class="todo-container text-center">
    
    <div class="my-3">
      <div class="input-group mb-3">
        <span class="input-group-text input-group-box" id="inputGroup-sizing-default">Content</span>
        <input type="text" 
          class="form-control"
          placeholder="할일을 입력하세요"
          v-model="content"
          v-on:keyup.enter="createTodo()"
        >
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text input-group-box" id="inputGroup-sizing-default">Start</span>
        <input type="datetime-local" class="form-control" v-model="startDate">  
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text input-group-box" id="inputGroup-sizing-default">End</span>
        <input type="datetime-local" class="form-control" v-model="endDate">
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-success" type="button" @click="createTodo()">추가</button>
      </div>
    </div>

    <transition-group name="list" tag="div">
      <div class="todo-list-container border mb-3 p-2" v-for="(todo, index) in todos" :key="todo">
        <div class="d-flex flex-row-reverse bd-highlight mr-2">
        
          <span class="p-1 bd-highlight" type="button" @click="successTodo(index, todo.index)">
            <i class="far fa-check-circle fa-lg" aria-hidden="true"></i>
          </span>

          <span class="p-1 bd-highlight" type="button" @click="deleteTodo(index, todo.index)">
            <i class="far fa-trash-alt fa-lg" aria-hidden="true"></i>
          </span>

          <span class="p-1 bd-highlight" type="button">
            <router-link
                v-bind:to="{ name: 'todo-detail', params: { todo_id: todo.index } }">
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
              <p>{{todo.content}} {{ todo.index }}</p>
            </div>
            
            <div class="p-1 fs-6">
              {{ todo.startDate }} ~ {{ todo.endDate }}
            </div>
          </div>

        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
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
    
    async created () {
      console.log("created in!");
      
      await this.$firebase.firestore().collection('todo_list').get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
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
      });
    },

    methods: {
      async createTodo () {
        
        const primaryKey  = this.getPrimaryKey();
        const currentDate = this.getCurrentDate();
        const addData     = this.setData(primaryKey, 
                                         this.content, 
                                         currentDate, 
                                         this.convertDateTime(this.startDate), 
                                         this.convertDateTime(this.endDate)
                                        );
        
        await this.todoList.collection("todo_list").doc().set(
          addData
        );

        const data = this.setData(primaryKey, this.content, currentDate, this.startDate, this.endDate);
        this.todos.push(data);
        this.todoIndices.push(primaryKey);
      },

      setData (index, content, createAt, startDate, endDate) {
        return {
          index:     index,
          content:   content,
          createdAt: createAt,
          startDate: startDate,
          endDate:   endDate
        };
      },

      convertDateTime (dateTime) {
        if (dateTime === null) return "";

        return dateTime.replace("T", " ");
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

      successTodo (arrayIndex, todoIndex) {
        const removeTodo = this.todos[arrayIndex];
        const doc = removeTodo.content + "|" + removeTodo.createdAt;
        
        this.todoList.collection("finishTodo").doc(doc).set({
          content:   removeTodo.content,
          createdAt: this.getCurrentDate(),
          startDate: removeTodo.startDate,
          endDate:   removeTodo.endDate
        });
        
        this.deleteTodoData(arrayIndex, todoIndex);
      },

      deleteTodo (arrayIndex, todoIndex) {
        if(confirm('Are you sure?')) {
          this.deleteTodoData(arrayIndex, todoIndex);
        }
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

<style scope>
  .todo-container {
    margin: 0 auto;
    width: 700px;
  }

  .dropdown-size {
    font-size: 12px; 
    line-height: 1;
  }

  .date-fonte {
    font-size: 0.95rem;
  }

  .input-group-box {
    width: 100px;
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
