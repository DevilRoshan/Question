# duplicate-array-sort

> 参考链接：https://github.com/azl397985856/fe-interview/blob/master/docs/daily/2019-07-22.md

### 题目

完成duplicate函数， 使之功能符合

```
完成 duplicate 函数， 使之功能复合 duplicate([1,2,3,4,5]); // [1,1,2,2,3,3,4,4,5,5]
```



### 解题

#### 思路[1] jsAPI

* js的concat和push等都能实现添加，然后sort即可

#### 代码

```
var duplicate = function(nums) {
	return nums.concat(nums).sort((a, b) => a - b)
}
```

#### 思路[2]双指针

* 双指针，快慢指针，快指针指向数组需要新加的位置，慢指针指向数组最后一项即要添加的项

#### 代码

```
var duplicate = function(nums) {
  for(let i = list.length - 1, j = list.length * 2 - 1; i >= 0; i--, j--){
  	list[j] = list[i];
  	list[--j] = list[i];
  }
  return list;
}
```



### 思考



### 扩展