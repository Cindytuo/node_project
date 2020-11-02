var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

app
  .get("/index.htm", function(req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
  })
  .post("/process_post", urlencodedParser, function(req, res) {
    response = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
  })
  .get("/process_get", function(req, res) {
    // 输出 JSON 格式
    response = {
      first_name: req.query.first_name,
      last_name: req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
  })
  .listen(8888);
