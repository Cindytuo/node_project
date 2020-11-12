const koa = require("koa");
const mount = require("koa-mount");
const fetch = require("node-fetch");
const route = require("koa-route");

const app = new koa();
// const fetchInfomation = new koa();
// const fetchSingle = new koa();
// app.use(mount("/getInfos", fetchInfomation));
// app.use(mount("/getSingle", fetchSingle));

const fetchInfomation = async function (ctx) {
  let result;
  let url =
    "http://192.168.108.59:3000/?spuCode=00000654&saleChannelId=3988c7f88ebcb58c";
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      result = json;
    });

  ctx.status = 200;
  ctx.body = result;
};

const fetchSingle = async function (ctx) {
  let result;
  let url =
    "http://192.168.108.59:3000/single?skuCode=00000781&saleChannelId=3988c7f88ebcb58c&version=8";
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      result = json;
    });

  ctx.status = 200;
  ctx.body = result;
};

app.use(route.get("/getInfos", fetchInfomation));
app.use(route.get("/getSingle", fetchSingle));
app.listen(7706, () => console.log("listening 7706"));
