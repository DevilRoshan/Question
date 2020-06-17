# code-instanceof

### 题目

实现instanceof



### 解题

#### 思路

instanceof 检测一个函数的**原型**是否存在与另一个对象的**原型链**当中

#### 代码

```
function instanceof(obj, Constructor) {
	var proto = Object.getPrototypeOf(obj);
	while(true){
		if(proto === null) return false; // 找到了最后
		if(proto === Constructor.prototype) return true;
		proto = Object.getPrototypeOf(proto)
	}
}
```





### 思考

* 也可以通过`__proto__`获取原型属性
* 一个实例对象的原型存在对象的`__proto__`中，且指向他构造函数的`prototype`。



### 扩展