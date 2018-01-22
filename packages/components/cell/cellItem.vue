<template>
  <div class="carlos__cell-item">
    <img class="item__icon" v-if="isIcon" src="icon" />
    <div class="item__title">{{title}}</div>
    <div class="item__value" v-if="value">{{value}}</div>
    <slot></slot>
    <div class="item__gt" v-if="isLink"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'carlos-cell-item',
  props: {
    icon: {
      type: String
    },
    title: {
      type: String,
      default: '默认'
    },
    value: {
      type: String
    },
    isIcon: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.$emit('init')
  },
  computed: {
    styleObj () {
      let styleObj = {}
      if (this.gutter) {
        styleObj['marginBottom'] = this.gutter + 'px'
      }
    }
  },
  methods: {}
}
</script>