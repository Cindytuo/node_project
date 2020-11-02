// const express = require('express');
const koa = require('koa');
const mount = require("koa-mount"); // koa-mount 路由中间件

// const app = express();
const app = new koa();
const middleKoa = new koa();

app.use(mount('/', middleKoa));

middleKoa.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(1.1);
});

middleKoa.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(2.2);
});

middleKoa.use( async (ctx, next) => {
  await new Promise(resolve =>{
    setTimeout(()=>{
      console.log(3);
      resolve();
    }, 1000);
  })
});

app.listen(3000, () => console.log('listening 3000'));