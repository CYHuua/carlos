<template>
  <div class="carlos__switch" 
  :class="{'carlos__switch-on': on}" @click.stop="toggleSwitch">
    <span class="switch__display"></span>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'carlos-switch',
  props: {
    on: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    toggleSwitch (event) {
      var flag = !this.on
      this.on = flag
      this.$emit('change', flag)
    }
  }
}
</script>

<style type="text/css">
.carlos__switch{width:50px;height:25px;display:inline-block;background:#fdfdfd;border:1px solid #d5d5d5;-webkit-border-radius:25px;position:relative;-webkit-transition:background .3s;}
.carlos__switch .switch__display{position:absolute;left:26px;top:0;width:50%;height:100%;background:#fff;border:1px solid #d5d5d5;border-radius:50%;-webkit-transition:left .3s;-webkit-box-sizing:border-box;}
.carlos__switch-on{background:#f5c608;}
.carlos__switch-on .switch__display{left:-1px;}
</style>