const koa = require('koa');
const bodyparser=require('koa-bodyparser');
const static = require('koa-static');

const app = new koa();

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));

app.use(static(__dirname + '/public'))

app.use(async (ctx, next) =>{
  await next();
  console.log(ctx.request.body);
  let returnData = ctx.request.body;
  ctx.body = returnData;
})

app.listen(3000);



