# js-code-class

> 出自小程序前端面试星球
>

### 题目

```javascript
// 以下代码输出
class Person {
  static str = 'static_str';

	say = () => {
    throw new Error('Need To Implement')
  }
}

class Student extends Person(){
  constructor(){
    super();
  }
  
  say(){
    console.log(Student.str)
  }
}

const lihua = new Student();
console.log(Student.str);
lihua.say()
```



### 解题

#### 思路

* es中的extends是继承静态属性的，所以`Student.str === Person.str`
* 在class使用`=`声明属于`Field declarations`的语法，这样声明的语法优先于原型链

#### 代码

```javascript
// 以下代码输出
class Person {
  static str = 'static_str';

	say = () => {
    throw new Error('Need To Implement')
  }
}

class Student extends Person{
  constructor(){
    super();
  }
  
  say(){
    console.log(Student.str)
  }
}

const lihua = new Student();
console.log(Student.str); // 'static_str'
lihua.say() // Need To Implement
```



### 思考

* 有关于`Field declarations`，可以看
  * https://zhuanlan.zhihu.com/p/47310567
  * https://github.com/tc39/proposal-class-fields