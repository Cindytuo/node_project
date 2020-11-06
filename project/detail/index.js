const koa = require("koa");
const fs = require("fs");
const static = require("koa-static");
const vm = require("vm"); // 配合模板字符串输出 ejs 格式处理；

// vm.runInNewContext(template);  处理输出，进行编译；
