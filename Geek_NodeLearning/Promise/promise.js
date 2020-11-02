// (function () {
//   var promise = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       // resolve(3);
//       reject(new Error("4"));
//     }, 500);
//   })
//     .then(function (res) {
//       console.log(res);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });

//   console.log(promise);

//   setTimeout(() => {
//     console.log(promise);
//   }, 800);
// })();

// interview

(function () {
  // var promise = interview(1)
  //   .then(() => {
  //     return interview(2);
  //   })
  //   .then(() => {
  //     return interview(3);
  //   })
  //   .then(() => {
  //     console.log("smile");
  //   })
  //   .catch((err) => {
  //     console.log("cry at" + err.round + "round");
  //   });

  // setTimeout(() => {
  //   console.log(promise);
  // }, 800);
  Promise.all([interview("geekbang"), interview("tencent")])
    .then(() => {
      console.log("smile");
    })
    .catch((err) => {
      console.log("cry at " + err.name);
    });

  function interview(name) {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve("success");
        } else {
          var error = new Error("fail");
          error.name = name;
          reject(error);
        }
      }, 500);
    });
  }
})();
