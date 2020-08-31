// 判断元素属性是否是指令
const isDirective = (attrName) => {
  return attrName.startsWith('v-')
}
// 判断节点是否是文本节点
const isTextNode = (node) => {
  return node.nodeType === 3
}
// 判断节点是否是元素节点
const isElementNode = (node) => {
  return node.nodeType === 1
}
// 编译文本节点，处理差值表达式
const compilerText = function (node){
  // {{ msg }}
  let reg = /\{\{(.+?)\}\}/;
  let value = node.textContent;
  if(reg.test(value)){
    let key = RegExp.$1.trim();
    node.textContent = value.replace(reg, this.vm[key]);

    // 同时创建watcher对象，监听数据改变
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
}
// 判断节点是否是元素节点
const isOrderOn= (attrName) => {
  return attrName.indexOf('on') === 0
}
// 处理 v-text 指令
const textUpdater = function (node, value, key) {
  node.textContent = value || key;

  // 同时创建watcher对象，监听数据改变
  new Watcher(this.vm, key, (newValue) => {
    node.textContent = newValue
  })
}
// 处理 v-model 指令
const modelUpdater = function (node, value, key) {
  node.value = value;

  // 同时创建watcher对象，监听数据改变
  new Watcher(this.vm, key, (newValue) => {
    node.value = newValue
  })

  // 与输入事件双向绑定
  node.addEventListener('input', () => this.vm[key] = node.value)
}
// 处理 v-html 指令
// 更新元素的 innerHTML。
// 注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。
// <div v-html="html"></div>
const htmlUpdater = function (node, value, key) {
  node.innerHTML = value || key;
  
  // 同时创建watcher对象，监听数据改变
  new Watcher(this.vm, key, (newValue) => {
    node.value = newValue
  })
}
// 处理 v-on 指令
// 绑定事件监听器。事件类型由参数指定。
// 用在普通元素上时，只能监听原生 DOM 事件。
// <button v-on:click="doThis"></button>
const onUpdater = function (node, value, key) {
  const {event, method_key} = key
  // 绑定事件
  node.addEventListener(event, () => this.vm.$methods[method_key] && this.vm.$methods[method_key].call(this.vm))
}
// 处理指令的更新函数map
const updataMap = {
  text: textUpdater,
  model: modelUpdater,
  html: htmlUpdater,
  on: onUpdater,
}
// 编译元素节点处理指令
const compilerElement = function (node) {
  // 遍历所有属性节点
  Array.from(node.attributes).forEach(attr => {
    // 判断是否是指令
    let attrName = attr.name;
    if(isDirective(attrName)){
      attrName = attrName.substr(2);
      let key = attr.value;
      let order = attrName;
      if(isOrderOn(attrName)){
        let cache = attrName.split(':');
        order = cache[0];
        key = {
          method_key: attr.value,
          event: cache[1]
        }
      }
      updataMap[order] && updataMap[order].call(this, node, this.vm[key], key)
    }
  })
}
// 编译节点方法map
const compilerMap = {
  text: compilerText,
  element: compilerElement
}

class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compiler(this.el)
  }
  // 编译模版，处理文本节点和元素节点
  compiler(el){
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      // 处理文本节点
      let key = ''
      if(isTextNode(node)){
        key = 'text'
      }
      if(isElementNode(node)){
        key = 'element'
      }
      compilerMap[key] && compilerMap[key].call(this, node);

      // 递归处理子节点
      if(node.childNodes && node.childNodes.length){
        this.compiler(node)
      }
    })
  }
}