# same-origin-policy

> 参考链接：https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy

### 题目

同源策略是什么，以及哪些标签有同源策略，哪些没有



### 解题

#### 思路

- **同源策略**是一个重要的安全策略，它用于限制一个[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/源)的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。
- 如果两个 URL 的 [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)、[port](https://developer.mozilla.org/en-US/docs/Glossary/port) (如果有指定的话)和 [host](https://developer.mozilla.org/en-US/docs/Glossary/host) 都相同的话，则这两个 URL 是*同源*。这个方案也被称为“协议/主机/端口元组”，或者直接是 “元组”。（“元组” 是指一组项目构成的整体，双重/三重/四重/五重/等的通用形式）。
- 两个不同的域名指向同一个 ip 地址，也非同源。
- **同源策略限制内容有**
  - canvas
  - ajax
  - Cookie、LocalStorage、IndexedDB
  - dom
- **同源策略不限制的内容**
  - script
  - link
  - img
  - video，audio
  - font-face
  - iframe

#### 代码



### 思考

* 一般只有操作canvas的图片问题会需要格外注意图片的域，因为非同源的图片是不能画到canvas上的。
* 接口遇到的跨域一般是通过后台来解决，具体的跨域方案，明天详细解释