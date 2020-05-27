# duplicate-array

> 参考链接：https://github.com/azl397985856/fe-interview/blob/master/docs/daily/2019-07-22.md
>

### 题目

完成duplicate函数， 使之功能符合

```
duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
```



### 解题

#### 思路[1] jsAPI

* js的concat和push等都能实现

#### 代码

```
var duplicate = function(nums) {
	return nums.concat(nums)
}
```

#### 思路[2]遍历

* 遍历往后数组length后添加元素

#### 代码

```
var duplicate = function(nums) {
  const len = nums.length;
  for (let i = len; i < len * 2; i++) {
    nums[i] = nums[i - len];
  }
  return nums;
}
```



### 思考



### 扩展
