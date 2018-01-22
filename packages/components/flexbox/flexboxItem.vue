<template>
  <div class="carlos__flexbox-item"
  :style="styleObj">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'carlos-flexbox-item',
  props: {
    // flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    grow: {
      type: [String, Number],
      default: 0
    },
    // flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    shrink: {
      type: [String, Number],
      default: 1
    },
    // flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
    basis: {
      type: [String, Number],
      default: 'auto'
    },
    // order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    order: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    styleObj () {
      let styleObj = {}

      // gutter
      let gutter = this.$parent.gutter
      let orient = this.$parent.orient

      let marginName = orient === 'horizontal' ? 'marginLeft' : 'marginTop'
      styleObj[marginName] = gutter + 'px'

      // grow
      styleObj['flex-grow'] = this.grow

      // shrink
      styleObj['flex-shrink'] = this.shrink

      // basis
      styleObj['flex-basis'] = this.basis

      // order
      styleObj['order'] = this.order

      return styleObj
    }
  }
}
</script>