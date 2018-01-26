<template>
  <transition name="fade">
    <div id="carlos__confirm" class="carlos__confirm" v-if="show">
      <div class="confirm__mask" v-if="mask"></div>
      <div class="confirm__wrap">
        <div class="confirm__head">{{title}}</div>
        <div class="confirm__body" v-if="content">{{content}}</div>
        <div class="confirm__foot">
          <a v-if="cancel" href="javascript:void(0);" class="confirm__btn" :class="typeClass(cancelType)" @click="cancelHandle">{{cancelText}}</a>
          <a v-if="confirm" href="javascript:void(0);" class="confirm__btn" :class="typeClass(confirmType)" @click="confirmHandle">{{confirmText}}</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'carlos-confirm',
  data () {
    return {
      show: true,
      mask: true,
      maskClick: false,
      title: '',
      content: '',
      cancel: true,
      cancelText: '取消',
      cancelType: 'default',
      confirm: true,
      confirmText: '确定',
      confirmType: ''
    }
  },
  methods: {
    typeClass (type) {
      var strategies = {
        default: 'default',
        primary: 'primary',
        warn: 'warn'
      }
      if (strategies[type]) {
        return 'confirm__btn-' + type
      }
      return;
    },
    confirmHandle () {
      this.show = false
    },
    cancelHandle () {
      this.show = false
    }
  }
}
</script>

<style type="text/css" scoped>
  .carlos__confirm{opacity:1;-webkit-transition:all 4s ease;}
  .confirm__mask{position:fixed;top:0;bottom:0;z-index:8888;width:100%;background:rgba(0,0,0,.7);}
  .confirm__wrap{position:fixed;top:50%;left:50%;z-index:9999;-webkit-transform:translate(-50%, -50%);background:#fff;border-radius:6px;text-align:center;width:80%;max-width:300px;overflow:hidden;}
  .confirm__wrap .confirm__head{padding:20px 25px 8px 25px;font-size:18px;position:relative;}
  .confirm__wrap .confirm__body{padding:0 24px 12px;min-height:40px;font-size:15px;word-wrap:break-word;word-break:break-all;color:#999;}
  .confirm__wrap .confirm__foot{display:flex;position:relative;}
  .confirm__wrap .confirm__foot:after{content:"";position:absolute;left:0;top:0;width:100%;height:1px;background:#d5d5d6;transform:scaleY(.5);}
  .confirm__wrap .confirm__foot .confirm__btn{flex:1;font-size:18px;padding:15px 0;position:relative;color:#3cc51f;}
  .confirm__wrap .confirm__foot .confirm__btn:before{content:"";position:absolute;left:0;top:0;width:1px;height:100%;background:#d5d5d6;transform:scaleX(.5);}
  .confirm__wrap .confirm__foot .confirm__btn:first-child:before{display:none;}
  .confirm__wrap .confirm__foot .confirm__btn.confirm__btn-default{color:#353535;}
  .confirm__wrap .confirm__foot .confirm__btn.confirm__btn-primary{color:#ff9900;}
  .confirm__wrap .confirm__foot .confirm__btn.confirm__btn-warn{color:#e64340;}

  .fade-enter-active{opacity:0;}
  .fade-leave-active{opacity:0;-webkit-transition:all .2s ease;}
</style>