# 手写VueRouter

> VueRouter官网：https://router.vuejs.org/zh/
>
> 代码位置 './code/202008-4-my-vue-router.js'

VueRouter是Vue生态中前端路由部分，关于前端路由的原理在以前已经总计而过了，这里是使用Vue的API完成Vue中前端路由的插件实现

## VueRouter使用

VueRouter基本的操作有：

* 注册一个路由表，并且使用Vue提供的注册插件的方式，注册到Vue实例上
* 使用`router-link`和`router-view`两个组件一个进行跳转，一个根据链接显示对应注册的组件
* 编程式使用push，replace，go，这些API进行跳转
* 支持history和hash模式
* 其他细节，比如浏览器回退按钮的事件捕捉，然后对应修改显示的组件

关于动态路由，嵌套路由，重定向等功能，以后有机会实现

### 注册

官网的示例最是有效

```javascript
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 
Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

### 组件

```vue
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

### 事件

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)
```

### 模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

但是这需要后端或者运维对nginx进行配置将所有子路径匹配到同一个页面，也就是我们打包的`index.html`

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

### 其他细节

#### 浏览器回退按钮

当用户操作浏览器的回退按钮时，因为是单页面，所以组件并不会刷新，所以要拦截这个事件，进行组件切换

## 编写VueRouter

使用Vue的API完成上述路由功能

### 注册

#### 注册组件

Vue.use注册组件，如果参数是一个对象，则需要有一个`install`方法，如果是一个方法，则直接执行，所以这里要有一个静态方法install

使用Vue.mixin，将router对象混入vue实例，其他地方可能会拿不到

```javascript
static install(Vue) {
  // 1 判断当前插件是否安装
  if(VueRouter.install.installed){
    return;
  }
  VueRouter.install.installed = true
  // 2 把Vue的构造函数记录在全局
  _Vue = Vue;
  // 3 把创建Vue的实例传入的router对象注入Vue实例
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
```

#### 声明状态

options保存配置

routeMap保存路径与组件的对应关系

nameMap保存name字段和路径的对应关系

data为双向绑定的数据，存储当前选中的路由

init是其他方法的整合方法

```javascript
constructor(options){
  this.options = options;
  this.routeMap = {};
  this.nameMap = {};
  this.mode = options.mode
  // observable
  this.data = _Vue.observable({
    current: "/"
  })
}

init() {
  this.createRouteMap();
  this.initComponent(_Vue);
  this.initEvent();
}
```

#### 生成路由表

根据路径拿到组件，根据name拿到路径

```javascript
createRouteMap(){
  this.options.routes.forEach(route => {
    this.routeMap[route.path] = route.component
    this.nameMap[route.name] = route.path
  })
}
```

### 组件

主要分为两个组件分别是`router-link`和`router-view`

#### router-link

负责跳转，替换a标签，原理是拦截原a标签的操作，改为使用historyAPI，修改双向绑定的data数据

* 使用Vue.component生成组件
* 使用render渲染组件dom
* 使用hsitoryAPI，history.pushState进行路由更换

#### router-view

负责显示组件，当路由切换是跟换显示的组件，就是根据第一步注册好的routeMap和选中的路由，展示对应组件

```javascript
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
```

### 事件

与`router-link`组件的实现方式相同，只不过添加了一些关于参数的判断

```javascript
const objToSearchUrl = (obj) => Object.keys(obj).reduce((a, b) => `${a}${b}=${![undefined,null].includes(obj[b]) ? obj[b] : ''}&`, `?`).replace(/(&)$/, "");

push({path, query, name, params,}){
  let url = path, serach = query;
  if(!url) {
    url = this.nameMap[name];
    serach = params
  }
  let urlCache = this.mode === 'history' ? url : `#${url}`
  history.pushState({}, "", `${urlCache}${serach && objToSearchUrl(serach) || ''}`)
  this.data.current = url
}
replace({path, query, name, params,}){
  let url = path, serach = query;
  if(!url) {
    url = this.nameMap[name];
    serach = params
  }
  let urlCache = this.mode === 'history' ? url : `#${url}`
  history.replaceState({}, "", `${urlCache}${serach && objToSearchUrl(serach) || ''}`)
  this.data.current = url
}
```

### 模式

在`router-link`组件和注册的事件中进行模式的判断，如果是hash路由，则在路由前添加一个#号，在监听的浏览器回退事件中，hash模式读取hash，history读取pathname

### 其他细节

#### 浏览器回退按钮

监听popstate事件，这个时间会在浏览器作出操作的时候触发

```javascript
initEvent() {
  window.addEventListener("popstate", () => {
    let key = window.location.hash.slice(1)
    if(this.mode === 'history'){
      key = window.location.pathname
    }
    this.data.current = key
  })
}
```

## 总结

* historyAPI的应用，替换默认的a标签跳转行为

* 依赖于vue的一些基础API来完成插件，比如注册组件，比如渲染函数使用

  