# 继承，原型，原型链

> 参考链接：
>
> https://github.com/mqyqingfeng/Blog/issues/2
>
> https://github.com/mqyqingfeng/Blog/issues/16

### 原型

每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型。

对象的创建过程，是new 构造函数，这个过程中，一般会涉及到下面三个属性`__proto__`、`prototype`和`constructor`

#### `__proto__`

`__proto__`属性是对象的属性，这个属性会指向该对象的原型。

#### `prototype`

`prototype`是函数才会有的属性，它指向一个对象，这个对象就是以这个函数为构造函数生成实例对象的原型

#### `constructor`

`constructor`是**原型**的属性，它指向关联的构造函数

所以三者有以下关系

```
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor == Person) // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype) // true
```

#### 注意：

* `constructor`不是生成实例对象的属性，之所以实例对象可以访问`constructor`是通过原型来访问到的，这就与下来要说的原型链
* ` __proto__` ，绝大部分浏览器都支持这个非标准的方法访问原型，然而它并不存在于 prototype指向的原型中，实际上，它是来自于 Object.prototype ，与其说是一个属性，不如说是一个 getter/setter，当使用 `obj.__proto__ `时，可以理解成返回了 Object.getPrototypeOf(obj)



### 原型链

因为原型也是一个对象，那么原型对象就有他的原型对象，每个原型对象上都有其相关的`__proto__`指向他的原型，这样一个连着一个就是原型链。

每一个对象都会从原型"继承"属性。即，当读取对象的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。，这也就是原型链的作用了



### 继承

#### 原型链继承

上面讲了原型链的特性，原型链继承就是利用原型链来实现的，即将要继承的父类构造函数的实例对象放在子类构造函数的`prototype`上，这样生成的实例对象就带有可以通过原型链访问父级构造函数的属性。

原型继承的缺点是因为所有子类构造函数都是同一个原型，所以，如果父类构造函数生成的实例中有引用类型的属性，则会被所有实例共享，修改也会同时都修改，而且这种继承没有办法传入参数

```
function Parent () {
    this.name = 'kevin';
}
Parent.prototype.getName = function () {
    console.log(this.name);
}
function Child () {

}
Child.prototype = new Parent();
var child1 = new Child();
console.log(child1.getName()) // kevin
```

#### 借用构造函数(经典继承)

使用call方法在子类构造函数里面调用父类的构造函数方法，有点是避免了原型链的缺点，缺点是每次都会执行一次父类构造函数

```
function Parent (name) {
    this.name = name;
}
function Child (name) {
    Parent.call(this, name);
}
var child1 = new Child('kevin');
console.log(child1.name); // kevin
var child2 = new Child('daisy');
console.log(child2.name); // daisy
```

####组合继承

组合继承 = 原型链继承 + 借用构造函数(经典继承)

这样将两者结合，减少了父类构造函数中要执行的步骤，是经典继承的一种优化，但是却多了一次父类构造函数的执行，一次生成实例，一次子类构造函数中调用

```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child (name, age) {
		// 借用构造函数(经典继承)
    Parent.call(this, name);
    this.age = age;
}
// 原型链继承
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

#### 原型式继承

原型式继承是继承一个对象，与原型链继承相同，原型链继承是继承父类构造函数，将父类构造函数的实例对象进行原型式继承

```
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```

#### 寄生式继承

继承的还是一个对象，创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

#### 寄生组合式继承

寄生组合式继承 = 寄生式继承 + 组合式继承

因为组合式继承每次都会执行2次父类构造函数，这种继承就是针对格式的优化，通过寄生式继承，将父类函数的原型对象传入继承过程的函数，返回的新对象作为子类构造函数的原型

```
// 执行过程
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();


var child1 = new Child('kevin', '18');
console.log(child1);


// 封装方法
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}
// 当我们使用的时候：
prototype(Child, Parent);
```

