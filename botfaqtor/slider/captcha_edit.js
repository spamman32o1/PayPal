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
var http_1 = require("../core/http");
var captcha_edit_styles_1 = require("./captcha_edit_styles");
var sucessCaptchaSettingsPanel_1 = require("../core/sucessCaptchaSettingsPanel");
var CaptchaEdit = function () {
  function CaptchaEdit() {}
  CaptchaEdit.showCaptchaSettings = function (bhd, goal_id, selector) {
    var _this = this;
    var current_edit_element = null;
    var target_form = "";
    var last_element = null;
    var saved_element = null;
    CaptchaEdit.addClass(document.body, "body-with-protect");
    if (selector != "null") {
      if (selector.indexOf(":") > -1) {
        var split = selector.split(":");
        current_edit_element = document.querySelectorAll(split[0])[split[1]];
      } else {
        current_edit_element = document.querySelector(selector);
      }
      if (current_edit_element) {
        current_edit_element.classList.add("btf-protect-int__detect");
        target_form = selector;
      }
    }
    var styleCaptchaEdit = document.createElement("style");
    styleCaptchaEdit.innerHTML = captcha_edit_styles_1.captchaEditStr;
    document.head.appendChild(styleCaptchaEdit);
    var int__head = document.createElement("div");
    int__head.className = "btf-protect-int__head";
    document.body.appendChild(int__head);
    var int__toggle = document.createElement("div");
    int__toggle.className = "btf-protect-int__toggle";
    int__head.appendChild(int__toggle);
    var label__toggle = document.createElement("label");
    label__toggle.className = "btf-protect-label__toggle";
    int__toggle.appendChild(label__toggle);
    var input__toggle = document.createElement("input");
    input__toggle.className = "btf-protect-input__toggle";
    input__toggle.type = "checkbox";
    label__toggle.appendChild(input__toggle);
    var div__toggle = document.createElement("div");
    div__toggle.onclick = function () {
      if (int__head.className == "btf-protect-int__head") {
        int__head.className = "btf-protect-int__head btf-protect-int__head_down";
      } else {
        int__head.className = "btf-protect-int__head";
      }
    };
    label__toggle.appendChild(div__toggle);
    var int__logo = document.createElement("div");
    int__logo.className = "btf-protect-int__logo";
    int__head.appendChild(int__logo);
    var image__logo = document.createElement("img");
    image__logo.src = "//verify.botfaqtor.ru/botfaqtor_logo.svg";
    int__logo.appendChild(image__logo);
    var int__nav = document.createElement("div");
    int__nav.className = "btf-protect-int__nav";
    int__head.appendChild(int__nav);
    var int__nav_label1 = document.createElement("label");
    int__nav.appendChild(int__nav_label1);
    var int__nav_label1_input = document.createElement("input");
    int__nav_label1_input.type = "radio";
    int__nav_label1_input.name = "btf-protect-var";
    int__nav_label1_input.onclick = function () {
      int__nav_label2_input.id = "false";
      document.body.removeEventListener("mousemove", CaptchaEdit.findElementForCaptcha);
      if (clickHandler) {
        document.body.removeEventListener("click", clickHandler);
      }
      if (CaptchaEdit.selected_item) {
        CaptchaEdit.removeClass(CaptchaEdit.selected_item, "btf-protect-int__almost");
        CaptchaEdit.selected_item.style.pointerEvents = "auto";
        CaptchaEdit.selected_item = null;
      }
      if (last_element) {
        saved_element = last_element;
        CaptchaEdit.removeClass(last_element, "btf-protect-int__detect");
        last_element = null;
      }
      int__choised.style.visibility = "hidden";
      int__alert_text.innerText = "Перейдите к месту, где находится нужный элемент";
      var hint = document.querySelector(".btf-protect-int__selector-hint");
      if (hint) {
        hint.remove();
      }
    };
    int__nav_label1.appendChild(int__nav_label1_input);
    var int__nav_label1_span = document.createElement("span");
    int__nav_label1_span.innerText = "Двигаться по сайту";
    int__nav_label1.appendChild(int__nav_label1_span);
    var int__nav_label2 = document.createElement("label");
    int__nav.appendChild(int__nav_label2);
    var int__nav_label2_input = document.createElement("input");
    int__nav_label2_input.type = "radio";
    int__nav_label2_input.name = "btf-protect-var";
    int__nav_label2_input.id = "true";
    int__nav_label2_input.click();
    int__nav_label2_input.onclick = function () {
      int__nav_label2_input.id = "true";
      document.body.addEventListener("mousemove", CaptchaEdit.findElementForCaptcha, {
        passive: true
      });
      if (clickHandler) {
        document.body.addEventListener("click", clickHandler);
      }
      if (saved_element) {
        last_element = saved_element;
        CaptchaEdit.addClass(last_element, "btf-protect-int__detect");
        target_form = CaptchaEdit.getFullSelector(saved_element);
        target_form = target_form.replace(".body-with-protect", "").replace(".btf-protect-int__detect", "").replace(".btf-protect-int__almost", "");
        var list = document.querySelectorAll(target_form);
        if (list.length > 1) {
          var i = Array.prototype.indexOf.call(list, saved_element);
          target_form += ":" + i;
        }
        var first = target_form.substring(0, 20).toUpperCase();
        var last = target_form.substring(target_form.length - 20).toUpperCase();
        int__choised_p.innerText = first + "..." + last;
        int__choised.style.visibility = "visible";
      }
      int__alert_text.innerText = "Выберите элемент, который нужно защищать";
    };
    if (int__nav_label2_input.id == "true") {
      document.body.addEventListener("mousemove", CaptchaEdit.findElementForCaptcha, {
        passive: true
      });
    }
    ;
    int__nav_label2.appendChild(int__nav_label2_input);
    var int__nav_label2_span = document.createElement("span");
    int__nav_label2_span.innerText = "Выбор элемента";
    int__nav_label2.appendChild(int__nav_label2_span);
    var int__alert_wrap = document.createElement("div");
    int__alert_wrap.className = "btf-protect-int__alert-wrap";
    int__head.appendChild(int__alert_wrap);
    var int__alert = document.createElement("div");
    int__alert.className = "btf-protect-int__alert";
    int__alert_wrap.appendChild(int__alert);
    var int__alert_icon = document.createElement("div");
    int__alert_icon.className = "btf-protect-int__alert-icon";
    int__alert.appendChild(int__alert_icon);
    var int__alert_icon_svg = document.createElement("img");
    int__alert_icon_svg.src = "//verify.botfaqtor.ru/btf-protect-int__alert-icon.svg";
    int__alert_icon.appendChild(int__alert_icon_svg);
    var int__alert_content = document.createElement("div");
    int__alert_content.className = "btf-protect-int__alert-content";
    int__alert.appendChild(int__alert_content);
    var int__alert_text = document.createElement("div");
    int__alert_text.className = "btf-protect-int__alert-text";
    int__alert_text.innerText = "Выберите элемент, который нужно защищать";
    int__alert_content.appendChild(int__alert_text);
    var int__button = document.createElement("button");
    int__button.className = "btf-protect-int__button";
    int__button.innerText = "Отменить";
    int__button.onclick = function () {
      sessionStorage.removeItem("btfr_captcha_edit");
      if (typeof window.close == "function") {
        window.close();
      } else {
        sucessCaptchaSettingsPanel_1.showSucessCapchaSettingsPanel();
      }
    };
    int__head.appendChild(int__button);
    var int__choised = document.createElement("div");
    int__choised.className = "btf-protect-int__choised";
    document.body.appendChild(int__choised);
    var int__choised_first = document.createElement("div");
    int__choised_first.className = "btf-protect-int__choised-first";
    int__choised.appendChild(int__choised_first);
    var int__choised_item = document.createElement("div");
    int__choised_item.className = "btf-protect-int__choised-item";
    int__choised_first.appendChild(int__choised_item);
    var int__choised_span = document.createElement("span");
    int__choised_span.innerText = "Выбран элемент:";
    int__choised_item.appendChild(int__choised_span);
    var int__choised_p = document.createElement("p");
    if (selector != "null" && selector.trim() !== "" && selector.toLowerCase() !== "undefined") {
      if (selector.length > 45) {
        var first = selector.substring(0, 20).toUpperCase();
        var last = selector.substring(selector.length - 20).toUpperCase();
        int__choised_p.innerText = first + "..." + last;
      } else {
        int__choised_p.innerText = selector.toUpperCase();
      }
    }
    int__choised_item.appendChild(int__choised_p);
    var int__choised_second = document.createElement("div");
    int__choised_second.className = "btf-protect-int__choised-second";
    int__choised.appendChild(int__choised_second);
    var protect_all_pages = document.createElement("label");
    protect_all_pages.className = "btf-protect-int__protect-all";
    int__choised_second.appendChild(protect_all_pages);
    var protect_all_checkbox = document.createElement("input");
    protect_all_checkbox.type = "checkbox";
    protect_all_checkbox.className = "btf-protect-int__protect-all-checkbox";
    protect_all_pages.appendChild(protect_all_checkbox);
    var protect_all_text = document.createElement("span");
    protect_all_text.innerText = "Защищать на всех страницах сайта";
    protect_all_pages.appendChild(protect_all_text);
    var btf_protect_int__choised_button = document.createElement("button");
    btf_protect_int__choised_button.className = "btf-protect-int__choised-button";
    btf_protect_int__choised_button.innerText = "Защитить";
    btf_protect_int__choised_button.addEventListener("click", function () {
      return __awaiter(_this, undefined, undefined, function () {
        var protectAllPages;
        var finalSelector;
        var elements;
        var error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!target_form || target_form.trim() === "") {
                return [2];
              }
              protectAllPages = protect_all_checkbox.checked;
              finalSelector = target_form;
              if (last_element) {
                finalSelector = CaptchaEdit.optimizeSelectorForAllPages(target_form, last_element);
              }
              elements = {
                SiteId: bhd.inf.gid,
                GoalId: goal_id,
                TargetForm: finalSelector,
                Url: window.location.href,
                HasAllSite: protectAllPages
              };
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3,, 4]);
              return [4, http_1.Http.post_status("//server.botfaqtor.ru/api/websitesgroup/target-form", elements)];
            case 2:
              _a.sent();
              sessionStorage.removeItem("btfr_captcha_edit");
              if (typeof window.close === "function") {
                window.close();
              } else {
                sucessCaptchaSettingsPanel_1.showSucessCapchaSettingsPanel();
              }
              return [3, 4];
            case 3:
              error_1 = _a.sent();
              console.error("Ошибка при отправке данных:", error_1);
              return [3, 4];
            case 4:
              return [2];
          }
        });
      });
    });
    int__choised_second.appendChild(btf_protect_int__choised_button);
    int__choised.style.visibility = "hidden";
    if (selector != "null" && selector.trim() !== "" && selector.toLowerCase() !== "undefined") {
      target_form = selector;
      int__choised.style.visibility = "visible";
    }
    document.body.addEventListener("mousemove", CaptchaEdit.findElementForCaptcha, {
      passive: true
    });
    var last_element = null;
    function clickHandler(e) {
      if (int__nav_label2_input.id !== "true") {
        return;
      }
      var target = e.target;
      if (target.closest(".btf-protect-int__head") || target.closest(".btf-protect-int__choised")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var panel = document.querySelector(".btf-protect-int__head");
      var panel_rect = panel.getBoundingClientRect();
      var bottom_panel = document.querySelector(".btf-protect-int__choised");
      var bottom_panel_rect = bottom_panel.getBoundingClientRect();
      if (panel_rect.left <= e.clientX && e.clientX <= panel_rect.right && panel_rect.top <= e.clientY && e.clientY <= panel_rect.bottom || bottom_panel_rect.left <= e.clientX && e.clientX <= bottom_panel_rect.right && bottom_panel_rect.top <= e.clientY && e.clientY <= bottom_panel_rect.bottom) {
        return;
      }
      var elem = CaptchaEdit.findSuitableElement(target, e.clientX, e.clientY);
      if (!elem) {
        return;
      }
      if (elem != last_element) {
        if (last_element) {
          CaptchaEdit.removeClass(last_element, "btf-protect-int__detect");
        }
        last_element = elem;
        CaptchaEdit.removeClass(last_element, "btf-protect-int__almost");
        if (current_edit_element != null) {
          CaptchaEdit.removeClass(current_edit_element, "btf-protect-int__detect");
        }
        CaptchaEdit.addClass(last_element, "btf-protect-int__detect");
        target_form = CaptchaEdit.getFullSelector(elem);
        target_form = target_form.replace(".body-with-protect", "").replace(".btf-protect-int__detect", "").replace(".btf-protect-int__almost", "");
        if (target_form && target_form.trim() !== "") {
          var list = document.querySelectorAll(target_form);
          if (list.length > 1) {
            var i = Array.prototype.indexOf.call(list, elem);
            target_form += ":" + i;
          }
          if (target_form.length > 45) {
            var first = target_form.substring(0, 20).toUpperCase();
            var last = target_form.substring(target_form.length - 20).toUpperCase();
            int__choised_p.innerText = first + "..." + last;
          } else {
            int__choised_p.innerText = target_form.toUpperCase();
          }
          int__choised.style.visibility = "visible";
        } else {
          target_form = "";
          int__choised.style.visibility = "hidden";
        }
      }
    }
    document.body.addEventListener("click", clickHandler, {
      capture: true
    });
  };
  CaptchaEdit.find_child = function (e, x, y) {
    for (var i = 0; i < e.children.length; i++) {
      var el = e.children.item(i);
      var inner = CaptchaEdit.find_child(el, x, y);
      if (inner) {
        return inner;
      }
      var rect = el.getBoundingClientRect();
      if (rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) {
        return el;
      }
    }
    return null;
  };
  CaptchaEdit.hasClass = function (el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }
    if (!el.className) {
      return false;
    }
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  };
  CaptchaEdit.addClass = function (el, className) {
    if (el) {
      if (el.classList) {
        el.classList.add(className);
      } else if (!CaptchaEdit.hasClass(el, className)) {
        el.className += " " + className;
      }
    }
  };
  CaptchaEdit.removeClass = function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (CaptchaEdit.hasClass(el, className)) {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      el.className = el.className.replace(reg, " ");
    }
  };
  CaptchaEdit.get_cookie = function (name) {
    return document.cookie.split(";").some(function (c) {
      return c.trim().startsWith(name + "=");
    });
  };
  CaptchaEdit.delete_cookie = function (name, path, domain) {
    if (CaptchaEdit.get_cookie(name)) {
      document.cookie = name + "=" + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  };
  CaptchaEdit.isProtectableElement = function (element) {
    if (!element || !(element instanceof Element)) {
      return false;
    }
    var rect = element.getBoundingClientRect();
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    if (element.id) {
      var isVisible = rect.width > 0 && rect.height > 0 && !(rect.right < 0) && !(rect.bottom < 0) && !(rect.left > viewportWidth) && !(rect.top > viewportHeight);
      if (isVisible) {
        return true;
      }
    }
    if (rect.width === 0 || rect.height === 0 || rect.right < 0 || rect.bottom < 0 || rect.left > viewportWidth || rect.top > viewportHeight) {
      return false;
    }
    var tag = element.tagName.toLowerCase();
    var textTags = ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "label", "small", "b", "i", "strong", "em", "text"];
    if (textTags.includes(tag)) {
      return false;
    }
    var alwaysProtectableTags = ["form", "input", "textarea", "select", "button", "iframe", "img"];
    if (alwaysProtectableTags.includes(tag)) {
      return true;
    }
    var hasEventHandlers = element.hasAttribute("onclick") || element.hasAttribute("onsubmit") || element.hasAttribute("onmousedown") || element.hasAttribute("ontouchstart");
    if (hasEventHandlers) {
      return true;
    }
    if (tag === "a") {
      var href = element.getAttribute("href");
      var hasValidHref = href && href !== "#" && !href.startsWith("javascript:void");
      var hasChildren = element.children.length > 0;
      var hasImage = !!element.querySelector("img");
      return hasValidHref || hasChildren || hasImage;
    }
    if (tag === "div" || tag === "section" || tag === "article" || tag === "aside" || tag === "main" || tag === "nav") {
      var hasInteractiveChildren = !!element.querySelector("input, button, a, textarea, select, iframe, img, [role=\"button\"], [tabindex], [onclick], [onsubmit], [onmousedown], [ontouchstart]");
      var isSpecialContainer = element.getAttribute("role") === "dialog" || element.getAttribute("role") === "form" || element.getAttribute("role") === "button" || element.getAttribute("role") === "link" || !!element.querySelector("form");
      var hasReasonableSize = rect.width <= viewportWidth * 0.9 && rect.height <= viewportHeight * 0.9 && rect.width >= 30 && rect.height >= 30;
      return (hasInteractiveChildren || isSpecialContainer) && hasReasonableSize;
    }
    return false;
  };
  CaptchaEdit.findSuitableElement = function (elem, x, y) {
    elem = CaptchaEdit.find_child(elem, x, y) || elem;
    while (elem && !CaptchaEdit.isProtectableElement(elem)) {
      elem = elem.parentElement;
    }
    return elem;
  };
  CaptchaEdit.findElementForCaptcha = function (e) {
    var elem = document.elementFromPoint(e.clientX, e.clientY);
    var style = window.getComputedStyle(elem);
    if (style.content && style.content !== "none" && (style.position === "absolute" || style.position === "fixed")) {
      return;
    }
    var panel = document.querySelector(".btf-protect-int__head");
    var panel_rect = panel.getBoundingClientRect();
    var bottom_panel = document.querySelector(".btf-protect-int__choised");
    var bottom_panel_rect = bottom_panel.getBoundingClientRect();
    if (panel_rect.left <= e.clientX && e.clientX <= panel_rect.right && panel_rect.top <= e.clientY && e.clientY <= panel_rect.bottom || bottom_panel_rect.left <= e.clientX && e.clientX <= bottom_panel_rect.right && bottom_panel_rect.top <= e.clientY && e.clientY <= bottom_panel_rect.bottom) {
      if (CaptchaEdit.selected_item) {
        CaptchaEdit.selected_item.style.pointerEvents = "auto";
        CaptchaEdit.removeClass(CaptchaEdit.selected_item, "btf-protect-int__almost");
        CaptchaEdit.selected_item = null;
      }
      var hint_1 = document.querySelector(".btf-protect-int__selector-hint");
      if (hint_1) {
        hint_1.style.display = "none";
      }
      return;
    }
    elem = CaptchaEdit.findSuitableElement(elem, e.clientX, e.clientY);
    var hint = document.querySelector(".btf-protect-int__selector-hint");
    if (!elem || elem.closest(".btf-protect-int__choised")) {
      if (hint) {
        hint.style.display = "none";
      }
      if (CaptchaEdit.selected_item) {
        CaptchaEdit.removeClass(CaptchaEdit.selected_item, "btf-protect-int__almost");
        CaptchaEdit.selected_item.style.pointerEvents = "auto";
        CaptchaEdit.selected_item = null;
      }
      return;
    }
    if (hint) {
      hint.style.display = "block";
      hint.style.left = e.clientX + "px";
      hint.style.top = e.clientY + "px";
    }
    if (elem != CaptchaEdit.selected_item) {
      if (CaptchaEdit.selected_item) {
        CaptchaEdit.selected_item.style.pointerEvents = "auto";
        CaptchaEdit.removeClass(CaptchaEdit.selected_item, "btf-protect-int__almost");
      }
      CaptchaEdit.selected_item = elem;
      if (!elem.closest(".btf-protect-int__head") && !elem.closest(".btf-protect-int__choised")) {
        CaptchaEdit.selected_item.style.pointerEvents = "none";
        CaptchaEdit.addClass(CaptchaEdit.selected_item, "btf-protect-int__almost");
        if (!hint) {
          hint = document.createElement("div");
          hint.className = "btf-protect-int__selector-hint";
          document.body.appendChild(hint);
        }
        var selector = CaptchaEdit.getFullSelector(elem).replace(".body-with-protect", "").replace(".btf-protect-int__detect", "").replace(".btf-protect-int__almost", "");
        var list = document.querySelectorAll(selector);
        if (list.length > 1) {
          var i = Array.prototype.indexOf.call(list, elem);
          selector += ":" + i;
        }
        if (selector.length > 45) {
          var first = selector.substring(0, 20).toUpperCase();
          var last = selector.substring(selector.length - 20).toUpperCase();
          hint.textContent = first + "..." + last;
        } else {
          hint.textContent = selector.toUpperCase();
        }
      }
    }
  };
  CaptchaEdit.cleanSelector = function (selector) {
    return selector.split(" ").map(function (part) {
      var _a = part.split(".");
      var tag = _a[0];
      var classes = _a.slice(1);
      var cleanClasses = classes.filter(Boolean).map(function (cls) {
        return "." + CSS.escape(cls.trim());
      }).join("");
      return tag + cleanClasses;
    }).join(" ");
  };
  CaptchaEdit.getFullSelector = function (element) {
    if (!element || !element.tagName) {
      return "";
    }
    try {
      var parts = [];
      while (element && element !== document.documentElement) {
        var part = element.tagName.toLowerCase();
        if (element.id) {
          var safeId = CSS.escape(element.id.trim());
          part += "#" + safeId;
          parts.unshift(part);
          break;
        } else if (element.className && typeof element.className === "string") {
          var classes = element.className.trim().split(/\s+/).filter(Boolean).slice(0, 3);
          if (classes.length > 0) {
            part += classes.map(function (cls) {
              return "." + CSS.escape(cls.trim());
            }).join("");
          }
        }
        parts.unshift(part);
        element = element.parentElement;
        if (parts.length >= 4) {
          break;
        }
      }
      var selector = parts.join(" ");
      try {
        document.querySelector(selector);
        return selector;
      } catch (_a) {
        return this.cleanSelector(selector);
      }
    } catch (e) {
      return element.tagName.toLowerCase();
    }
  };
  CaptchaEdit.optimizeSelectorForAllPages = function (selector, element) {
    function checkSelector(sel) {
      try {
        var found = document.querySelector(sel);
        return found === element;
      } catch (_a) {
        return false;
      }
    }
    var parts = selector.split(" ").filter(Boolean).map(function (part) {
      var _a = part.split(".");
      var tag = _a[0];
      var classes = _a.slice(1);
      var significantClasses = classes.filter(function (cls) {
        return !cls.match(/initialized|fade-in|scale|desktop|online|wrapper|left|right|content|row/) && !cls.includes("support") && cls.includes("__");
      });
      if (significantClasses.length > 0) {
        return "." + significantClasses.join(".");
      } else {
        return tag;
      }
    }).filter(function (part) {
      return part !== "div" && part !== "section" && part !== "body";
    });
    var significantParts = parts.filter(function (part) {
      return part.includes("__");
    });
    if (significantParts.length >= 2) {
      var containerPart = significantParts.find(function (part) {
        return part.includes("container") || part.includes("wrapper");
      });
      var targetPart = significantParts[significantParts.length - 1];
      var optimizedSelector = containerPart ? containerPart + " " + targetPart : significantParts[0] + " " + targetPart;
      if (checkSelector(optimizedSelector)) {
        return optimizedSelector;
      }
    }
    return selector;
  };
  CaptchaEdit.selected_item = null;
  return CaptchaEdit;
}();
exports.CaptchaEdit = CaptchaEdit;