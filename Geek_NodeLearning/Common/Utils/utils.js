var util = require("util");
function Base() {
  this.name = "base";
  this.base = 1991;
  this.sayHello = function() {
    console.log("Hello " + this.name);
  };
}
Base.prototype.showName = function() {
  console.log(this.name);
};
function Sub() {
  this.name = "sub";
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);

// utils.inspect()
function Person() {
  this.name = "byvoid";
  this.toString = function() {
    return this.name;
  };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));

//注意：Sub仅仅继承了Base在原型中定义的函数，而构造函数内部创造的base属性和sayHello函数都没有被Sub继承。
