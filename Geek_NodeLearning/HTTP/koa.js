const koa = require("koa");
const fs = require("fs");
const mount = require("koa-mount"); // koa-mount 路由中间件
const game = require("./game");

var playerWinCount = 0;

var playerLastAction = null;
var sameCount = 0;
const app = new koa();
const gameKoa = new koa();
// koa 路由
app.use(
  mount("/favicon.ico", function (ctx) {
    ctx.status = 200;
  })
);

app.use(mount("/game", gameKoa));

gameKoa.use(async function (ctx, next) {
  // 如果统计的玩家胜利次数超过3
  // 或者玩家出现过作弊的情况（sameCount=9代表玩家有过作弊行为）
  if (playerWinCount >= 3) {
    ctx.status = 500;
    ctx.body = "我再也不和你玩了！";
    return;
  }
  await next();
  // 当后续中间件执行完之后，会执行到这个位置
  if (ctx.playerWon) {
    playerWinCount++;
  }
});

gameKoa.use(async function (ctx, next) {
  // 如果请求url是游戏请求，比如 http://localhost:3000/game?action=rock的情况
  // 就要把action解析出来，然后执行游戏逻辑
  const query = ctx.query;
  const playerAction = query.action;
  if (!playerAction) {
    ctx.status = 400;
  }

  if (sameCount == 9) {
    ctx.status = 500;
    ctx.body = "我再也不和你玩了！";
  }
  // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
  // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
  if (playerLastAction == playerAction) {
    sameCount++;
    if (sameCount >= 3) {
      ctx.status = 400;
      ctx.body = "你作弊！我再也不玩了";
      sameCount = 9;
      return;
    }
  } else {
    sameCount = 0;
  }
  playerLastAction = playerAction;
  // 把用户操作挂在response上传递给下一个中间件
  ctx.playerAction = playerAction;
  await next();
});

gameKoa.use(async function (ctx, next) {
  // 执行游戏逻辑
  const playerAction = ctx.playerAction;
  const gameResult = game(playerAction);
  // 先返回头部
  await new Promise((resolve) => {
    setTimeout(() => {
      ctx.status = 200;
      // 根据不同的游戏结果返回不同的说明
      if (gameResult == 0) {
        ctx.body = "平局！";
      } else if (gameResult == 1) {
        ctx.body = "你赢了！";
        ctx.playerWon = true;
      } else {
        ctx.body = "你输了！";
      }
      resolve();
    }, 500);
  });
});

app.use(
  mount("/", function (ctx) {
    ctx.body = fs.readFileSync(__dirname + "/index.html", "utf-8");
  })
);

app.listen(8000);
