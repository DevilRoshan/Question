# promise-all-code

> 参考链接：https://blog.csdn.net/qq_41409353/java/article/details/105524162

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
function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';  
}

const myPromiseAll = (arr)=>{
    let result = [];
    return new Promise((resolve,reject)=>{
        for(let i = 0;i < arr.length;i++){
            if(isPromise(arr[i])){
                arr[i].then((data)=>{
                    result[i] = data;
                    if(result.length === arr.length){
                        resolve(result)
                    }
                },reject)
            }else{
                result[i] = arr[i];
            }
        }    
    })
}
```



### 思考

* 其实把握好promise.all的表现是可以实现这个
* 注意点在于promise的参数，是否是pormise的判断



### 扩展

