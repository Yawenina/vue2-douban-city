/**
 * Created by yawenina on 2/14/17.
 */

export function fetchData() {

}
/* eslint-disable */
export function throttle(fn, delay) {
  var now, lastExec, timer, context, args;

  var execute = function () {
    fn.apply(context, args);
    lastExec = now;
  }

  return function () {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    console.log("execute")

    if (lastExec) {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(() => {
          execute();
        }, diff)
      }
    } else {
      execute();
    }
  }
}
