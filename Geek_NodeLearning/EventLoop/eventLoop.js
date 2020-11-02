// 模拟事件循环
const eventloop = {
  queue: [],

  loop() {
    while (this.queue.length) {
      var callback = this.queue.unshift();
      callback();
    }

    setTimeout(this.loop.bind(this), 50);
  },

  add(callback) {
    this.queue.push(callback);
  },
};

eventloop.loop();

setTimeout(() => {
  eventloop.add(function () {
    console.log(1);
  });
}, 500);

setTimeout(() => {
  eventloop.add(function () {
    console.log(2);
  });
}, 800);
