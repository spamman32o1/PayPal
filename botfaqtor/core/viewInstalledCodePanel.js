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
var captcha_edit_styles_1 = require("../slider/captcha_edit_styles");
var http_1 = require("./http");
function addClass(el, className) {
  if (el) {
    if (el.classList) {
      el.classList.add(className);
    }
  }
}
function wait_showInstalledCodeByUtm(timeout, group_id, from_utm) {
  var wnd = window;
  if (wnd.document.body) {
    showInstalledCode(group_id, from_utm);
    return;
  }
  setTimeout(function () {
    wait_showInstalledCodeByUtm(timeout, group_id, from_utm);
  }, timeout);
}
exports.wait_showInstalledCodeByUtm = wait_showInstalledCodeByUtm;
function wait_showInstalledCodeByUserPanel(timeout, group_id, from_utm) {
  var wnd = window;
  var g = sessionStorage.getItem("btfr_code_checking");
  if (g && wnd.document.body) {
    showInstalledCode(group_id, from_utm);
    return;
  }
  setTimeout(function () {
    wait_showInstalledCodeByUserPanel(timeout, group_id, from_utm);
  }, timeout);
}
exports.wait_showInstalledCodeByUserPanel = wait_showInstalledCodeByUserPanel;
function showInstalledCode(group_id, from_utm) {
  return __awaiter(this, undefined, undefined, function () {
    var elements;
    var panelStyle;
    var int__head;
    var int__toggle;
    var label__toggle;
    var input__toggle;
    var div__toggle;
    var int__logo;
    var image__logo;
    var int__alert_wrap;
    var int__alert;
    var int__alert_icon;
    var int__alert_icon_svg;
    var int__alert_content;
    var int__alert_text;
    var int__button;
    var int__choised;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          elements = {
            SiteId: group_id
          };
          return [4, http_1.Http.post_status("//server.botfaqtor.ru/api/websitesgroup/confirm-code-installation", elements)];
        case 1:
          _a.sent();
          panelStyle = document.createElement("style");
          panelStyle.innerHTML = captcha_edit_styles_1.captchaEditStr;
          document.head.appendChild(panelStyle);
          addClass(document.body, "body-with-protect");
          int__head = document.createElement("div");
          int__head.className = "btf-protect-int__head";
          document.body.appendChild(int__head);
          int__toggle = document.createElement("div");
          int__toggle.className = "btf-protect-int__toggle";
          int__head.appendChild(int__toggle);
          label__toggle = document.createElement("label");
          label__toggle.className = "btf-protect-label__toggle";
          int__toggle.appendChild(label__toggle);
          input__toggle = document.createElement("input");
          input__toggle.className = "btf-protect-input__toggle";
          input__toggle.type = "checkbox";
          label__toggle.appendChild(input__toggle);
          div__toggle = document.createElement("div");
          div__toggle.onclick = function () {
            if (int__head.className == "btf-protect-int__head") {
              int__head.className = "btf-protect-int__head btf-protect-int__head_down";
            } else {
              int__head.className = "btf-protect-int__head";
            }
          };
          label__toggle.appendChild(div__toggle);
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
          int__alert_text.innerHTML = "На странице установлен счётчик <b>" + group_id.toString() + "</b>";
          int__alert_content.appendChild(int__alert_text);
          int__button = document.createElement("button");
          int__button.className = "btf-protect-int__button";
          if (from_utm == true) {
            int__button.innerText = "Ок";
            int__button.onclick = function () {
              int__head.style.visibility = "hidden";
              sessionStorage.removeItem("btfr_code_checking");
            };
          } else {
            int__button.innerText = "Назад";
            int__button.onclick = function () {
              sessionStorage.removeItem("btfr_code_checking");
              window.close();
            };
          }
          int__head.appendChild(int__button);
          int__choised = document.createElement("div");
          int__choised.className = "btf-protect-int__choised";
          return [2];
      }
    });
  });
}
exports.showInstalledCode = showInstalledCode;