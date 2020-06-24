# js-sort-quickly

### 题目

js实现快速排序



### 解题

#### 思路

- 将第一个数拿出来存储为`tmp`
- 然后与从`right`处开始遍历，找到比`tmp`小的数然后互换，同时将`left++`
- 再从`left`处开始遍历，找出比`tmp`大的数然后互换，将`right--`
- 直到`left===right`即从左到右都与`tmp`比较过，而且`left`左边为比他小的数，右边为比他大的数。不断重复直到传入的边界值相等
- 核心思路
  - 将第一个数存储起来，这时第一个位置就空了，
  - 从后面找到比`tmp`小的数无论顺序换到前面，这时后面一个数的位置就空了，
  - 从前面找一个比`tmp`大的数填充到后面，这时前面又空了，
  - 重复过程，知道左右相等，即前面都是比`tmp`小的，后面都是比`tmp`大的。

#### 代码

```
function quick_sort(arr, left, right){
	if(left < right){
		var i = left;
		var j = right;
		var tmp = arr[left];
		while(i < j){
			while(tmp <= arr[j] && i < j){
				j--;
			}
			if(i < j){
				arr[i] = arr[j];
				i++;
			}
			while(tmp >= arr[i] && i < j){
				i++;
			}
			if(i < j){
				arr[j] = arr[i];
				j--;
			}
		}
		arr[i] = tmp;
		quick_sort(arr, left, i - 1)
		quick_sort(arr, i+1, ight)
		return arr
	}
}
```



### 思考

