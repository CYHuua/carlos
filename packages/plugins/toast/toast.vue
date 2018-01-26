<template>
  <transition name="opacity">
    <div class="carlos__toast" v-if="show" :style="{zIndex:zindex}">
      <div class="toast__mask" v-if="mask"></div>
      <div class="toast__wrap" :style="{ color: color }">
        <i class="icon iconfont toast__icon" :class="iconClass"></i>
        <p class="toast__txt">{{content}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import './font/iconfont.css'
  export default {
    name: 'carlos-toast',
    data () {
      return {
        zindex: 9999,
        show: true,
        type: '',
        content: '',
        mask: false,
        delay: 2000,
        color: '#fff'
      }
    },
    computed: {
      iconClass () {
        var strategies = {
          success: 'success',
          fail: 'fail',
          info: 'info',
          warn: 'warn',
          smile: 'smile',
          cry: 'cry'
        }
        console.log(this.type)
        if (strategies[this.type]) {
          return 'icon-' + strategies[this.type]
        } else {
          return 'icon-info'
        }
      }
    },
    mounted () {
      this.success()
    },
    methods: {
      success () {
        var self = this
        self.$nextTick(() => {
          setTimeout(() => {
            self.show = false
          }, self.delay)
        })
      }
    }
  }
</script>

<style type="text/css" scoped>
  .toast__mask{position:fixed;left:0;top:0;z-index:8888;width:100%;height:100%;}
  .toast__wrap{background:rgba(0,0,0,.7);position:fixed;left:50%;top:50%;z-index:9999;-webkit-transform:translate(-50%, -50%);color:#fff;padding:15px;border-radius:9px;text-align:center;width:90px;}
  .toast__wrap .toast__icon{font-size:40px;display:inline-block;margin-bottom:10px;}
  .toast__wrap .toast__txt{font-size:15px;text-align:center;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;}
  .opacity-enter{opacity:0;}
  .opacity-enter-active{transition:opacity .4s;}
  .opacity-leave-active{transition:opacity .2s;}
  .opacity-leave-active{opacity:0;}
</style>