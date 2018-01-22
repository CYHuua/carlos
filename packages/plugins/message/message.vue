<template>
  <transition name="opacity">
    <div id="carlos__message" class="carlos__message" v-if="show" :style="{zIndex:zindex}">
      <div class="message__mask" v-if="mask"></div>
      <p class="message__content" :class="{'content__long': type === 'long'}">{{content}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        zindex: 1000,
        show: false,
        type: 'short',
        content: '',
        mask: false,
        delay: 2000
      }
    },
    computed: {},
    mounted () {
      this.success()
    },
    methods: {
      success () {
        setTimeout(() => {
          this.show = false
        }, this.delay)
      }
    }
  }
</script>

<style type="text/css">
  .message__mask{position:fixed;left:0;top:0;z-index:999;width:100%;height:100%;}
  .message__content{background:rgba(0,0,0,.7);position:fixed;left:50%;top:50%;z-index:1000;-webkit-transform:translate(-50%, -50%);font-size:15px;color:#fff;padding:15px;border-radius:9px;width:auto;text-align:center;}
  .message__content.content__long{width:80%;}
  .opacity-enter{opacity:0;}
  .opacity-enter-active{transition:opacity .4s;}
  .opacity-leave-active{transition:opacity .2s;}
  .opacity-leave-active{opacity:0;}
</style>