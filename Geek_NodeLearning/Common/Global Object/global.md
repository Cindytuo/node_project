# 全局对象

## 概述

> *  Node.js 全局对象，global 全局对象无需引用就可以直接使用;
> * 在浏览器 JavaScript 中，通常window 是全局对象， 而Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。; 比如 console,process

## process 描述当前进程状态

> * ### process 是一个全局变量，即 global 对象的属性。
> * ### process.stdout是标准输出流,通常我们使用的 console.log() 向标准输出打印 字符，而 process.stdout.write() 函数提供了更底层的接口。
> * ### process.stdin是标准输入流，初始时它是被暂停的，要想从标准输入读取数据， 你必须恢复流，并手动编写流的事件响应函数。
> * ### process.nextTick(callback)的功能是为事件循环设置一项任务，Node.js 会在 下次事件循环调响应时调用 callback。