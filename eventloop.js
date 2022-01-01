const worker = require("./threaded_timeout");
call_stack = [];
callback_queue = [];
function MySetTimoutWrapper(time, func) {
  worker(time).then(() => {
    func();
  });
}

function MySetTimeout() {
  MySetTimoutWrapper(5000, function consout() {
    console.log("The future arrived now!");
  });
}

function MySetTimeout1() {
  MySetTimoutWrapper(0, function consout() {
    console.log("The future arrived now!");
  });
}

function MySetTimeout2() {
  MySetTimoutWrapper(1000, function consout() {
    console.log("The future arrived now!");
  });
}
function a() {
  console.log(`i am in 1st stack`);
}
function b() {
  console.log(`i am in 2st stack`);
}
function c() {
  console.log(`i am in 3st stack`);
}
call_stack.push(MySetTimeout);
call_stack.push(a);
call_stack.push(MySetTimeout1);
call_stack.push(b);
call_stack.push(MySetTimeout2);
call_stack.push(c);

while (call_stack.length != 0) {
  let fun;
  fun = call_stack.shift();
  if (fun) fun();
}
