# css-text-hidden

### 题目

css 单行多行隐藏文本，显示省略号



### 解题

#### 思路

#### 代码

```
// 单行
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;

// 多行 // 属性可能有兼容问题
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```





### 思考

