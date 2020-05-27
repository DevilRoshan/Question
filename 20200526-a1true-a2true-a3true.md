# a1true-a2true-a3true

> 参考链接：
>
> https://github.com/azl397985856/fe-interview/issues/22
>
> https://cloud.tencent.com/developer/article/1412042
>
> https://www.cnblogs.com/shapeY/p/9239627.html



### 题目

在 JavaScript 中， (a ==1 && a== 2 && a==3) 是否有可能为 true ？



### 解题

#### 思路[1] == 转换规则

* js在判断 == 的时候会有转换规则
* 如果要比较的两个项是同种类型的，那么 == 就会返回 === 操作符的执行结果。
* 如果要比较的两个项是不同类型的，== 就会对其中一个或两者都进行类型转换然后再比较。
  * ```undefined == null```
  * ```string``` 和```number``` ：将 `string` 转为 `number` ，如果是 string 则转换成对应的 number，空字符串转换为 0，无法转换的则为 NaN
  * ```boolean```：将 `boolean` 转为 `number` ，`0/1` 如果是 boolean 则转换成 0 或 1
  *  `object` ：将 `object` 转为其原始值 `primitive` ，默认调用 `valueOf` 方法，然后是 `toString` 方法；如果对象是 `Date` 类型或对象的期望类型为 `string`，那么先调用 `toString` 方法

#### 代码

```
// 对象
var a = {
	value: 1,
	valueOf: function()  {
		return this.value++;
	}
}
(a ==1 && a== 2 && a==3); // true

// 数组
var a =[1,2,3];
a.join = a.shift;
(a ==1 && a== 2 && a==3); // true

// Symbol
var a = {
	[Symbol.toPrimitive]: ((i) => () => ++i) (0)
};
(a ==1 && a== 2 && a==3); // true
```

#### 思路[2]getter

* 通过defineProperty添加get和set属性，自定义get和set方法。
* 有了getter和setter我们就能够在属性值的变更和获取时实现一些操作。
* 此例就是把get方法重新，让其每次+1

#### 代码

```
var temp = 1;
Object.defineProperty(window, 'a', {
    get: function() { // 每次取值，temp+1
        return this.temp++
    }
});
(a ==1 && a== 2 && a==3); // true
(a === 1 && a === 2 && a === 3); // true
```

#### 思路三[3]变量

* 空格处理，变量不同`  a_  a  _a 下划线代表空格`

#### 代码

```
var aﾠ = 1;
var a = 2;
var ﾠa = 3;
(aﾠ==1 && a== 2 &&ﾠa==3)
```



### 思考

* 主要是记住`==`的转化规则和各种类型相互转换调用的方法
* getter的思路应该熟记



### 扩展

* 使用with进行判断

```
with({
  get a() {
    return Math.floor(Math.random()*4);
  }
}){
  for(var i=0;i<1000;i++){
    if (a == 1 && a == 2 && a == 3){
      console.log("after "+(i+1)+" trials, it becomes true finally!!!");
      break;
    }
  }
}
```

* 类型转换

### **转换为 number**

1. `undefined` ： `NaN` 如果是 undefined 则直接转换成 NaN
2. `null` ： `0` 如果是 null 则转换成 0
3. `boolean` ： `0/1` 如果是 boolean 则转换成 0 或 1
4. `string` ： `0/NaN/(parse to number)` 如果是 string 则转换成对应的 number，空字符串转换为 0，无法转换的则为 NaN
5. `object` ：首先获取原始值然后再转为 number
6. `date`：调用`date.getTime()`转换为number

### **转换为 string**

1. `undefined` ： `'undefined'`
2. `null` ： `'null'`
3. `number` ： `'number`
4. `boolean` ：`'true'/'false'`
5. `object` ： 首先获取原始值，然后转为 string

### **转为 boolean**

常见的问题：哪些是 falsy 哪些是 truthy：

1. `undefined` ： `false`
2. `null` ： `false`
3. `number` ： 当为 0 时 `false` 否则为 `true`
4. `string` ： 当为空字符串时为 `false` 否则为 `true`
5. `object` ： `true`
6. `array` ： `true`
7. `Date` ： `true`