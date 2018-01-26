import './font/iconfont.css'
import Vue from 'vue'
import ToastComponent from './toast.vue'
import { merge } from '../../utils'

let zindex = 9999
// 创建一个组件实例
let instance
// extend是构造一个组件的语法器，传入参数，返回一个组件
let ToastConstructor = Vue.extend(ToastComponent)

let initIntance = () => {
  // 实例化ToastComponent组件
  instance = new ToastConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

let Toast = (options = {}) => {
  // 初始化
  initIntance()
  // 将单个toast instance的配置合并到默认值（instance.$data，就是main.vue里面的data）中
  merge(instance.$data, options)
  // 返回Promise
  return new Promise((resolve) => {
    zindex++
    instance.show = true
    instance.zindex = zindex
    resolve('open')
  })
}
export default Toast
