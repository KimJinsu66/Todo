<template lang="">
  <transition name="fade">
    <div class="sidebar-container" v-if="show">
      <ul>
        <li>관리함</li>
        <li>오늘</li>
        <li>다음</li>
      </ul>
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

<style lang="">
  .sidebar-container {
    width: 300px;
    padding: 15px 0 0 15px;
    background: #FAFAFA;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    width: 0;
  }
</style>