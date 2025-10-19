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
var events_1 = require("./core/events");
var criterias_1 = require("./core/criterias");
var client_1 = require("./core/client");
var options_1 = require("./core/evercookie/options");
var cookie_1 = require("./core/evercookie/sources/cookie");
var http_1 = require("./core/http");
var base_1 = require("./base");
var fp_1 = require("./fp");
var status_1 = require("./status");
var status_async_1 = require("./status_async");
var loadIframe_1 = require("./loadIframe");
var adsProtect_1 = require("./adsProtect");
var getCounters_1 = require("./getCounters");
var captcha_edit_1 = require("./slider/captcha_edit");
var slider_1 = require("./slider");
var viewInstalledCodePanel_1 = require("./core/viewInstalledCodePanel");
var SCRIPT_VERSION = 2;
function r(wnd) {
  return __awaiter(this, undefined, undefined, function () {
    function encode(u) {
      try {
        return encodeURI(u);
      } catch (_a) {
        return "";
      }
    }
    function getSiteData() {
      return {
        id: -1,
        tid: "",
        groupId: -1,
        clientType: 0,
        block: false,
        address: "",
        garbage: undefined,
        behaviour: undefined,
        categories: "",
        ads: false,
        hasChecks: false,
        google: undefined,
        yandex: undefined,
        extended: {
          y_id: 0,
          g_id: "",
          vk_id: null,
          bot_id: "",
          low_id: "",
          cap: null
        }
      };
    }
    function getSiteDataHttp() {
      return __awaiter(this, undefined, undefined, function () {
        var wnd;
        var groupId;
        var uri;
        var status_data;
        var data;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              wnd = window;
              groupId = null;
              if (typeof wnd._ab_id_ == "object") {
                groupId = +wnd._ab_id_[0];
              } else if (typeof wnd._ab_id_ == "number") {
                groupId = wnd._ab_id_;
              } else if (typeof wnd.ab_id == "number") {
                groupId = wnd.ab_id;
                console.log("Botfaqtor: установите корректный код на сайт");
              } else {
                throw new Error("groupId not specified");
              }
              uri = "https://gw.botfaqtor.ru/cfg/data/" + groupId + ".json";
              return [4, http_1.Http.get(uri)];
            case 1:
              status_data = _a.sent();
              if (typeof status_data === "object") {
                if (status_data[0]) {
                  if (status_data[0] == 200) {
                    if (status_data[1]) {
                      data = JSON.parse(status_data[1]);
                      wnd._ab_extra_ = data.extra;
                      return [2, data.config];
                    }
                  }
                }
                return [2, null];
              }
              return [2];
          }
        });
      });
    }
    function getAbData() {
      return __awaiter(this, undefined, undefined, function () {
        var bhd_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4, getSiteDataHttp()];
            case 1:
              siteDataFromGet = _a.sent();
              if (siteDataFromGet != null) {
                bhd_1 = wnd._ab_data_ = {
                  inf: {
                    srv: siteDataFromGet.clientType,
                    adr: siteDataFromGet.address,
                    beh: siteDataFromGet.behaviour,
                    sid: siteDataFromGet.id,
                    gid: siteDataFromGet.groupId,
                    che: siteDataFromGet.hasChecks,
                    blo: siteDataFromGet.block,
                    ads: siteDataFromGet.ads,
                    cat: siteDataFromGet.categories,
                    tid: siteDataFromGet.tid,
                    ext: wnd._ab_extra_
                  },
                  unt: {
                    gar: siteDataFromGet.garbage
                  },
                  yan: {
                    yan: siteDataFromGet.yandex,
                    yid: siteDataFromGet.extended.y_id,
                    type: ""
                  },
                  goo: {
                    goo: siteDataFromGet.google,
                    gid: siteDataFromGet.extended.g_id,
                    bid: siteDataFromGet.extended.bot_id,
                    lid: siteDataFromGet.extended.low_id,
                    type: ""
                  },
                  vka: {
                    vid: siteDataFromGet.extended.vk_id
                  },
                  cap: {
                    sts: 0,
                    arr: siteDataFromGet.extended.cap
                  },
                  sdt: siteDataFromGet.extended,
                  uid: getUid()
                };
              }
              return [2, bhd];
          }
        });
      });
    }
    function onEvent(evt) {
      client.event(evt);
    }
    function onEvents(evt) {
      client.events(evt);
    }
    function onUid(uid) {
      var cookie = new cookie_1.Cookie(new options_1.EverCookieOptions());
      if (uid != "00000000-0000-0000-0000-000000000000") {
        cookie.set("ab_id", uid);
      }
    }
    function onError(err) {
      console.log(err);
    }
    function getTariff() {
      if (bhd.inf.tid == "4b67d34b6f1fa8e92698a96539646033") {
        return "e";
      } else if (bhd.inf.tid == "11b64bb504cf37e17c9e8cd846b6d913") {
        return "u";
      } else if (bhd.inf.tid == "7d97e98f8af710c7e7fe703abc8f639e") {
        return "u_plus";
      } else if (bhd.inf.tid == "2c1743a391305fbf367df8e4f069f9f9") {
        return "e_plus";
      } else if (bhd.inf.tid == "e894e5c8eb5182441d3c6a6c91b70dd9") {
        return "u_dog";
      } else {
        return null;
      }
    }
    function sendCaptchaData(bhd, t, i, hash, ab_id) {
      var h = location.href;
      var url = "https://" + adr + ".botfaqtor.ru";
      var sid = bhd.inf.sid;
      var uid = ab_id !== null && ab_id !== undefined ? ab_id.toString() : "";
      http_1.Http.post(url + "/visit/" + sid + "/4", {
        u: navigator.userAgent,
        i: i,
        t: t,
        h: h,
        s: hash,
        a: uid
      });
    }
    function elementDefence(bhd, el, id) {
      if (!el) {
        console.warn("Botfaqtor: Элемент для защиты не найден");
        return;
      }
      var s = 0;
      if (false && !el.hasAttribute("href") && el.nodeName != "BUTTON" && el.nodeName != "A") {
        el.addEventListener("click", function (event) {
          if (bhd.cap.sts != 1) {
            getCaptcha(bhd, id);
            sendCaptchaData(bhd, 0, id, bhd.hah, bhd.uid);
            setInterval(function () {
              if (bhd.cap.sts == 1 && s != 1) {
                s = 1;
              }
            }, 50);
          }
        });
      } else {
        var div = createOverlayDiv(el);
        if (div.style.top != el.style.top) {
          div.style.top = el.getBoundingClientRect().top + "px";
        }
        if (div.style.left != el.style.left) {
          div.style.left = el.getBoundingClientRect().left + "px";
        }
        document.body.appendChild(div);
        window.addEventListener("scroll", function () {
          var updatedRect = el.getBoundingClientRect();
          div.style.top = updatedRect.top + "px";
          div.style.left = updatedRect.left + "px";
        });
        window.addEventListener("resize", function () {
          var updatedRect = el.getBoundingClientRect();
          div.style.width = updatedRect.width + "px";
          div.style.height = updatedRect.height + "px";
          div.style.top = updatedRect.top + "px";
          div.style.left = updatedRect.left + "px";
        });
        setInterval(function () {
          if (bhd.cap.sts == 1) {
            div.style.visibility = "hidden";
          }
        }, 50);
        div.addEventListener("click", function (event) {
          event.preventDefault();
          getCaptcha(bhd, id);
          sendCaptchaData(bhd, 0, id, bhd.hah, bhd.uid);
          setInterval(function () {
            if (bhd.cap.sts == 1 && s != 1) {
              el.click();
              s = 1;
            }
          }, 50);
        });
      }
    }
    function createOverlayDiv(element) {
      var div = document.createElement("div");
      var elementRect = element.getBoundingClientRect();
      div.style.position = "fixed";
      div.style.width = elementRect.width + "px";
      div.style.height = elementRect.height + "px";
      div.style.top = elementRect.top + "px";
      div.style.left = elementRect.left + "px";
      div.style.zIndex = "2147483641";
      div.style.pointerEvents = "auto";
      div.style.cursor = "pointer";
      return div;
    }
    function getCaptcha(bhd, bounce_id) {
      var full_popup = document.createElement("div");
      full_popup.id = "full_bf_c";
      full_popup.style.position = "fixed";
      full_popup.style.top = "0px";
      full_popup.style.left = "0px";
      full_popup.style.zIndex = "2147483642";
      full_popup.style.width = "100vw";
      full_popup.style.height = "100vh";
      full_popup.style.background = "rgba(255, 255, 255, 0.4)";
      document.body.appendChild(full_popup);
      full_popup.style.display = "block";
      var popup = document.createElement("div");
      popup.id = "mini_bf_c";
      popup.style.position = "absolute";
      popup.style.top = "50%";
      popup.style.left = "50%";
      popup.style.zIndex = "2147483642";
      popup.style.width = "300px";
      popup.style.height = "150px";
      popup.style.transform = "translate(-50%, -50%)";
      popup.style.margin = "0 !important";
      popup.style.borderRadius = "10px";
      popup.style.boxShadow = "2px 2px 4px rgba(0,0,0,0.2)";
      popup.style.display = "block";
      full_popup.appendChild(popup);
      var cpt = slider_1.captcha({
        el: popup,
        width: 300,
        height: 150,
        onSuccess: function () {
          full_popup.style.display = "none";
          popup.style.display = "none";
          sendCaptchaData(bhd, 1, bounce_id, bhd.hah, bhd.uid);
          bhd.cap.sts = 1;
          bhd.fff = 1;
          if (sessionStorage) {
            sessionStorage.setItem("btfr_captcha_passed", "1");
          }
        },
        onFail: function () {
          sendCaptchaData(bhd, 2, bounce_id, bhd.hah, bhd.uid);
        },
        onRefresh: function () {}
      });
      cpt.init();
    }
    function getUid() {
      var uid;
      var cook = document.cookie;
      if (cook != null) {
        if (cook.indexOf("ab_id=") > -1) {
          uid = cook.split("ab_id=")[1];
          if (uid.indexOf(";") > -1) {
            uid = uid.split(";")[0];
          }
        }
      }
      if (uid == "00000000-0000-0000-0000-000000000000") {
        cookie.delete("ab_id");
        return undefined;
      }
      return uid;
    }
    function get_cookie(name) {
      return document.cookie.split(";").some(function (c) {
        return c.trim().startsWith(name + "=");
      });
    }
    function getLocationUrl() {
      var l = location.href;
      if (l == null) {
        l = window.location.origin + window.location.pathname;
      }
      return l;
    }
    function getBt() {
      var bt = null;
      var l = location.href;
      if (l.indexOf("?bt=") > -1) {
        var params = base_1.getJsonFromUrl(l);
        bt = params.bt;
        var host = window.location.host;
        if (host.indexOf("www.") >= 0) {
          host = host.split("www.")[1];
        }
        var domain = host.replace(/:\d+/, "");
        document.cookie = "bt=" + bt + "; domain=" + domain + "; max-age=31536000";
      } else {
        var cook = document.cookie;
        if (cook != null) {
          if (cook.indexOf("bt=") > -1) {
            bt = cook.split("bt=")[1];
            if (bt.indexOf(";") > -1) {
              bt = bt.split(";")[0];
            }
          }
        }
      }
      return bt;
    }
    function readCaptchaSettingParam() {
      var bhd = wnd._ab_data_;
      var frame = document.createElement("iframe");
      frame.id = "bf_captcha";
      frame.style.cssText = "position:absolute; left:-9999px; top:-9999px;";
      frame.src = "//c.botfaqtor.ru/edit.html?i=" + bhd.inf.gid;
      var anyFrame = frame;
      anyFrame.credentialless = false;
      window.document.body.appendChild(frame);
      window.addEventListener("message", function (e) {
        if (e.origin !== "https://c.botfaqtor.ru") {
          return;
        }
        var data = e.data;
        if (data) {
          if (data.event_id) {
            if (data.event_id == "btfr_captcha_edit") {
              if (data.data.gid != bhd.inf.gid) {
                frame.remove();
                return;
              } else {
                var goal_id = data.data.goal;
                sessionStorage.setItem("btfr_captcha_edit", goal_id);
                var selector = data.data.selector;
                sessionStorage.setItem("btfr_captcha_selector", selector);
                frame.remove();
              }
            }
            if (data.event_id == "btfr_code_checking") {
              if (data.data.gid != bhd.inf.gid) {
                frame.remove();
                return;
              } else {
                var flag = data.data.value;
                sessionStorage.setItem("btfr_code_checking", flag);
                frame.remove();
              }
            }
          }
        }
      }, false);
    }
    function normalizeUrl(url) {
      url = url.replace(/^@/, "");
      url = url.replace(/\/$/, "");
      url = url.toLowerCase();
      return url;
    }
    function compareUrls(url1, url2) {
      var normalizedUrl1 = normalizeUrl(url1);
      var normalizedUrl2 = normalizeUrl(url2);
      return normalizedUrl1 === normalizedUrl2;
    }
    function startCaptchaDefence() {
      var bhd = wnd._ab_data_;
      var a = bhd.cap.arr;
      if (!a || !Array.isArray(a)) {
        return;
      }
      if (!bhd.cap.srr) {
        bhd.cap.srr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      a.forEach(function (element) {
        var id = element.i;
        var selector = element.s;
        var url = element.u;
        var level = element.l;
        if (level < 1 || level > 10) {
          level = 5;
        }
        if (url == "*" || compareUrls(url, location_url)) {
          var protectedElement = null;
          try {
            if (selector.indexOf(":") > 0) {
              var split = selector.split(":");
              var se = split[0];
              var num = parseInt(split[1]);
              var elements = document.querySelectorAll(se);
              if (elements && elements.length > num) {
                protectedElement = elements[num];
              }
            } else {
              protectedElement = document.querySelector(selector);
            }
            if (level == 10) {
              elementDefence(bhd, protectedElement, id);
            } else if (protectedElement && bhd.cap.srr && bhd.cap.srr.length >= level && bhd.cap.srr[level - 1] == 1) {
              elementDefence(bhd, protectedElement, id);
            }
          } catch (e) {}
        }
      });
    }
    function wait_showCaptchaSettings(timeout) {
      var wnd = window;
      var g = sessionStorage.getItem("btfr_captcha_edit");
      var selector = "";
      if (sessionStorage.getItem("btfr_captcha_selector") !== null) {
        selector = sessionStorage.getItem("btfr_captcha_selector");
      }
      if (g && wnd.document.body) {
        captcha_edit_1.CaptchaEdit.showCaptchaSettings(wnd._ab_data_, Number(g), selector);
        return;
      }
      setTimeout(function () {
        wait_showCaptchaSettings(timeout);
      }, timeout);
    }
    function wait_readCaptchaSettingParam(timeout) {
      var wnd = window;
      if (wnd.document.body) {
        readCaptchaSettingParam();
        return;
      }
      setTimeout(function () {
        wait_readCaptchaSettingParam(timeout);
      }, timeout);
    }
    function vkAds(bhd) {
      var vk_ads = bhd.vka;
      var t = tid;
      if (t == "e" || t == "u" || t == "u_plus" || t == "e_plus" || t == "u_dog") {
        if (che) {
          if (vk_ads != null) {
            if (typeof vk_ads == "object") {
              var currentPixel = vk_ads.vid[0];
              if (currentPixel && bhd.sts == 302) {
                var _s = "_tmr.push({type: 'reachGoal', id: " + currentPixel + ", goal: 'bot'});";
                eval(_s);
                bhd.vks = 1;
              }
            }
          }
        }
      }
    }
    function blocked_by_captcha() {
      var bhd = wnd._ab_data_;
      var id = 0;
      var flag = 0;
      if (sessionStorage && sessionStorage.getItem("btfr_captcha_passed") === "1") {
        bhd.fff = 1;
        bhd.cap.sts = 1;
        return;
      }
      if (bhd.fff != 1) {
        getCaptcha(bhd, id);
        sendCaptchaData(bhd, 0, id, bhd.hah, bhd.uid);
        setInterval(function () {
          if (bhd.fff == 1 && flag != 1) {
            flag = 1;
            if (sessionStorage) {
              sessionStorage.setItem("btfr_captcha_passed", "1");
            }
          }
        }, 50);
      }
    }
    function run(location_url) {
      return __awaiter(this, undefined, undefined, function () {
        var bhd;
        var bt;
        var ref;
        var url;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              bhd = wnd._ab_data_;
              fp_1.fp(wnd);
              if (che) {
                bt = getBt();
                try {
                  if (!(location_url.indexOf("yclid=") > -1) && !(location_url.indexOf("gclid=") > -1)) {
                    status_1.get_status(wnd, bt);
                  }
                } catch (error) {}
              }
              if (bhd.sts != 302 || !che) {
                return [3, 1];
              }
              if (bhd.act == "captcha") {
                blocked_by_captcha();
              } else if (bhd.act.startsWith("/")) {
                location.href = bhd.act;
              } else {
                ref = encode(location.href);
                url = "https://checks.botfaqtor.ru";
                if (cat != null && cat != "") {
                  location.href = url + "/?id=" + bhd.hah + "&h=" + ref + "&c=" + cat;
                } else {
                  location.href = url + "/?id=" + bhd.hah + "&h=" + ref;
                }
              }
              return [3, 6];
            case 1:
              if (location_url == null) {
                return [3, 6];
              }
              client.introduce(sid, location_url, document.referrer, bhd.hah, bhd.fpr, bhd.uid, SCRIPT_VERSION);
              if (bhd.inf.beh == 1) {
                criterias_1.checkCriterias(wnd, events);
              }
              if (!che) {
                return [3, 3];
              }
              return [4, status_async_1.get_status_async(wnd)];
            case 2:
              _a.sent();
              if (ads) {
                getCounters_1.getCounters(wnd, siteData);
                adsProtect_1.adsProtect(wnd);
              }
              _a.label = 3;
            case 3:
              wait_readCaptchaSettingParam(200);
              wait_showCaptchaSettings(200);
              if (bhd.cap.has == true) {
                startCaptchaDefence();
              }
              if (bhd.vka.vid != undefined) {
                if (bhd.vka.vid.length > 0) {
                  vkAds(bhd);
                }
              }
              if (che) {
                return [3, 5];
              }
              return [4, status_async_1.get_status_async(wnd)];
            case 4:
              _a.sent();
              _a.label = 5;
            case 5:
              if (tid != "e" && tid != "e_plus") {
                loadIframe_1.loadIframe(wnd, srv, cat);
              }
              _a.label = 6;
            case 6:
              return [2];
          }
        });
      });
    }
    function run_async(location_url) {
      return __awaiter(this, undefined, undefined, function () {
        var bhd;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              bhd = wnd._ab_data_;
              fp_1.fp(wnd);
              getBt();
              if (location_url != null) {
                client.introduce(sid, location_url, document.referrer, bhd.hah, bhd.fpr, bhd.uid, SCRIPT_VERSION);
              }
              if (bhd.inf.beh == 1) {
                criterias_1.checkCriterias(wnd, events);
              }
              if (!ads || !che) {
                return [3, 2];
              }
              return [4, status_async_1.get_status_async(wnd)];
            case 1:
              _a.sent();
              getCounters_1.getCounters(wnd, siteData);
              adsProtect_1.adsProtect(wnd);
              _a.label = 2;
            case 2:
              wait_readCaptchaSettingParam(200);
              wait_showCaptchaSettings(200);
              if (bhd.cap.has == true) {
                startCaptchaDefence();
              }
              if (bhd.vka.vid != undefined) {
                if (bhd.vka.vid.length > 0) {
                  vkAds(bhd);
                }
              }
              if (che) {
                return [3, 4];
              }
              return [4, status_async_1.get_status_async(wnd)];
            case 3:
              _a.sent();
              _a.label = 4;
            case 4:
              if (tid != "e" && tid != "e_plus") {
                loadIframe_1.loadIframe(wnd, srv, cat);
              }
              return [2];
          }
        });
      });
    }
    function loading() {
      if (location.href) {
        var urlParams = base_1.getJsonFromUrl(location.href);
        if (urlParams.utm_term) {
          if (urlParams.utm_term.indexOf("{PHRASE}") > -1) {
            return;
          }
        }
        if (urlParams.bfq_debug) {
          if (urlParams.bfq_debug.indexOf("1") > -1) {
            viewInstalledCodePanel_1.wait_showInstalledCodeByUtm(100, gid, true);
          }
        }
        viewInstalledCodePanel_1.wait_showInstalledCodeByUserPanel(100, gid, false);
      }
      if (blo) {
        run(location_url);
      } else {
        run_async(location_url);
      }
    }
    var siteDataFromGet;
    var ref;
    var url;
    var bhd;
    var che;
    var sid;
    var gid;
    var srv;
    var ads;
    var cat;
    var blo;
    var siteData;
    var tid;
    var events;
    var adr;
    var client;
    var cookie;
    var location_url;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          siteDataFromGet = undefined;
          return [4, getAbData()];
        case 1:
          _a.sent();
          if (siteDataFromGet == null) {
            ref = encode(location.href);
            url = "https://checks.botfaqtor.ru";
            location.href = url + "/?id=ip&h=" + ref;
          }
          bhd = wnd._ab_data_;
          che = bhd.inf.che;
          sid = bhd.inf.sid;
          gid = bhd.inf.gid;
          srv = bhd.inf.srv;
          ads = bhd.inf.ads;
          cat = bhd.inf.cat;
          blo = bhd.inf.blo;
          siteData = bhd.sdt;
          bhd.inf.tid = getTariff();
          tid = bhd.inf.tid;
          events = new events_1.Events();
          adr = bhd.inf.adr.split(".").join("-");
          bhd.inf.adr = adr;
          client = new client_1.Client("https://" + adr + ".botfaqtor.ru", bhd.inf.sid);
          events.on("evt", onEvent);
          events.on("evts", onEvents);
          client.on("uid", onUid);
          client.on("error", onError);
          cookie = new cookie_1.Cookie(new options_1.EverCookieOptions());
          location_url = getLocationUrl();
          loading();
          return [2];
      }
    });
  });
}
r(window);