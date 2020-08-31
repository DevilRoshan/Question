class Observer {
  constructor(data){
    this.walk(data)
  }
  walk(data){
    // 1.判断data是否是对象
    if(!data || typeof data !== 'object') {
      return 
    }
    // 2.遍历data对象的所有属性
    for(let key in data){
      this.defineReactive(data, key, data[key])
    }
  }
  defineReactive(obj, key, val){
    let _this = this
    // 收集依赖并且发送通知
    let dep = new Dep()
    // 如果val是对象，把val内部属性转换成响应式数据
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get () {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set (newValue) {
        if(newValue === val){
          return
        }
        val = newValue
        _this.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}