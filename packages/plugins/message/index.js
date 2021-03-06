import Vue from 'vue'
import MessageComponent from './message.vue'
import { merge } from '../../utils'

let zindex = 9999
// 创建一个组件实例
let instance
// extend是构造一个组件的语法器，传入参数，返回一个组件
let MessageConstructor = Vue.extend(MessageComponent)

let initIntance = () => {
  // 实例化MessageComponent组件
  instance = new MessageConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

let Message = (options = {}) => {
  // 初始化
  initIntance()
  // 将单个message instance的配置合并到默认值（instance.$data，就是main.vue里面的data）中
  merge(instance.$data, options)
  // 返回Promise
  return new Promise((resolve, reject) => {
    zindex++
    instance.show = true
    instance.zindex = zindex
    resolve('open')
  })
}
export default Message
