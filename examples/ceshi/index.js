function mySetInterVal(fn, a, b) {
  let num = 0;
  let flag = null;
  function start() {
    flag = setTimeout(() => {
      fn();
      num++;
      start();
    }, a + num * b);
  }
  start();
  return flag;
}
function myClear(flag) {
  clearTimeout(flag);
}
let interval = mySetInterVal(() => console.log("111"), 100, 100);
