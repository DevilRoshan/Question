# canvas-one-px-value

> 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

### 题目

canvas如何获取某个像素块的颜色



### 解题

#### 思路

* 同过API获取canvas数据
* 这个方法会返回一个ImageData`对象`，它代表了画布区域的`对象`数据

#### 代码

```
var myImageData = ctx.getImageData(left, top, width, height);
```



### 思考



### 扩展

