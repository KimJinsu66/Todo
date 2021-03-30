<template lang="">
  <transition name="fade">
    <div class="sidebar-container" v-if="show">
      <div class="p-3 d-flex flex-column ">
      
        <router-link to="/" class="sidebar-link-box d-flex justify-content-between align-items-center">
          🗄️ 관리함
        </router-link>
        <router-link to="/" class="sidebar-link-box d-flex justify-content-between align-items-center">
          🗓️ 오늘
        </router-link>
        <router-link to="/" class="sidebar-link-box d-flex justify-content-between align-items-center">
          📚 다음
        </router-link>
      </div>

      <div>
        <div class="additional-features-box">
          > 프로젝트
        </div>
        <div class="additional-features-box">
          > 라벨
        </div>
        <div class="additional-features-box">
          > 필터
        </div>
      </div>
    </div>    
  </transition>  
</template>

<script>

  import EventBus from '../common/eventBus.js'

  export default {
    data () {
      return {
        show: true,
      }
    },

    created () {
      EventBus.$on('sendShowData', (sidebarShow) => {
        console.log('이벤트 수신!');
        this.show = sidebarShow;
      })
    },

    methods: {
       
    }
    
  }
</script>

<style scoped>
  a {
    color: black !important;
    text-decoration: none;
    height: 25px;
    padding: 3px;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 1rem;
  }

  ul {

  }

  a:visited { 
    color: white; 
    text-decoration: none;
  }

  a:hover { 
    background-color: #ede8e8;
    color: white;
    text-decoration: underline;
  }

  .sidebar-container {
    width: 300px;
    padding: 30px 0 0 35px;
    background: #FAFAFA;
  }

  .sidebar-link-box {
    padding: 20px 16px 20px 5px;
  }

  .additional-features-box {
    padding: 16px 32px 16px 32px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    width: 0;
  }
</style>