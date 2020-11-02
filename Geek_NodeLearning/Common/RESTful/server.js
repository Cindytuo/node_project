var express = require("express");
var app = express();
var fs = require("fs");

app.get("/listUsers", function(req, res) {
  fs.readFile(__dirname + "/" + "user.json", "utf8", function(err, data) {
    console.log(data);
    res.end(data);
  });
});
app.get("/deleteUser", function(req, res) {
  fs.readFile(__dirname + "/" + "user.json", "utf8", function(err, data) {
    data = JSON.parse(data);
    delete data["user2"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});
var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4
  }
};
app.get("/addUser", function(req, res) {
  fs.readFile(__dirname + "/" + "user.json", "utf8", function(err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.end(JSON.stringify(data));
  });
});

app.get("/:id", function(req, res) {
  fs.readFile(__dirname + "/" + "user.json", "utf8", function(err, data) {
    data = JSON.parse(data);
    var user = data["user" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

console.log("process:::", process);
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
