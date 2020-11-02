# http 
## 概述
> ## http 是 node 内置模块
```js

  const http = require('http');
  http
    .createServer(function (req,res) {
      res.writeHead('200');
      res.end('Hello world')
    })
    .listen(3000)

```
> ## express 是一个 http 框架

> ## 核心功能：

>> ### 路由；

>> ### request/response 简化
  >>> * request: pathname, query 等
  >>> * response: send(),json(),jsonp()等

## 304缓存策略

> ## KOA 
### 特性： 1. 中间件  2.context 封装了request 和 response 
```js
ctx.status = 200;
ctx.body = "hello world";
```
>## RPC 调用

1. 服务器之间的通信 -- RPC
2. 浏览器和服务器之间的通信 --- Ajax
