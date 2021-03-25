<template lang="">
  <div class="todo-navbar px-5">
    <div class="todo-navbar-inner-box d-flex justify-content-between">
      <div class="left-menu-box">
        <button class="navbar-btn" @click="sendShowData">  
          <i class="fas fa-bars font svg-font"></i>
        </button>
        
        <button class="navbar-btn">
          <router-link to="/">
            <i class="fas fa-home svg-font"></i>
          </router-link>
        </button>
        <div class="total-search-input-box" @click="clickSearchInput()" @mouseover="changeInputBox">
          <i class="fas fa-search total-search-icon"></i>
          <input id="id-ash5pn" 
            role="combobox"
            autocomplete="off" 
            aria-controls="id-ash5pn-menu" 
            aria-haspopup="listbox" 
            aria-expanded="false" 
            aria-autocomplete="none" 
            class="total-search-input"
            placeholder="검색" 
            aria-label="빠른 검색" 
            aria-keyshortcuts="f" 
            value=""
            v-model="searchKey"
            v-on:keyup.enter="searchTodo()">
        </div>
      </div>

      <div class="right-menu-box">
        <button class="navbar-btn">  
          <i class="fas fa-plus svg-font"></i>
        </button>
        
        <button class="navbar-btn">  
          <i class="far fa-bell svg-font"></i>
        </button>
        
        <button class="navbar-btn">  
          <i class="fab fa-google svg-font"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../common/eventBus.js'
  export default {
    data () {
      return {
        searchKey: null,
        show: true,
      }
    },

    methods: {
      // Todo: 만들 예정
      searchTodo () {
        console.log(this.searchKey);
        this.searchKey = null;
        
      },
      
      sendShowData () {
        console.log("Event Bus를 통해 보냅니다!")
        this.show = !this.show;
        EventBus.$emit('sendShowData', this.show);
      }
    }
    
  }
</script>

<style scoped>
  a:visited { 
    color: white; 
    text-decoration: none;
  }

  a:hover { 
    color: white; 
    text-decoration: underline;
  }

  .todo-navbar {
    height: 44px;
    background-color: #DB4C3F;
  }

  button {
    font-family: inherit;
    font-size: 13px;
    color: #202020;
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  .navbar-btn {
    height: 28px;
    min-width: 28px;
    border-radius: 3px;
    color: white;
    margin: 0 4px 0 0;
  }

  .svg-font {
    font-size: 1.25rem;
    font-weight: 100;
  }
  
  .todo-navbar-inner-box {
    color: white;
    height: 100%;
    width: 100%;
  }

  .left-menu-box, .right-menu-box {
    display: flex;
    align-items: center;
  }

  .total-search-input-box {
    position: relative;
    padding-left: 20px;
    height: 29.6px;
  }

  .total-search-icon {
    position: absolute;
    top: 25%;
    left: 12px;
    height: 16px;
    width: 16px;
  }

  .total-search-input {
    position: relative;
    left: -16px;
    border: 1px solid transparent;
    // background-color: #DB4C3F transparent;
    background: hsla(0,0%,100%,.2);
    color: white;
    border-radius: 5px;
    padding: 5px 0 5px 34px;
    height: 100%;
  }

  .total-search-input::placeholder {
    color: white;
    font-size: 0.825rem;
    margin-left: 5px;
  }

</style>