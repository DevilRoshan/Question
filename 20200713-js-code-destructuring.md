# js-code-destructuring3

> 出自小程序前端面试星球

### 题目

```
let yd = {x: 1, y: 2};

// 以下代码会抛出异常吗
let ydWithGetter1 = {
	...yd,
	get x() {
		throw new Error();
	}
}
let ydWithGetter2 = {
	...yd,
	...{
    get x() {
      throw new Error();
    }
	}
}
```





### 解题

#### 思路

* `ydWithGetter1`不会异常，`ydWithGetter2`会出现异常
* 解构赋值的原理是使用get获取目标数据，然后使用set设置数据，所以出现异常
* Object.assign也是同样的原理

#### 代码

```
// 第一段代码等价于，所以不会把偶凑
let ydWithGetter1 = {}
Object.assign(ydWithGetter1, yd);
Object.defineProperty(ydWithGetter1, "x", {
	get(){throw new Error()},
	enumerable: true,
	configurable: true,
})
```





### 思考

