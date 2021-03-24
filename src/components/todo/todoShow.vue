<template>
  <div class="todo-container my-3">
    <div class="w-100 d-flex justify-content-between">
      <div class="">
        <router-link to="/" class="btn btn-secondary mr-3"><i class="fas fa-arrow-left"></i></router-link>
      </div>
      <div class="">
        <button @click="deleteTodo" class="btn btn-danger "><i class="fas fa-trash"></i></button>
      </div>
    </div>
    <div class="content-box p-3">
      <div>
        <h4> {{ content }} </h4>  
      </div>
      <div>
        <h4>  {{ startDate }} ~ {{ endDate}} </h4>
      </div>
      <div class="text-right">
        {{ createdAt }}
      </div>
    </div>
    
  </div>

</template>

<script>
export default {
  name: 'todo-show',
  data() {
    return {
      content:   null,
      createdAt: null,
      startDate: null,
      endDate:   null,
      todoList:  this.$firebase.firestore().collection("todo_list"),
    }
  },
  created () {
    
    this.todoList.where("index", "==", Number(this.$route.params.todo_id))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const todo = doc.data();
            
          this.content   = todo.content;
          this.createdAt = todo.createdAt;
          this.startDate = todo.startDate;
          this.endDate   = todo.endDate;
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    console.log("created");
  },

  methods: {
    deleteTodo () {
      const todoId = this.$route.params.todo_id;
      this.todoList.where("index", "==", Number(this.$route.params.todo_id))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.delete();
        })
      });
      this.$firebase.database().ref().child("Todo").child(todoId).remove();
      this.$router.push('/');
    }
  }
}
</script>

<style scope>
  .content-box {
    border: 1px solid #7CE4A7;
  }
</style>
