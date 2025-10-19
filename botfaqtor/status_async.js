var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P ||= Promise)(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      if (result.done) {
        resolve(result.value);
      } else {
        new P(function (resolve) {
          resolve(result.value);
        }).then(fulfilled, rejected);
      }
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) {
        throw t[1];
      }
      return t[1];
    },
    trys: [],
    ops: []
  };
  var f;
  var y;
  var t;
  var g;
  g = {
    next: verb(0),
    throw: verb(1),
    return: verb(2)
  };
  if (typeof Symbol === "function") {
    g[Symbol.iterator] = function () {
      return this;
    };
  }
  return g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) {
      throw new TypeError("Generator is already executing.");
    }
    while (_) {
      try {
        f = 1;
        if (y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) {
          return t;
        }
        y = 0;
        if (t) {
          op = [0, t.value];
        }
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) {
              _.ops.pop();
            }
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }
    if (op[0] & 5) {
      throw op[1];
    }
    return {
      value: op[0] ? op[1] : undefined,
      done: true
    };
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var client_1 = require("./core/client");
function get_status_async(wnd) {
  return __awaiter(this, undefined, undefined, function () {
    var bhd;
    var _client;
    var uri;
    var status_data;
    var data;
    var status_flag;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          bhd = wnd._ab_data_;
          _client = new client_1.Client(bhd.inf.adr, bhd.inf.sid);
          uri = "https://" + bhd.inf.adr + ".botfaqtor.ru/b/check";
          return [4, _client.check(uri, bhd.inf.sid, bhd.hah, document.referrer, location.href, bhd.uid, bhd.fpr, bhd.inf.flg)];
        case 1:
          status_data = _a.sent();
          if (typeof status_data === "object") {
            if (status_data[1]) {
              data = JSON.parse(status_data[1]);
              status_flag = data.R;
              if (status_flag == 0) {
                bhd.sts = 200;
              } else if (status_flag == 1) {
                bhd.sts = 302;
              }
              bhd.unt.fra = data.Fraud;
              if (bhd.cap.arr && bhd.cap.arr.length > 0) {
                bhd.cap.has = true;
                bhd.cap.scr = data.X;
                bhd.cap.srr = data.Rr;
              }
            }
          }
          return [2];
      }
    });
  });
}
exports.get_status_async = get_status_async;