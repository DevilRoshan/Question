class Watcher {
  constructor(vm, key, cb){
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb

    // 把watcher对象记录在Dep类的静态属性中
    Dep.target = this
    // 触发get方法，在个体方法中调用添加观察者方法
    this.oldValue = vm[key]
    // 重置Dep
    Dep.target = null
  }

  // 当数据发生改变时更新视图
  update() {
    let newValue = this.vm[this.key];
    if(this.oldValue === newValue){
      return
    }
    this.cb(newValue)
  }
}