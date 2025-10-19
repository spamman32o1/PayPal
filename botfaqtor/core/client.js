var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) {
        d[p] = b[p];
      }
    }
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
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
var http_1 = require("./http");
var events_1 = require("events");
var events_2 = require("./events");
var Client = function (_super) {
  __extends(Client, _super);
  function Client(uri, id) {
    var _this = _super.call(this) || this;
    _this._events = new events_2.PageEventsCollection();
    _this._initialized = false;
    _this._id = id;
    _this._uri = uri + "/visit";
    return _this;
  }
  Client.prototype.on2 = function (ev, callback) {
    _super.prototype.on.call(this, ev, callback);
  };
  Client.prototype.introduce = function (id, url, referer, hash, fp, uid, version) {
    return __awaiter(this, undefined, undefined, function () {
      var res;
      var resObj;
      var e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);
            return [4, http_1.Http.post(this._uri + "/" + id + "/1", {
              f: hash,
              fd: fp,
              u: uid,
              r: referer,
              h: url,
              v: version
            })];
          case 1:
            res = _a.sent();
            resObj = JSON.parse(res);
            this._c = resObj.c;
            if (resObj.u) {
              this.onUserId(resObj.u);
            }
            this._initialized = true;
            return [3, 3];
          case 2:
            e_1 = _a.sent();
            this.onError(e_1);
            return [3, 3];
          case 3:
            return [2];
        }
      });
    });
  };
  Client.prototype.event = function (evt) {
    if (!this._initialized) {
      var x = new events_2.PageEventItem();
      x.eventType = evt.eventType;
      x.which = evt.which;
      x.x = evt.x;
      x.y = evt.y;
      this.events(x);
      return;
    }
    return http_1.Http.post(this._uri + "/" + this._id + "/2", {
      c: this._c,
      u: navigator.userAgent,
      t: evt.eventType,
      x: evt.x | 0,
      y: evt.y | 0,
      w: evt.which,
      d: new Date()
    });
  };
  Client.prototype.events = function (evt) {
    if (Object.keys(this._events.items).length == 0) {
      this._events.time = new Date();
    }
    evt.span = new Date().getTime() - this._events.time.getTime();
    this._events.items[evt.eventType] = [evt];
  };
  Client.prototype.onUserId = function (uid) {
    _super.prototype.emit.call(this, "uid", uid);
  };
  Client.prototype.onError = function (err) {
    _super.prototype.emit.call(this, "error", err);
  };
  Client.prototype.check = function (href, s, i, r, u, uid, fp, fl) {
    return __awaiter(this, undefined, undefined, function () {
      var elements;
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            elements = {
              s: s,
              i: i,
              r: r,
              u: u,
              f: fp,
              uid: uid
            };
            return [4, http_1.Http.post_statusData(href, elements, fl)];
          case 1:
            result = _a.sent();
            return [2, result];
        }
      });
    });
  };
  return Client;
}(events_1.EventEmitter);
exports.Client = Client;