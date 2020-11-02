var express = require("express");

var app = express();

app.use(express.static("public"));
app
  .get("/", function(req, res) {
    res.send("Hello, Zoey");
  })
  //  /list_user 页面 GET 请求
  .get("/list_user", function(req, res) {
    console.log("/list_user GET 请求");
    res.send("用户列表页面");
  })

  // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
  .get("/ab*cd", function(req, res) {
    console.log("/ab*cd GET 请求");
    res.send("正则匹配");
  })
  .listen(3000);
