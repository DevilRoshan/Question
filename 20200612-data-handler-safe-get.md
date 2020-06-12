# data-handler-safe-get

### 题目

请你完成一个safeGet函数，可以安全的获取无限多层次的数据，一旦数据不存在不会报错，会返回undefined，例如

```
var data = { a: { b: { c: 'test' } } }
safeGet(data, 'a.b.c') // test
safeGet(data, 'a.b.c.d') // undefined
safeGet(data, 'a.b.c.d.e.f.g') // undefined
```



### 解题

#### 思路[1]递归

* 递归获取属性。取不到就return undefined

#### 代码

```
var safeGet = function(data, path){
	return dataHanler(data, 0, path.split('.'))
}

var dataHanler = function(data, index, arr){
	if(!data[arr[index]]){
		return void 0
	}
  if(index === arr.length - 1){
  	return data[arr[index]]
  }
	return dataHanler(data[arr[index]], index+1, arr)
};
```

#### 思路[2]try-catch

* 如果查不到对应属性，会报错，用try-catch获取到错误然后修改返回结果

#### 代码

```
var safeGet = function(data, path){
	try{
		return path.split('.').reduce((acc, cur) => acc[cur], data)
	} catch(e) {
		return void 0
	}
}
```



### 思考

* 参考题解是通过遍历回溯然后找到公共子集？然后生成一个一个set，最后找出最长的set，并不理解这么做的原因和结果的合理性，等看明白回溯法的作用也许会有所思考，这里暂时存疑

### 扩展

* 题解中的backtrack回溯法解题看明白了却并不知道用处，接下来遇到类似的题要仔细看看