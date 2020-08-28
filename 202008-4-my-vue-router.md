# 手写VueRouter

> VueRouter官网：https://router.vuejs.org/zh/



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



### 注册



### 组件



### 事件



### 模式



### 其他细节



#### 浏览器回退按钮

