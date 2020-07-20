# code-promise-all

### 题目

promise.all代码实现



### 解题

#### 思路

* 返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
* 有一个出错，就被认定为失败。
* 返回的是一个promise。
* 参数是一个**iterable**，可迭代的对象，而且期望每个都是promise，如果不是会直接放入结果集。

#### 代码

```
const MyPromiseAll = function(arr) {
	let result = [], index = 0;
	return new Promise((resolve,reject)=>{
		function addData(i, data, resolve) {
			result[i] = data;
			index++;
			if(index === arr.length){
				resolve(result)
			}
		}
		for(let i = 0; i < arr.length; i++){
			let value = arr[i]
			if(value instanceof Promise){
				value.then((data) => {
					addData(i, data, resolve)
				},reject)
			}else{
				addData(i, value, resolve)
			}
		}    
	})
}
```



### 思考

* 其实把握好promise.all的表现是可以实现这个
* 注意点在于promise的参数，是否是pormise的判断



### 扩展

