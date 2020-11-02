const Koa = require("koa");

const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx, next) => {
  await next();
  ctx.response.status = 200;
  ctx.response.message = "Success";
  ctx.response.type = "text/html";
  ctx.body = "Hello, Zoey";
});

app.on("error", err => {
  log.error("server error", err);
});

app.listen(8888);
