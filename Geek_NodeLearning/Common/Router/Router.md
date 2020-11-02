# Router 路由

## 概述

> * 我们要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码。
> * 因此，我们需要查看HTTP请求，从中提取出请求的URL以及GET/POST参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。

> * 我们需要的所有数据都会包含在request对象中，该对象作为onRequest()回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的Node.JS模块，它们分别是url和querystring模块。

``` js
var url = require('url');
var querystring = require('querystring')

var string = "http://localhost:8888/start?foo=bar&hello=world";

let queryParams = url.parse(string).query; // foo=bar&hello=world
let pathname = url.parse(string).pathname; // start

let param1 = querystring(string)['foo']; // bar

let parms2 = querystring(string)['hello']; // world

```

