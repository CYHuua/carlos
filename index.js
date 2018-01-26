// 公共样式
import './packages/static/css/common.css'
// 插件
import message from './packages/plugins/message'
import loading from './packages/plugins/loading'
import toast from './packages/plugins/toast'
import confirm from './packages/plugins/confirm'
import calendar from './packages/plugins/calendar'
// 组件
import pluginswrap from './packages/components/pluginswrap'
import countdown from './packages/components/countdown'
import timedown from './packages/components/timedown'
import cSwitch from './packages/components/switch'
import { flexbox, flexboxItem } from './packages/components/flexbox'
import { cell, cellItem } from './packages/components/cell'

// 组件
var components = {
  pluginswrap, countdown, timedown, cSwitch, flexbox, flexboxItem, cell, cellItem
}
// 插件
var $carlos = {
  message, loading, toast, confirm, calendar
}
var carlos = {
  install (Vue) {
    // 注册全局组件
    Object.keys(components).forEach((key) => {
      Vue.component(components[key].name, components[key])
    })
    // 注册全局api
    Vue.prototype['$carlos'] = $carlos
  }
}

export default carlos
