# canvas-one-px-vague

> 参考链接：[http://jo2.org/html5-canvas%e7%94%bb%e5%9b%be3%ef%bc%9a1px%e7%ba%bf%e6%9d%a1%e6%a8%a1%e7%b3%8a%e9%97%ae%e9%a2%98/](http://jo2.org/html5-canvas画图3：1px线条模糊问题/)

### 题目

canvas 线偏移0.5的模糊问题



### 解题

#### 思路

* 首先是问题原因
  * canvas的每条线都有一条无限细的“**中线**”，线条的宽度是从中线向两侧延伸的。
  * 所以canvas的中线如果是在像素块边上，那么就会模糊
* 知道了问题原因，那么解救就好解决了，无非是中线的位置出现问题，而且一般问题是最外面渲染的像素块只渲染了一半，那么就让他渲染满就好了，移动中线到不模糊的位置。
* 一般使线宽为1的时候会出现这个问题，所以偏移0.5，但是具体线宽要具体来看，有可能是其他小数造成

#### 代码

```
var ctx = canvas.getContext('2d');
ctx.translate(0.5, 0.5);

ctx.moveTo(100.5,100.5);
ctx.lineTo(200.5,100.5);
ctx.lineTo(200.5,200.5);
ctx.lineTo(100.5,200.5);
ctx.lineTo(100.5,100.5);
ctx.closePath();
ctx.lineWidth = 1;
ctx.strokeStyle = 'rgba(255,0,0,0.5)';
ctx.stroke();
```



### 思考



### 扩展

