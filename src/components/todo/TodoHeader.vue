<template>
  <div class="text-center">
    <div class="my-3">
      <div class="input-group mb-3">
        <input type="text" 
          class="form-control"
          placeholder="할일을 입력하세요"
          v-model="content"
          v-on:keyup.enter="createTodo()"
        >
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text input-group-box" id="inputGroup-sizing-default">End</span>
        <button> 오늘
          <input type="date" v-model="endDate" class="form-control" id="end-date-input">
        </button>
        <DateTimePicker :label="'시작날짜'"></DateTimePicker>
      </div>

      <div class="d-grid gap-2">
        <button class="btn btn-success" type="button" @click="createTodo()">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
  import DateTimePicker from "../common/DateTimePicker.vue";
  export default {
    props: {
      todoIndices: Array,
    },

    componnets: {
      DateTimePicker
    },

    data() {
      return {
        index:        null,
        content:      null,
        createdAt:    null,
        updatedAt:    null,
        startDate:    null,
        endDate:      null,
        currentDate:  this.getCurrentDate(),
        previousDate: this.getPreviousDate(),
      }
    },
  
    methods: {
      async createTodo () {
        
        if ( this.checkEmptyContent(this.content) ) {
          alert("할일을 입력하세요.");
          return
        }
        
        const data  = this.setData(this.content, this.checkEmptyDate(this.endDate));
        this.$emit('createTodo', data);
        
        this.initializeInput();
      },

      initializeInput () {
        this.content   = null;
        this.endDate   = null;
      },

      checkEmptyContent(content) {
        const checkContent = content == "" || content == null || content == undefined || 
             ( content != null && typeof content == "object" && !Object.keys(content).length );
        
        return checkContent;
      },

      checkEmptyDate (dateTime) {
        const checkDate = dateTime == "" || dateTime == null || dateTime == undefined || 
             ( dateTime != null && typeof dateTime == "object" && !Object.keys(dateTime).length );
        
        if (checkDate) return this.getCurrentDate();
        
        return dateTime;
      },

      getCurrentDate() {
        const date = new Date();
        
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      },

      getPreviousDate() {
        const date  = new Date();
        const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        
        return [date.getFullYear(), month, date.getDate() - 1].join('-');
      },

      setData (content, endDate) {
        return {
          content: content,
          endDate: endDate,
        };
      },

      setMinAttribute () {
        document.getElementById('end-date-input').setAttribute('min', this.previousDate);
      }
    },

    mounted() {
      console.log("good");
    },
  }
</script>

<style scoped>
  .input-group-box {
    width: 100px;
  }
</style>
