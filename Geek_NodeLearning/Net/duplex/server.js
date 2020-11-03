const net = require("net");

const server = net.createServer((socket) => {
  let oldBuffer = null;
  socket.on("data", function (buffer) {
    // 把上一次 data 事件使用残余的 buffer 接上来；
    if (oldBuffer) {
      buffer = Buffer.concat([oldBuffer, buffer]);
    }

    let packageLength = 0;
    // 只要还存在可以解决完整包的包长度；
    while ((packageLength = checkComplete(buffer))) {
      const package = buffer.slice(0, packageLength);
      buffer = buffer.slice(packageLength);

      // 把这个包解成数据和seq
      const result = decode(package);

      // 计算得到要返回的结果，并 write 返回
      socket.write(encode(data[result.data], result.seq));
    }
  });
});

/**
 * 检查一段buffer是不是一个完整的数据包。
 * 具体逻辑是：判断header的bodyLength字段，看看这段buffer是不是长于header和body的总长
 * 如果是，则返回这个包长，意味着这个请求包是完整的。
 * 如果不是，则返回0，意味着包还没接收完
 * @param {} buffer
 */
function checkComplete(buffer) {
  if (buffer.length < 6) {
    return 0;
  }

  const bodyLength = buffer.readInt32BE(2);
  return 6 + bodyLength;
}

// mock 数据
const data = {
  136797: "01 | 课程介绍",
  136798: "02 | 内容综述",
  136799: "03 | Node.js是什么？",
  136800: "04 | Node.js可以用来做什么？",
  136801: "05 | 课程实战项目介绍",
  136803: "06 | 什么是技术预研？",
  136804: "07 | Node.js开发环境安装",
  136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
  136807: "09 | 模块：CommonJS规范",
  136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
  136809: "11 | 模块：npm",
  141994: "12 | 模块：Node.js内置模块",
  143517: "13 | 异步：非阻塞I/O",
  143557: "14 | 异步：异步编程之callback",
  143564: "15 | 异步：事件循环",
  143644: "16 | 异步：异步编程之Promise",
  146470: "17 | 异步：异步编程之async/await",
  146569: "18 | HTTP：什么是HTTP服务器？",
  146582: "19 | HTTP：简单实现一个HTTP服务器",
};
