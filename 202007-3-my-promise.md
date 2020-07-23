# 手写Promise

> 参考链接：
>
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
>
> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises

`Promise`是一个对象，代表了一个异步操作的最终完成或者失败。本质上`Promise`是构造函数`Promise`返回的对象，我们在生成实例时，在这个对象上绑定回调函数，使其能够根据自己的状态执行对应的操作

## Promise构造函数

`Promise`构造函数生成一个`Promise`对象，这个对象是一个代理对象(代理一个值)，代理的值可以在初期时未知的，在异步操作后，根据绑定的方法修改状态，执行对应的回调。

`Promise`构造函数的参数是一个`executor`，这是一个函数，`function(resolve, reject) {...}`，`Promise`构造函数执行是会立即执行这个函数，并且将这两个函数作为参数传递给它（executor 函数在Promise构造函数返回所建promise实例对象前被调用）。

`Promise`对象有三个状态，`pending、fulfilled、rejected`，，初始值是`pending`，有两个函数可以修改这个值，就是初始传入`executor`这个函数的`reslove`和`reject`

* 调用了`resolve`之后，状态修改为`reslove`并执行原型方法的`Promise.prototype.then中的第一个函数`

* 调用了`reject`之后，将状态修改为`reject`并执行原型方法`Promise.prototype.then中的第二个函数或者Promise.prototype.catch`

`executor`函数内部经常有一些异步操作，异步操作完成后，根据结果执行`reslove`和`reject`函数，如果执行这个函数报错，则直接`reject`

根据以上特性，完成`Promise`构造函数

```javascript
function MyPromise(executor) {
	this.status = PENDING; // 初始Promise实例为pending状态

	this.value = void 0; // 成功之后的值
	this.reason = void 0; // 失败之后的原因

	this.onFulfilledArr = []; // 成功回调数组
	this.onRejectedArr = []; // 失败回调数组

	let resolve = function (value) {
		if (this.status !== PENDING) return; // 状态不是pending，则修改状态失败
		this.status = FULFILLED // 修改状态为完成
		this.value = value; // 保存成功之后的值

		// 执行成功回调
		while(this.onFulfilledArr.length){
			this.onFulfilledArr.shift()()
		}
	};

	let reject = function (reason) {
		if (this.status !== PENDING) return; // 状态不是pending，则修改状态失败
		this.status = REJECTED // 修改状态为失败
		this.reason = reason // 保存失败的原因

		// 执行失败回调
		while(this.onRejectedArr.length){
			this.onRejectedArr.shift()()
		}
	};
	try{
		executor(resolve.bind(this), reject.bind(this))
	} catch(e) {
		reject.bind(this)(e)
	}
}
```

## Promise原型方法

跟随promise实例的方法，生成实例之后可以调用

### then函数

用于给promise对象绑定状态确定后的回调函数，可传入成功的回调和失败的回调

```javascript
MyPromise.prototype.then = function(onFulfilled = value => value, onRejected = reason => {throw new Error(reason)}) {
	let func = (fn, value, source, resolve, reject) => {
		try{
			let nextValue = fn(value);
			/**
			 * 对nextValue进行判断
			 * 如果是一个普通值，则是返回这个值
			 * 如果是一个promise，则根据这个promise的返回结果决定调用resolve和reject
			 */
			resolvePromise(source, nextValue, resolve, reject); // 返回给下一个then
		} catch(e) {
			reject(e)
		}
	}

	let funcMap = {
		[FULFILLED]: (source, resolve, reject) => func(onFulfilled, this.value, source, resolve, reject),
		[REJECTED]: (source, resolve, reject) => func(onRejected, this.reason, source, resolve, reject),
	}
	
	let nextPromise = new MyPromise((resolve, reject) => {
		// 判断状态
		if(funcMap[this.status]){
			// ！！！！ TODO 这里使用一个setTimeout来使下面代码异步，不是最优解，因为这样破坏了宏任务和微任务的执行
			setTimeout(() => {
				funcMap[this.status](nextPromise, resolve, reject);
			}, 0)
			return 
		}
		this.onFulfilledArr.push(() => setTimeout(() => {
			funcMap[FULFILLED](nextPromise, resolve, reject);
		}, 0));
		this.onRejectedArr.push(() => setTimeout(() => {
			funcMap[REJECTED](nextPromise, resolve, reject);
		}, 0));
	});
	return nextPromise
}
```

### finally函数

* 不论状态变为什么，都会执行传入的回调函数
* 如果回调函数返回是一个promise，则等待promise的状态确定再执行后面的then

```javascript
MyPromise.prototype.finally = function (cb) {
	return this.then(value => {
		return MyPromise.resolve(cb()).then(() => value);
	}, reason => {
		return MyPromise.resolve(cb()).then(() => {throw reason});
	})
}
```

### catch函数

* 失败之后的回调，利用then的方法实现

```javascript
MyPromise.prototype.catch = function (onRejected) {
	this.then(undefined, onRejected)
}
```

## Promise静态方法

绑定在Promise构造函数的方法

### all函数

* 根据传入值的不同而不同，传入参数为一个可迭代对象
  * 传入普通值，返回该值
  * 传入promise，返回这个promise的结果
* 等待所有结果返回一起返回，返回顺序与传入顺序相同
* 如果有一个出错则rejected

```javascript
MyPromise.all = function (arr) {
	let result = [], index = 0;
	return new Promise((resolve, reject) => {
		function addData(i, data, resolve) {
			result[i] = data;
			index++;
			if (index === arr.length) {
				resolve(result)
			}
		}
		for (let i = 0; i < arr.length; i++) {
			let value = arr[i]
			if (value instanceof MyPromise) {
				value.then((data) => {
					addData(i, data, resolve)
				}, reject)
				continue;
			}
			addData(i, value, resolve)
		}
	})
}
```

### allSettled函数

* 相对于`all`，这个能拿到所有的结果，而不是一个失败全部失败
* 传入参数为一个可迭代对象，返回为1个对象，`{status, value}`
* `status`标示promise的状态，`fulfilled`和`rejected`，`value`标示promise的返回值
* 如果数组中有不为promise的值，则返回`{status: 'fulfilled', value: 传入值}`这样的对象

```javascript
// 基于all进行修改，实现比较简单
MyPromise.allSettled = function (arr) {
	let result = [], index = 0;
	return new Promise((resolve, reject) => {
		function addData(i, data, status, resolve) {
			result[i] = {
        status,
        value: data
      };
			index++;
			if (index === arr.length) {
				resolve(result)
			}
		}
		for (let i = 0; i < arr.length; i++) {
			let value = arr[i]
			if (value instanceof MyPromise) {
				value.then((data) => {
					addData(i, data, 'fulfilled', resolve)
				}, (reason) => {
          addData(i, reason, 'rejected', resolve)
        })
				continue;
			}
			addData(i, value, 'fulfilled', resolve)
		}
	})
}
```

### race函数

* 相当于赛跑，谁先到就是谁，不关心第二名
* 传入参数为一个可迭代对象，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
* 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则` Promise.race` 将解析为迭代中找到的第一个值。
* 如果传的迭代是空的，则返回的 promise 将永远等待。

```javascript
MyPromise.race = function (arr) {
	let result = [], index = 0;
	return new Promise((resolve, reject) => {
		for (let i = 0; i < arr.length; i++) {
			let value = arr[i]
			if (value instanceof MyPromise) {
				value.then(resolve, reject)
				continue;
			}
      resolve(value)
		}
	})
}
```

### resolve函数

* 如果本身是一个promise则返回这个promise
* 如果是一个普通纸则返回包裹这个值的一个新promise实例，状态为完成

```javascript
Promise.resolve = function (value) {
	if (value instanceof MyPromise) {
		return value
	}
	return new MyPromise((reslove) => {
		reslove(value)
	})
}
```

### reject函数

* 如果本身是一个promise则返回这个promise
* 如果是一个普通纸则返回包裹这个值的一个新promise实例，状态为拒绝

```javascript
Promise.resolve = function (value) {
	if (value instanceof MyPromise) {
		return value
	}
	return new MyPromise((reslove, reject) => {
		reject(value)
	})
}
```

