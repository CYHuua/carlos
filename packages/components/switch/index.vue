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
      this.on = !this.on
      this.$emit('change', this.on)
    }
  }
}
</script>

<style type="text/css">
.carlos__switch{width:60px;height:30px;display:inline-block;background:#fdfdfd;border:1px solid #d5d5d5;border-radius:30px;position:relative;-webkit-transition:background .3s;}
.carlos__switch .switch__display{position:absolute;left:30px;top:0;width:28px;height:28px;background:#fff;border:1px solid #d5d5d5;border-radius:50%;-webkit-transition:left .3s;}
.carlos__switch-on{background:#f5c608;}
.carlos__switch-on .switch__display{left:0;}
</style>