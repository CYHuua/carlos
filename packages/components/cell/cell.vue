<template>
  <div>
    <p class="carlos__cell-title" v-if="title">{{title}}</p>
    <div class="carlos__cell-slot" :style="styleObj">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'carlos-cell',
  props: {
    title: {
      type: String
    },
    gutter: {
      type: Number,
      default: 16
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {}
  },
  computed: {
    styleObj () {
      let styleObj = {}
      styleObj['marginBottom'] = this.gutter + 'px'
      styleObj['backgroundColor'] = this.bgColor
      return styleObj
    }
  }
}
</script>