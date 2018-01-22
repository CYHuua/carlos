// 插件
import message from './packages/plugins/message'
import loading from './packages/plugins/loading'
// 组件
import countdown from './packages/components/countdown'
import cSwitch from './packages/components/switch'
import { flexbox, flexboxItem } from './packages/components/flexbox'
import { cell, cellItem } from './packages/components/cell'

// 组件
var components = {
  countdown, cSwitch, flexbox, flexboxItem, cell, cellItem
}
// 插件
var plugins = {
  '$carlos_message': message,
  '$carlos_loading': loading
}

var carlos = {
  install (Vue) {
    // 注册全局组件
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
    // 注册全局API
    Object.keys(plugins).forEach((key) => {
      Vue.prototype[key] = plugins[key]
    })
  }
}

export default carlos
