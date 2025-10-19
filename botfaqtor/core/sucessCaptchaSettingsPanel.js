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
function addClass(el, className) {
  if (el) {
    if (el.classList) {
      el.classList.add(className);
    }
  }
}
function showSucessCapchaSettingsPanel() {
  return __awaiter(this, undefined, undefined, function () {
    var int__head;
    var int__logo;
    var image__logo;
    var int__alert_wrap;
    var int__alert;
    var int__alert_icon;
    var int__alert_icon_svg;
    var int__alert_content;
    var int__alert_text;
    var int__choised;
    var head;
    var choised;
    return __generator(this, function (_a) {
      int__head = document.createElement("div");
      int__head.className = "btf-protect-int__head-success";
      document.body.appendChild(int__head);
      int__logo = document.createElement("div");
      int__logo.className = "btf-protect-int__logo";
      int__head.appendChild(int__logo);
      image__logo = document.createElement("img");
      image__logo.src = "//verify.botfaqtor.ru/botfaqtor_logo.svg";
      int__logo.appendChild(image__logo);
      int__alert_wrap = document.createElement("div");
      int__alert_wrap.className = "btf-protect-int__alert-wrap";
      int__head.appendChild(int__alert_wrap);
      int__alert = document.createElement("div");
      int__alert.className = "btf-protect-int__green";
      int__alert_wrap.appendChild(int__alert);
      int__alert_icon = document.createElement("div");
      int__alert_icon.className = "btf-protect-int__alert-icon__green";
      int__alert.appendChild(int__alert_icon);
      int__alert_icon_svg = document.createElement("img");
      int__alert_icon_svg.src = "//verify.botfaqtor.ru/btf-protect-int__alert-icon__green.svg";
      int__alert_icon.appendChild(int__alert_icon_svg);
      int__alert_content = document.createElement("div");
      int__alert_content.className = "btf-protect-int__alert-content";
      int__alert.appendChild(int__alert_content);
      int__alert_text = document.createElement("div");
      int__alert_text.className = "btf-protect-int__alert-text";
      int__alert_text.innerHTML = "<b>Можете закрыть эту вкладку в браузере и продолжить настройку в личном кабинете</b>";
      int__alert_content.appendChild(int__alert_text);
      int__choised = document.createElement("div");
      int__choised.className = "btf-protect-int__choised";
      head = document.querySelector(".btf-protect-int__head");
      ;
      if (head) {
        head.style.display = "none";
        head.style.visibility = "hidden";
      }
      choised = document.querySelector(".btf-protect-int__choised-button");
      ;
      if (choised) {
        choised.style.display = "none";
        choised.style.visibility = "hidden";
      }
      return [2];
    });
  });
}
exports.showSucessCapchaSettingsPanel = showSucessCapchaSettingsPanel;