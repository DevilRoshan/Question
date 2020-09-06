# VUE源码-响应式原理分析



## Vue初始化

### 入口文件

* el可以传入选择器和dom，但是el不能body或者html
* 如果没有render则将template转化为render
* 如果有render则直接挂在

