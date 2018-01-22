import Vue from 'vue'
import messageComponent from './message.vue'
// 合并对象函数，这个方法是会改变，第一个参数的值的
function merge (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}
let zindex = 1000
// 创建一个组件实例
let instance
// extend是构造一个组件的语法器，传入参数，返回一个组件
let MessageConstructor = Vue.extend(messageComponent)

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
    resolve('ok')
  })
}
export default Message
