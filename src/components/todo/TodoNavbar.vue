<template lang="">
  <div class="todo-navbar px-5">
    <div class="todo-navbar-inner-box d-flex justify-content-between">
      <div class="left-menu-box">
        <button class="navbar-btn">  
          <i class="fas fa-bars font svg-font"></i>
        </button>
        
        <button class="navbar-btn">  
          <i class="fas fa-home"></i>
        </button>
      </div>

      <div class="right-menu-box">
        <button class="navbar-btn">  
          <i class="fas fa-plus"></i>
        </button>
        
        <button class="navbar-btn">  
          <i class="far fa-bell"></i>
        </button>
        
        <button class="navbar-btn">  
          <i class="fab fa-google"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scope>
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
  }

  .svg-font {
    width:  24 !important;
    height: 24 !important;
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

</style>