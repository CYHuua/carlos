// import Vue from 'vue'
// 插件
import message from './packages/plugins/message'
import loading from './packages/plugins/loading'
// 组件
import countdown from './packages/components/countdown'
import cSwitch from './packages/components/switch'
import * as flexbox from './packages/components/flexbox'
import * as cell from './packages/components/cell'

// 组件
const components = {
  countdown, cSwitch, ...flexbox, ...cell
}
// 插件
const apis = {
  '$carlos_message': message,
  '$carlos_loading': loading
}

// const install = function () {
//   // 注册全局组件
//   Object.keys(components).forEach((key) => {
//     Vue.component(components[key].name, components[key])
//   })
//   // 注册全局API
//   Object.keys(apis).forEach((key) => {
//     Vue.prototype[key] = apis[key]
//   })
// }
// export default install

const carlos = {
  install (Vue) {
    // 注册全局组件
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
    // 注册全局API
    Object.keys(apis).forEach((key) => {
      Vue.prototype[key] = apis[key]
    })
  }
}

// 新增
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(carlos);
}

export default carlos
