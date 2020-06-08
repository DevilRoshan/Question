# react-constructor-super

> 参考链接：https://www.zhihu.com/question/282019729

### 题目

react constructor中super的作用，如果不写super会有什么问题



### 解题

#### 思路

* super是执行父类构造器的方法，因为子类的构造器内是没有 this 的，子类构造器要使用 this 则必须通过 super() 来调用父类的 constructor()。
* 如果子类不写构造器则会使用父类的构造器，所以不写constructor的话就可以不写super
* 但如果写constructor但不写super则会没有this，报错
* 而react的Component类构造器要求必须传入props如果不传则无法获取上下文，可以运行但是没有办法获取props。

#### 代码



### 思考



### 扩展

