# canvas-svg-difference

### 题目

canvas和svg区别



### 解题

#### 思路

- 从图像类别区分，Canvas是基于像素的位图，而SVG却是基于矢量图形。可以简单的把两者的区别看成photoshop与illustrator的区别。 
- 从结构上说，Canvas没有图层的概念，所有的修改整个画布都要重新渲染，而SVG则可以对单独的标签进行修改，更像是DOM。 
- 从操作对象上说，Canvas是基于HTML canvas标签，通过宿主提供的Javascript API对整个画布进行操作的，而SVG则是基于XML元素的。 
- 从功能上讲，SVG发布日期较早，所以功能相对Canvas比较完善。 
- 关于动画，Canvas更适合做基于位图的动画，而SVG则适合图表的展示。 

#### 代码



### 思考

* 因为XML对现在的前端程序员更为陌生，主要是了解一下，以后有需求记得有这种实现方式