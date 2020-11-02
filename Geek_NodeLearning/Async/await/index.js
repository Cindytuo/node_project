/**
 * async/await 
 * async function 是 Promise 的语法糖封装 --- 看下面的例子
 * 异步编程的终极方案 - 以同步的方式写异步
 * * await 关键字可以 “暂停” async function 的执行
 * * await 关键字 可以以通过的写法获取 promise的执行结果
 * * try-catch 可以获取 await 所得到的错误
 */

(async function () {
  try {
    await interview(1);
    await interview(2);
    await interview(3);
    await Promise.all([interview(1), interview(2), interview(3)]);
  } catch (e) {
    return console.log("cry at " + e.round);
  }
  console.log("smile");
})();

function interview(round) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve("success");
      } else {
        var error = new Error("fail");
        error.round = round;
        reject(error);
      }
    }, 500);
  });
}

console.log(async function() {
  //throw new Error('4');
  return 4;
}())

console.log(function () {
  return new Promise((resolve, reject) =>{
    resolve(4);
    // reject(new Error('4'));
  })
}());