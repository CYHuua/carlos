import Vue from 'vue'
import LoadingComponent from './loading.vue'
import { merge } from '../../utils'

// 创建一个组件实例
let instance
// extend是构造一个组件的语法器，传入参数，返回一个组件
let LoadingConstructor = Vue.extend(LoadingComponent)

let initIntance = () => {
  // 实例化LoadingComponent组件
  instance = new LoadingConstructor({
    el: document.createElement('div')
  })
  let node = document.querySelector('#carlos__loading')
  if (node && node.parentNode) {
    node.parentNode.removeChild(node)
  }
  document.body.appendChild(instance.$el)
}

let Loading = (options = {}) => {
  // 初始化
  initIntance()
  // 将单个toast instance的配置合并到默认值（instance.$data，就是main.vue里面的data）中
  merge(instance.$data, options)
  // 返回Promise
  return new Promise((resolve) => {
    instance.show = true
    if (options.isText || (options.isText && options.text)) {
      instance.isText = true
    } else {
      instance.isText = false
    }
    instance.success()
    resolve('open')
  })
}
Loading.close = () => {
  return new Promise((resolve) => {
    instance.close()
    resolve('close')
  })
}
export default Loading
