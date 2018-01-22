<template>
  <!-- 为组件绑定一个类，这个类的值通过计算属性来得出 -->
  <div class="carlos__flexbox"
  :class="classObj">
    <!-- slot用来装载子组件，carlos-flexbox-item -->
    <slot></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'carlos-flexbox',
  props: {
    // 子组件carlos-flexbox-item之间是否存在间隙
    // 默认，0px的间隙。
    gutter: {
      type: Number,
      default: 0
    },
    // 子组件的排列方式，水平或垂直排列
    orient: {
      type: String,
      default: 'horizontal'
    },
    // 子组件在父级中水平方向的位置
    justify: {
      type: String
    },
    // 子组件在父级中垂直方向的位置
    align: {
      type: String
    },
    // 子组件在父级中是否换行
    wrap: {
      type: String,
      default: 'nowrap'
    }
  },
  computed: {
    // 我们通过父级传递过来的参数，
    // 来判断该组件需要应用哪些样式，
    // 如：<carlos-flexbox orient="vertical" justify="flex-start"></carlos-flexbox>
    classObj () {
      let classObj = {}

      // orient
      if (this.orient === 'vertical') {
        classObj['flex-vertical'] = true
      }

      // wrap
      if (this.wrap === 'wrap') {
        classObj['flex-wrap'] = true
      } else {
        classObj['flex-nowrap'] = true
      }

      // justify
      switch (this.justify) {
        case 'flex-start':
          classObj['justify-start'] = true
          break
        case 'flex-end':
          classObj['justify-end'] = true
          break
        case 'center':
          classObj['justify-center'] = true
          break
        case 'space-between':
          classObj['justify-space-between'] = true
          break
        case 'space-around':
          classObj['justify-space-around'] = true
          break
      }

      // align
      switch (this.align) {
        case 'flex-start':
          classObj['align-start'] = true
          break
        case 'flex-end':
          classObj['align-end'] = true
          break
        case 'center':
          classObj['align-center'] = true
          break
        case 'baseline':
          classObj['align-baseline'] = true
          break
        case 'stretch':
          classObj['align-stretch'] = true
          break
      };

      return classObj
    }
  }
}
</script>