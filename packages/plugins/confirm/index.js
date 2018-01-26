import Vue from 'vue'
import ConfirmComponent from './confirm.vue'
import { merge } from '../../utils'

// 创建一个组件实例
let instance
// extend是构造一个组件的语法器，传入参数，返回一个组件
let ConfirmConstructor = Vue.extend(ConfirmComponent)

let initIntance = () => {
  let node = document.querySelector('#carlos__confirm')
  if (node && node.parentNode) {
    node.parentNode.removeChild(node)
  }
  // 实例化ConfirmComponent组件
  instance = new ConfirmConstructor({
    el: document.createElement('div')
  })
  document.body.appendChild(instance.$el)
}

let Confirm = (options = {}) => {
  // 初始化
  initIntance()
  // 将单个confirm instance的配置合并到默认值（instance.$data，就是main.vue里面的data）中
  merge(instance.$data, options)
  // 返回Promise
  return new Promise((resolve, reject) => {
    instance.show = true
    let confirmHandle = instance.confirmHandle
    let cancelHandle = instance.cancelHandle
    instance.confirmHandle = () => {
      confirmHandle()
      resolve('confirm')
    }
    instance.cancelHandle = () => {
      cancelHandle()
      resolve ('cancel')
    }
  })
}
export default Confirm
