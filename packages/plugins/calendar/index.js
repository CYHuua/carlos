import Vue from 'vue'
import CalendarComponent from './calendar.vue'
import { merge } from '../../utils'

// 创建一个组件实例
let instance
// extend是构造一个组件的语法器，传入参数，返回一个组件
let CalendarConstructor = Vue.extend(CalendarComponent)

let initIntance = () => {
  // 实例化CalendarComponent组件
  instance = new CalendarConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

let Calendar = (options = {}) => {
  // 初始化
  initIntance()
  // 将单个calendar instance的配置合并到默认值（instance.$data，就是calendar.vue里面的data）中
  merge(instance.$data, options)
  // 返回Promise
  return new Promise((resolve, reject) => {
    instance.show = true
    let confirmHandle = instance.confirmHandle
    let cancelHandle = instance.cancelHandle
    instance.confirmHandle = () => {
      confirmHandle()
      resolve({
        stat: 'confirm',
        data: instance.current
      })
    }
    instance.cancelHandle = () => {
      cancelHandle()
      resolve({
        stat: 'cancel'
      })
    }
  })
}
export default Calendar
