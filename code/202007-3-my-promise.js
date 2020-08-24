const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(nextPromise, res, resolve, reject) {
	if (nextPromise === res) {
		return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
	}
	if (res instanceof MyPromise) { // promise
		res.then(resolve, reject)
	} else { // 普通值
		resolve(res)
	}
}

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
		while (this.onFulfilledArr.length) {
			this.onFulfilledArr.shift()()
		}
	};

	let reject = function (reason) {
		if (this.status !== PENDING) return; // 状态不是pending，则修改状态失败
		this.status = REJECTED // 修改状态为失败
		this.reason = reason // 保存失败的原因

		// 执行失败回调
		while (this.onRejectedArr.length) {
			this.onRejectedArr.shift()()
		}
	};
	try {
		executor(resolve.bind(this), reject.bind(this))
	} catch (e) {
		reject.bind(this)(e)
	}
}

MyPromise.prototype.then = function (onFulfilled = value => value, onRejected = reason => { throw new Error(reason) }) {
	let func = (fn, value, source, resolve, reject) => {
		try {
			let nextValue = fn(value);
			/**
			 * 对nextValue进行判断
			 * 如果是一个普通值，则是返回这个值
			 * 如果是一个promise，则根据这个promise的返回结果决定调用resolve和reject
			 */
			resolvePromise(source, nextValue, resolve, reject); // 返回给下一个then
		} catch (e) {
			reject(e)
		}
	}

	let funcMap = {
		[FULFILLED]: (source, resolve, reject) => func(onFulfilled, this.value, source, resolve, reject),
		[REJECTED]: (source, resolve, reject) => func(onRejected, this.reason, source, resolve, reject),
	}

	let nextPromise = new MyPromise((resolve, reject) => {
		// 判断状态
		if (funcMap[this.status]) {
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

MyPromise.prototype.catch = function (onRejected) {
	this.then(undefined, onRejected)
}

MyPromise.prototype.finally = function (cb) {
	return this.then(value => {
		return MyPromise.resolve(cb()).then(() => value);
	}, reason => {
		return MyPromise.resolve(cb()).then(() => {throw reason});
	})
}

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

MyPromise.resolve = function (value) {
	if (value instanceof MyPromise) {
		return value
	}
	return new MyPromise((reslove) => {
		reslove(value)
	})
}

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


// test
// let promise = new MyPromise((reslove, reject) => {
// setTimeout(() => {
// 	reslove('成功promise')
// }, 1000)
// setTimeout(() => {
// 	reject('失败promise')
// }, 1000)
// reject('失败')
// throw new Error('1111111')
// })

// function other(){
// 	return new MyPromise((reslove, reject) => {
// setTimeout(() => {
// reslove('成功other')
// }, 1000)
// reject('失败')
// 	})
// }

// promise.then(value => {
// 	console.log('value1', value);
// 	// throw new Error('22222')
// }, reason => console.log('reason1', reason.message)).then(value => {
// 	console.log('value2', value);
// }, reason => console.log('reason2', reason.message));

// let p1 = promise.then().then().then(value => {
// 	console.log('value1', value);
// 	return 10000
// }, reason => {
// 	console.log('reason1', reason);
// 	return 20000
// }).then(value => console.log('value2', value), reason => console.log('reason2', reason))
// p1.then(value => console.log('value2', value), reason => console.log('reason2', reason))
// promise.then(value => console.log('value2', value), reason => console.log('reason2', reason))
// promise.then(value => console.log('value3', value), reason => console.log('reason3', reason))

let p1 = () => {
	return new MyPromise((reslove, reject) => {
		setTimeout(() => {
			reslove('p1')
		}, 1000)
		// reject('失败')
	})
}

let p2 = () => {
	return new MyPromise((reslove, reject) => {
		setTimeout(() => {
			reject('p2')
		}, 3000)
		// reject('失败')
	})
}

// MyPromise.all([p1(), p2(), 'c', 'a', 'b', ]).then(value => console.log(value))
// MyPromise.allSettled([p1(), p2(), 'c', 'a', 'b', ]).then(value => console.log(value))
MyPromise.race([p1(), p2()]).then(value => console.log(value))