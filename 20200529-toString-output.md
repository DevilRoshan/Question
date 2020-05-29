# javaScript-execution-engine

> 参考链接：
>
> https://www.jianshu.com/p/cb9c3e6a994b
>
> https://blog.csdn.net/qq_18661257/article/details/70145855

### 题目

```
// 写出代码执行结果
3.toString()
3..toString()
3...toString()
```



### 解题

#### 思路

* `3.`是一个合法的数字，当`JavaScript`编译器检测到一个数字后面有点号时会默认为你是在写一个浮点数，故而`3.`是一个合法数字。所以，才有了以下的结论
* `3.toString()`，其实就是` (3.)toString()`无效的调用
* `3..toString()` 其实就是` (3.).toString()` 输出3
* `3...toString()` 其实就是` (3.)..toString()` 语法错误

#### 代码

```
error, '3', error
```



### 思考

* 主要是`.`的处理方法，将数字后接`.`处理为浮点数，才有这道题

### 扩展

* js编译器在从左到右处理字符，遇到空格或者tab都会跳过，遇到`.`则寻找上下文，如果上文是一个数字[不是处理后的数字]，则将其视为浮点数，否则认为调用方法
* `1 . toString()`在1后面加了空格，js现将1处理完成，则`1 .`不会被认为一个数字。