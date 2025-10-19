Object.defineProperty(exports, "__esModule", {
  value: true
});
var events_1 = require("./events");
var ua_parser_js_1 = require("ua-parser-js");
function getIntRandom(min, max) {
  return Math.random() * (max - min) + min | 0;
}
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
var sendZeroClick = null;
function zeroMove(events) {
  document.addEventListener("mousemove", function (event) {
    if (event.clientX == 0 && event.clientY == 0 && !sendZeroClick) {
      sendZeroClick = setTimeout(function () {
        events.send(events_1.PageEvents.ZeroMove);
      }, 300);
    }
    if ((event.clientX != 0 || event.clientY != 0) && sendZeroClick) {
      clearTimeout(sendZeroClick);
      sendZeroClick = null;
    }
  }, true);
}
function liedEvtsCursorOnMobile(events) {
  function sendLiedCursorEventOnce() {
    events.send(events_1.PageEvents.LiedEventsCursorOnMobile);
    document.removeEventListener("mousemove", sendLiedCursorEventOnce);
    document.removeEventListener("mousedown", sendLiedCursorEventOnce);
    document.removeEventListener("mouseup", sendLiedCursorEventOnce);
  }
  document.addEventListener("mousemove", sendLiedCursorEventOnce);
  document.addEventListener("mousedown", sendLiedCursorEventOnce);
  document.addEventListener("mouseup", sendLiedCursorEventOnce);
}
function straightMove(events) {
  var wnd = window;
  var l = 120;
  var coord = [];
  var c = 0;
  document.addEventListener("mousemove", function (event) {
    c += 1;
    storeCoordinate(event.clientX, event.clientY, coord);
    if (coord.length > l) {
      var analyze = coord.slice(c - l, c);
      if (analyze.length == l) {
        var kk = analyze[0].x / analyze[0].y;
        var xx_1 = analyze[0].x;
        var yy_1 = analyze[0].y;
        if (kk != 0) {
          wnd._analyze_ = analyze;
          if (analyze.every(function (elem) {
            return elem.x == xx_1;
          })) {
            events.send(events_1.PageEvents.StraightMove);
            straightMove(events);
            coord.length = 0;
          } else if (analyze.every(function (elem) {
            return elem.y == yy_1;
          })) {
            events.send(events_1.PageEvents.StraightMove);
            straightMove(events);
            coord.length = 0;
          } else {
            var sum = 0;
            for (var i = 2; i < analyze.length; i++) {
              var firstSecond = ((analyze[i - 1].y - analyze[i - 2].y) / (analyze[i - 1].x - analyze[i - 2].x)).toFixed(1);
              var third = ((analyze[i].y - analyze[i - 1].y) / (analyze[i].x - analyze[i - 1].x)).toFixed(1);
              if (firstSecond == third) {
                sum += 1;
              }
              if (sum >= l - 3) {
                events.send(events_1.PageEvents.StraightMove);
                straightMove(events);
                coord.length = 0;
              }
            }
          }
        }
      }
    }
  }, true);
}
function storeCoordinate(xVal, yVal, array) {
  array.push({
    x: xVal,
    y: yVal
  });
}
function _operations(wnd) {
  var start = Date.now();
  var end = start + 3000;
  var numberOfExecutions = 0;
  while (Date.now() < end) {
    factorialize(100);
    numberOfExecutions++;
  }
  var f = +(numberOfExecutions / 300).toFixed(2);
  wnd._ab_data_.tfl = f;
}
function operations(wnd) {
  var start = Date.now();
  var c = 0;
  while (c < 1000) {
    factorialize(10000);
    c += 1;
  }
  var end = Date.now();
  var f = +(end - start);
  wnd._ab_data_.tfl = f;
}
function factorialize(num) {
  if (num < 0) {
    return -1;
  } else if (num == 0) {
    return 1;
  } else {
    return num * factorialize(num - 1);
  }
}
function wait(wnd, timeout, callback) {
  if (wnd._ab_data_.tsp && wnd._ab_data_.tfl) {
    callback();
    return;
  }
  setTimeout(function () {
    wait(wnd, timeout, callback);
  }, timeout);
}
function testSpeed(wnd) {
  var arrTimes = [];
  var i = 0;
  var timesToTest = 5;
  var tThreshold = 150;
  var testImage = "https://botfaqtor.ru/blog/img/network/jpg.jpg";
  var dummyImage = new Image();
  var isConnectedFast = false;
  testLatency(function (avg) {
    isConnectedFast = avg <= tThreshold;
    var a = +avg.toFixed(2);
    wnd._ab_data_.tsp = a;
  });
  function testLatency(cb) {
    var tStart = new Date().getTime();
    if (i < timesToTest - 1) {
      dummyImage.src = testImage + "?t=" + tStart;
      dummyImage.onload = function () {
        var tEnd = new Date().getTime();
        var tTimeTook = tEnd - tStart;
        arrTimes[i] = tTimeTook;
        testLatency(cb);
        i++;
      };
    } else {
      var sum = arrTimes.reduce(function (a, b) {
        return a + b;
      });
      var avg = sum / arrTimes.length;
      cb(avg);
    }
  }
}
function checkCriterias(wnd, events) {
  var parser = new ua_parser_js_1.UAParser();
  var type = parser.getResult().device.type;
  if (type == undefined) {
    type = "desktop";
  }
  var hasMobileUa = type == "mobile";
  var spider = false;
  var ua = navigator.userAgent;
  if (ua.indexOf("/bot") >= 0) {
    spider = true;
  }
  if (!spider) {
    if (!hasMobileUa) {
      zeroMove(events);
      straightMove(events);
    } else {
      liedEvtsCursorOnMobile(events);
    }
  }
}
exports.checkCriterias = checkCriterias;