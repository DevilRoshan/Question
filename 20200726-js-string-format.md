# js-string-format

### 题目

补全代码，实现效果

```javascript
const str = '1234567890';
function formatNumber(str){
  
}
console.log(formatNumber(str)) // 1,234,567,890
```



### 解题

#### 思路

* toLocaleString：还不错
* Intl：兼容性差
* replace：使用正则，可以直接正则达到效果，也可以先将数字分为前后2部分
* 迭代：无非就是倒叙，每三个添加逗号

#### 代码

```javascript
// toLocaleString
const str = '1234567890';
function formatNumber(str){
  return Number(str).toLocaleString('en-US')
}
console.log(formatNumber(str)) // 1,234,567,890

// Intl
const str = '1234567890';
function formatNumber(str){
  return Intl.NumberFormat().format(str)
}
console.log(formatNumber(str)) // 1,234,567,890

// replace1
const str = '1234567890';
function formatNumber(str){
  let i = str,
    j = i.length > 3 ? i.length % 3 : 0;
  return (j ? `${i.substr(0, j)},` : "") + i.substr(j).replace(/(\S{3})(?=\S)/g, "$1"+',');
}
console.log(formatNumber(str)) // 1,234,567,890
// replace2
const str = '1234567890';
function formatNumber(str){
  return str.replace(/\B(?=(\d{3}))+(?!\d)/g, ',')
}
console.log(formatNumber(str)) // 1,234,567,890

// 迭代1
const str = '1234567890';
function formatNumber(str){
  return str.split('').reverse().reduce((acc, cur, index) => {
    return (index % 3 ? cur : (cur + ',')) + acc
  })
}
console.log(formatNumber(str)) // 1,234,567,890
// 迭代2
const str = '1234567890';
function formatNumber(str){
  let i = str.length - 1, cnt = 0, str1 = '';
  while(i >= 0){
    str1 = str[i] + str1;
    cnt++;
    i--;
    if(cnt === 3){
      cnt = 0;
      str1 = ',' + str1
    }
  }
  return str1
}
console.log(formatNumber(str)) // 1,234,567,890
```



### 思考

* 一般应用在资产上面