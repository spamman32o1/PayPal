Object.defineProperty(_exports2, "__esModule", {
  value: true
});
function adsProtect(wnd) {
  var bhd = wnd._ab_data_;
  if (bhd.yan.yan) {
    if (wnd.sessionStorage) {
      if (wnd.sessionStorage.getItem("yParamIsSent") != "1") {
        wait_ya(wnd, 1000, function () {
          return sendToMetrika(wnd, bhd);
        });
      }
    } else {
      wait_ya(wnd, 1000, function () {
        return sendToMetrika(wnd, bhd);
      });
    }
  }
  if (bhd.goo.goo) {
    if (wnd.sessionStorage) {
      if (wnd.sessionStorage.getItem("gParamIsSent") != "1") {
        wait_ga(wnd, 1000, function () {
          return sendToGA(wnd, bhd);
        });
      }
    } else {
      wait_ga(wnd, 1000, function () {
        return sendToGA(wnd, bhd);
      });
    }
  }
}
exports.adsProtect = adsProtect;
function getTypeOfGoogleAnalytics(wnd) {
  var _cc_ = wnd._ab_data_.goo.gid;
  if (_cc_ && _cc_ != "") {
    if (_cc_.indexOf("UA") >= 0) {
      return "UA";
    } else if (_cc_.length > 3 && _cc_.indexOf("UA") < 0) {
      return "G4";
    }
  }
}
function wait_ya(wnd, timeout, callback) {
  if (wnd._ab_data_.yan.yid) {
    var _counter_ = wnd._ab_data_.yan.yid;
    if (wnd.ym != undefined) {
      if (wnd.ym.a != undefined) {
        for (var i = 0; i < wnd.ym.a.length; i++) {
          if (wnd.ym.a[i][0] == _counter_) {
            wnd._ab_data_.yan.type = "new";
            setTimeout(function () {
              callback();
            }, 100);
            return;
          }
        }
      }
    }
    if (Object.keys(window).filter(function (el) {
      return /^yaCounter.*?/i.test(el);
    }) != undefined) {
      var mas = Object.keys(window).filter(function (el) {
        return /^yaCounter.*?/i.test(el);
      });
      for (var i = 0; i < mas.length; i++) {
        if (mas[i] == "yaCounter" + _counter_.toString()) {
          var counterName = "yaCounter" + _counter_.toString();
          if (window[counterName]) {
            wnd._ab_data_.yan.type = "old";
            setTimeout(function () {
              callback();
            }, 150);
            return;
          }
        }
      }
    }
  }
  setTimeout(function () {
    wait_ya(wnd, timeout, callback);
  }, timeout);
}
function sendToMetrika(wnd, bhd) {
  var _statusCode_ = bhd.sts;
  var typeOfMetrics = bhd.yan.type;
  var currCounterM = bhd.yan.yid;
  var _isFraud_ = bhd.unt.fra;
  var _isGarb_ = bhd.unt.sts;
  var param = null;
  if (_statusCode_ == 302) {
    param = "bot";
  } else if (_isFraud_ == true) {
    param = "suspect";
  }
  if ((_statusCode_ == 302 || _isFraud_ == true) && param != null) {
    if (typeOfMetrics == "new") {
      var _yaParams_ = {
        Botfaqtor: param
      };
      try {
        if (typeof window.ym === "function") {
          window.ym(currCounterM, "params", _yaParams_ || {});
          if (wnd.sessionStorage) {
            wnd.sessionStorage.setItem("yParamIsSent", "1");
          }
          bhd.yan.snt = true;
        }
      } catch (e) {}
    }
    if (typeOfMetrics == "old") {
      eval("yaCounter" + currCounterM.toString() + ".params({Botfaqtor:'" + param + "'});");
      if (wnd.sessionStorage) {
        wnd.sessionStorage.setItem("yParamIsSent", "1");
      }
      bhd.yan.snt = true;
    }
  }
  if (_isGarb_) {
    if (typeOfMetrics == "new") {
      try {
        if (typeof window.ym === "function") {
          window.ym(currCounterM, "params", {
            Botfaqtor: {
              untargeted: "1"
            }
          });
        }
      } catch (e) {}
    }
    if (typeOfMetrics == "old") {
      eval("yaCounter" + currCounterM.toString() + ".params({Botfaqtor:{untargeted: 1}});");
    }
  }
  if (typeOfMetrics == "new") {
    if (bhd.uid) {
      try {
        setTimeout(function () {
          if (typeof window.ym === "function") {
            window.ym(currCounterM, "setUserID", bhd.uid);
          }
        }, 100);
      } catch (e) {}
    }
  } else if (typeOfMetrics == "old") {
    setTimeout(function () {
      try {
        var counterName = "yaCounter" + currCounterM.toString();
        if (window[counterName] && typeof window[counterName].setUserID === "function" && bhd.uid) {
          window[counterName].setUserID(bhd.uid);
        }
      } catch (e) {}
    }, 200);
  }
}
function wait_ga(wnd, timeout, callback) {
  var _cType_ = getTypeOfGoogleAnalytics(wnd);
  var _gCounter_ = wnd._ab_data_.goo.gid;
  if (_cType_ && _gCounter_) {
    if (_cType_ == "UA") {
      if (wnd.ga != undefined) {
        if (typeof wnd.ga.h == "object") {
          var eq = "gtag_" + _gCounter_.toString().split("-").join("_");
          if (eq in wnd.ga.h) {
            wnd._ab_data_.goo.type = "UA";
            callback();
            return;
          }
          if (wnd.gaData) {
            if (_gCounter_ in wnd.gaData) {
              wnd._ab_data_.goo.type = "UA";
              callback();
              return;
            }
          }
        }
      }
    }
    if (_cType_ == "G4") {
      wnd._ab_data_.goo.type = "G4";
      callback();
      return;
    }
  }
  setTimeout(function () {
    wait_ga(wnd, timeout, callback);
  }, timeout);
}
function sendToGA(wnd, bhd) {
  var _statusCode_ = bhd.sts;
  var currCounterG = bhd.goo.gid;
  var _isFraud_ = bhd.unt.fra;
  var _typeOfAnalytics_ = bhd.goo.type;
  var param = null;
  if (_statusCode_ == 302) {
    param = "bot";
  } else if (_isFraud_ == true) {
    param = "suspect";
  }
  if (wnd._ab_data_.inf.srv == 1) {
    if (_typeOfAnalytics_ == "G4") {
      if (_statusCode_ == 302 || _isFraud_ == true) {
        if (wnd.gtag) {
          wnd.gtag("event", "page_view", {
            Botfaqtor: param
          });
          if (wnd.sessionStorage) {
            wnd.sessionStorage.setItem("gParamIsSent", "1");
          }
          bhd.goo.snt = true;
        }
      }
    }
  }
}