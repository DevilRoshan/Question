# js-reference-type-print

### 题目

下列console.log的输出

```
let obj = {
  a: 1,   
  b: {c: 2, d: 3}  
}  
let objCache = {obj}  
let objCopy = Object.assign({},obj)  
let objCopy2 = JSON.parse(JSON.stringify(obj))  
obj.a = 4  
obj.b.c = 5  
console.log(objCache.obj.a) 
console.log(objCache.obj.b.c) 
console.log(objCopy.a) 
console.log(objCopy.b.c) 
console.log(objCopy2.a) 
console.log(objCopy2.b.c)
```



### 解题

#### 思路

* 引用类型被拷贝只会拷贝指针，深拷贝拷贝的才是地址
* {obj}，创建一个属性名为obj属性为obj指针的对象
* Object.assign({},obj)，返回一个新对象，对obj的第一层进行深拷贝，第一层如果为引用类型，则依然拷贝指针
* JSON.parse(JSON.stringify(obj))，返回一个新对象，先将对象转换为字符串再解析为对象，则产生了一个与原对象完全无关联的新对象

#### 代码

```
console.log(objCache.obj.a) // 4
console.log(objCache.obj.b.c) // 5
console.log(objCopy.a) // 1
console.log(objCopy.b.c) // 5
console.log(objCopy2.a) // 1
console.log(objCopy2.b.c) // 2
```





### 思考

* jsAPI的使用，以及引用类型的复制



### 扩展

* 关于对象在内存中的保存，堆和栈，有空做一期周任务