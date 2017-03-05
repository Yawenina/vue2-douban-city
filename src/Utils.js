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


export const eventsName = {
  music: '音乐类',
  film: '电影类',
  drama: '戏剧类',
  commonweal: '公益类',
  salon: '沙龙类',
  exhibition: '展览类',
  party: '聚会类',
  sports: '运动类',
  travel: '旅游类',
  others: '其他',
  // music: {
  //   name: '音乐类',
  //   data: [],
  // },
  // film: {
  //   name: '电影类',
  //   data: [],
  // },
  // drama: {
  //   name: '戏剧类',
  //   data: [],
  // },
  // commonweal: {
  //   name: '公益类',
  //   data: [],
  // },
  // salon: {
  //   name: '沙龙类',
  //   data: [],
  // },
  // exhibition: {
  //   name: '展览类',
  //   data: [],
  // },
  // party: {
  //   name: '聚会类',
  //   data: [],
  // },
  // sports: {
  //   name: '运动类',
  //   data: [],
  // },
  // travel: {
  //   name: '旅游类',
  //   data: [],
  // },
  // others: {
  //   name: '其他',
  //   data: [],
  // },
};

