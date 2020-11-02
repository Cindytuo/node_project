var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream("input.txt");

// 创建一个可写流
var writerStream = fs.createWriteStream("output.txt");

readerStream.pipe(writerStream);

console.log("程序执行完毕");
