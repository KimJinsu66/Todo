<template>
  <div class="">
    <div class="my-5">
      <div class="todo-input-box mb-3">
        <input type="text" 
          class="content-input p-3"
          placeholder="할일을 입력하세요"
          v-model="content"
          v-on:keyup.enter="createTodo()"
        >
        <div class="d-flex justify-content-between">
          <datepicker 
            v-model="endDate"
            id="input-datepicker"
            placeholder="오늘"
            clear-button-icon="fas fa-dollar-sign"
            format="yyyy-MM-dd"
            :disabledDates="disabledDates"
          >
          </datepicker>
          <div class="input-function-box">
            <i class="fas fa-tag"></i>
            <i class="fas fa-flag"></i>
          </div>
        </div>
      </div>

      <div class="d-grid gap-2">
        <button class="todo-success-btn" type="button" @click="createTodo()">추가</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';

  export default {

    props: {
      todoIndices: Array,
    },

    components: {
      'Datepicker': Datepicker
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
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
      }
    },
  
    methods: {
      
      async createTodo () {
        console.log(this.endDate);

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
        const checkDate = dateTime == "" || dateTime == null || dateTime == undefined ;
        
        if (checkDate) return this.getCurrentDate();
        
        return `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDate()}`;
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
    },

    mounted() {
      console.log("good");
      document.getElementById('input-datepicker').style="width: 100px; height: 28px; margin-left: 15px; border-radius: 5px";
      document.getElementById('input-datepicker').val
    },
  }
</script>

<style scoped>
  .input-group-box {
    width: 100px;
  }

  .todo-input-box {
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 15px;
    height: 90px;
  }
  
  .todo-input-box h4 {
    display: inline-block;
    margin: 0;
    transform: translateY(-50%);
    background: #fff;
    padding: 0 .5em;
  }

  .content-input {
    padding: 3px;
    width: 100%;
    border: none;
    border-radius: 15px;
    height: 28px;
    margin: 10px 0px;
  }

  .content-input:focus {
    outline:none;
  }

  #input-datepicker::placeholder {
    color: white;
    font-size: 0.825rem;
    margin-left: 5px;
  }

  .input-function-box {
    margin-right: 15px;
  }

  .todo-success-btn {
    background: #DB4C3F;
    color: white;
    border: 1px solid #DB4C3F;
    border-radius: 7px;
    width: 90px;
    height: 30px;
    font-weight: 900;
    margin-left: 10px;
    font-size: 0.8rem;
  }
</style>
