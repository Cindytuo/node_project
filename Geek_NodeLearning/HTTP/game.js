module.exports = function (playerAction) {
  if (["rock", "scissor", "paper"].indexOf(playerAction) == -1) {
    throw new Error("invalid playerAction");
  }

  // 计算电脑出的东西
  var radom = Math.random() * 3;
  var computerAction;
  if (radom < 1) {
    computerAction = "rock";
  } else if (radom > 2) {
    computerAction = "scissor";
  } else {
    computerAction = "paper";
  }

  if (computerAction == playerAction) {
    return 0;
  } else if (
    (computerAction === "paper" && playerAction === "scissor") ||
    (computerAction === "rock" && playerAction === "paper") ||
    (computerAction === "scissor" && playerAction === "rock")
  ) {
    return -1;
  } else {
    return 1;
  }
};
