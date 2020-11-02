module.exports = function (playerAction) {
  var radom = Math.random() * 3;

  if (radom < 1) {
    var computerAction = "rock";
  } else if (radom > 2) {
    var computerAction = "scissor";
  } else {
    var computerAction = "paper";
  }

  if (computerAction == playerAction) {
    console.log("平局");
    return 0;
  } else if (
    (computerAction === "paper" && playerAction === "scissor") ||
    (computerAction === "rock" && playerAction === "paper") ||
    (computerAction === "scissor" && playerAction === "rock")
  ) {
    console.log("你赢了");
    return -1;
  } else {
    console.log("你输了");
    return 1;
  }
};
