/* eslint-disable */
let _Vue = null;
export default class VueRouter {
  static install(Vue) {
    // 1 判断当前插件是否安装
    if(VueRouter.install.installed){
      return;
    }
    VueRouter.install.installed = true
    // 2 把Vue的构造函数记录在全局
    _Vue = Vue;
    // 3 把创建Vue的实例传入的router对象注入Vue实例
    // _Vue.prototype.$router = this.$options.router
    // 使用Vue.mixin
    _Vue.mixin({
      beforeCreate(){
        if(this.$options.router){
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init()
        }
      }
    })
  }

  constructor(options){
    this.options = options;
    this.routeMap = {};
    this.mode = options.mode
    // observable
    this.data = _Vue.observable({
      current: "/"
    })
    this.init()
  }
  init() {
    this.createRouteMap();
    this.initComponent(_Vue);
    this.initEvent();
  }
  createRouteMap(){
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }
  initComponent(Vue){
    let mode = this.mode
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h("a", {
          attrs: {
            href: mode === 'history' ? this.to : `#${this.to}`
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          e.preventDefault()
          let url = mode === 'history' ? this.to : `#${this.to}`
          history.pushState({}, "", url)
          this.$router.data.current = this.to
        }
      }
    })
    const _this = this;
    Vue.component("router-view", {
      render(h){
        const component = _this.routeMap[_this.data.current]
        return h(component)
      }
    })
  }
  initEvent() {
    window.addEventListener("popstate", () => {
      let key = window.location.hash.slice(1)
      if(this.mode === 'history'){
        key = window.location.pathname
      }
      this.data.current = key
    })
  }
}
