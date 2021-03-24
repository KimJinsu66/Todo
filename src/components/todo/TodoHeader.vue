<template>
  <div class="text-center">
  
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
  </div>
</template>

<script>
  export default {
    props: ['todoIndices'],

    data() {
      return {
        index:     null,
        content:   null,
        createdAt: null,
        updatedAt: null,
        startDate: null,
        endDate:   null,
      }
    },
  
    methods: {
      async createTodo () {
        console.log("TOdo Header created in");
        const content = this.content;
        
        if ( this.checkEmptyContent(this.content) ) {
          alert("할일을 입력하세요.");
          return
        }

        const data  = this.setData(this.content, 
                                   this.convertDateTime(this.startDate),
                                   this.convertDateTime(this.endDate)
                                  );
        this.$emit('createTodo', data);
        console.log("Todo Header Creadeted end");
      },

      checkEmptyContent(content) {
        const checkedContent = content == "" || content == null || content == undefined || 
             ( content != null && typeof content == "object" && !Object.keys(content).length );
        return checkedContent;
      },

      convertDateTime (dateTime) {
        if (dateTime === null) return "";

        return dateTime.replace("T", " ");
      },

      clearInput() {
        console.log("Todo Header clear Input");
      },

      setData (content, startDate, endDate) {
        return {
          content:   content,
          startDate: startDate,
          endDate:   endDate
        };
      },
    },
  }
</script>

<style scope>
  .input-group-box {
    width: 100px;
  }
</style>
