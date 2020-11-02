var buf = new Buffer(26);

//写入缓冲区
var len = buf.write("Hello Zoey!");
console.log("写入字节数：", len);

//从缓冲区读取数据
var read = buf.toString();
console.log("读取数据：", read);

//将Buffer 转换为 JSON对象
var json = buf.toJSON();
console.log("转换JSON对象：", json);

// 缓冲区合并
var buf2 = new Buffer("Hello, Cindy,");
var buf3 = Buffer.concat([buf2, buf]);
console.log("合并缓冲区后：", buf3.toString());
