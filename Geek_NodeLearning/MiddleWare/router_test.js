const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');
const static = require('koa-static');

const app = new koa();
const router = new Router(); // 初始化 router

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.use(static(__dirname + '/public'));

app.use(router.routes()); // 加载 router 中间件
app.use(router.allowedMethods()); // 对异常码处理

router.get('/', async (ctx, next)=>{
  ctx.render('index');
  
})

router.get('/item', async (ctx,next) =>{
  ctx.body='首页'
  console.log(ctx.query);
  console.log(ctx.querystring);
  console.log(ctx.url);

  //ctx里面的request里面获取get传值
 
  console.log('request1',ctx.request.url);
  console.log('request2',ctx.request.query);   //{ aid: '123', name: 'zhangsan' }  对象
  console.log('request3',ctx.request.querystring);   //aid=123&name=zhangsan
})

// 请求方式 http:// 域名 /product/123
router.get('/product/:aid', async (ctx)=>{
  console.log(ctx.params); // {aid:123} 获取动态数据
  ctx.body = '这是商品页面'
});


router.post('/test1', async (ctx, next)=>{
  let returnData = ctx.request.body;
  console.log(ctx,request.body);
  ctx.body = returnData;
});

app.listen(3000)