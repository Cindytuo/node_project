const koa = require("koa");
// const mount = require("koa-mount");
const route = require("koa-route");
const fetch = require("node-fetch");

const app = new koa();
// const getMessage = new koa();
// const getSingle = new koa();
// app.use(mount("/", getMessage));
// app.use(mount("/single", getSingle));

const getMessage = async (ctx) => {
  console.log("他来了，请闭眼");
  let params = ctx.request.query,
    spuCode = params && params.spuCode,
    saleChannelId = params && params.saleChannelId,
    result;
  let url = `http://spcare-api.medbanks-test.com/api/trading-product/product/hr/spu?channelCode=${saleChannelId}&spuCode=${spuCode}`;
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      result = json;
    });
  ctx.status = 200;
  ctx.body = result;
};

const getSingle = async (ctx) => {
  console.log("他又来了，请闭眼");
  console.log(ctx.request.query);
  let params = ctx.request.query,
    skuCode = params && params.skuCode,
    version = params && params.version,
    result;
  let url = `http://spcare-api.medbanks-test.com/api/trading-product/product/inner/sku/cms/${skuCode}/${version}`;
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      let code = json && json.code,
        data = json && json.data;
      if (code === "0" && data) {
        result = json;
      } else {
        result = { message: "啥也没拿到" };
      }
    });
  ctx.status = 200;
  ctx.body = result;
};

app.use(route.get("/", getMessage));
app.use(route.get("/single", getSingle));
app.listen(3000, () => console.log("listening 3000"));
