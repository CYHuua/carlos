<template>
  <div class="carlos__cell-item">
    <img class="item__icon" v-if="isIcon" src="icon" />
    <div class="item__title">{{title}}</div>
    <div class="item__value">
      <slot name="value"></slot>
    </div>
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
    isIcon: {
      type: Boolean,
      default: false
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    styleObj () {
      let styleObj = {}
      if (this.gutter) {
        styleObj['marginBottom'] = this.gutter + 'px'
      }
    }
  }
}
</script>