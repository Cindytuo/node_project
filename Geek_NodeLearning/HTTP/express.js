const express = require("express");
const fs = require("fs");
const game = require("./game");

var playerWinCount = 0;

var playerLastAction = null;
var sameCount = 0;
const app = express();

// express 路由
app.get("/favicon.ico", function (request, response) {
  // 一句 status(200) 代替 writeHead(200); end();
  response.status(200);
  return;
});

app.get(
  "/game",

  function (request, response, next) {
    // 如果统计的玩家胜利次数超过3
    // 或者玩家出现过作弊的情况（sameCount=9代表玩家有过作弊行为）
    if (playerWinCount >= 3 || sameCount == 9) {
      response.status(500);
      response.send("我再也不和你玩了！");
      return;
    }
    next();
    // 当后续中间件执行完之后，会执行到这个位置
    if (response.playerWon) {
      playerWinCount++;
    }
  },

  function (request, response, next) {
    // 如果请求url是游戏请求，比如 http://localhost:3000/game?action=rock的情况
    // 就要把action解析出来，然后执行游戏逻辑
    const query = request.query;
    const playerAction = query.action;
    if (!playerAction) {
      response.status(400);
      response.send();
      return;
    }
    // 当玩家操作与上次相同，则连续相同操作统计次数+1，否则统计清零
    // 当玩家操作连续三次相同，则视为玩家作弊，把sameCount置为9代表有过作弊行为
    if (playerLastAction == playerAction) {
      sameCount++;
      if (sameCount >= 3) {
        response.status(400);
        response.send("你作弊！我再也不玩了");
        sameCount = 9;
        return;
      }
    } else {
      sameCount = 0;
    }
    playerLastAction = playerAction;
    // 把用户操作挂在response上传递给下一个中间件
    response.playerAction = playerAction;
    next();
  },

  function (request, response) {
    // 执行游戏逻辑
    const playerAction = response.playerAction;
    const gameResult = game(playerAction);
    // 先返回头部
    response.status(200);
    // 根据不同的游戏结果返回不同的说明
    if (gameResult == 0) {
      response.send("平局！");
    } else if (gameResult == 1) {
      response.send("你赢了！");
      response.playerWon = true;
      //玩家胜利次数统计+1
      playerWon++;
    } else {
      response.send("你输了！");
    }
  }
);

app.get("/", function (req, res) {
  // send接口会判断你传入的值的类型，文本的话则会处理为text/html
  // Buffer的话则会处理为下载
  // res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.send(fs.readFileSync(__dirname + "/index.html", "utf-8"));
});

app.listen(8000);
