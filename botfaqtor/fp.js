Object.defineProperty(exports, "__esModule", {
  value: true
});
var fingerprint_1 = require("./core/fingerprint");
function fp(wnd) {
  var bhd = wnd._ab_data_;
  var fpData = fingerprint_1.Fingerprint.get();
  var obj = {};
  var nav = navigator;
  function getAdBlock() {
    var ads = document.createElement("div");
    ads.innerHTML = "&nbsp;";
    ads.className = "adsbox";
    var result = false;
    try {
      document.body.appendChild(ads);
      result = document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
      document.body.removeChild(ads);
    } catch (e) {
      result = false;
    }
    return result;
  }
  function getDoNotTrack() {
    try {
      var msDontr = nav.msDoNotTrack;
      var navDontr = nav.doNotTrack;
      if (msDontr) {
        if (msDontr == "0") {
          return false;
        } else if (msDontr == "1") {
          return true;
        } else if (msDontr == "yes") {
          return true;
        } else if (msDontr == "no") {
          return false;
        } else if (msDontr == "null") {
          return false;
        } else {
          return false;
        }
      } else if (navDontr) {
        if (navDontr == "0") {
          return false;
        } else if (navDontr == "1") {
          return true;
        } else if (navDontr == "unspecified") {
          return false;
        } else if (navDontr == "null") {
          return false;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (_a) {
      return false;
    }
  }
  function getHasLiedLanguages() {
    if (typeof navigator.languages !== "undefined") {
      try {
        var firstLanguages = navigator.languages[0].substr(0, 2);
        if (firstLanguages !== navigator.language.substr(0, 2)) {
          return true;
        }
      } catch (err) {
        return true;
      }
    }
    return false;
  }
  function getHasLiedResolution() {
    try {
      return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
    } catch (_a) {
      return null;
    }
  }
  function getBuildId() {
    var win = window;
    try {
      var b = win.navigator.buildID;
      if (b == undefined || typeof b != "string") {
        b = "undefined";
      }
      return b;
    } catch (_a) {
      return null;
    }
  }
  function getHasLiedOs() {
    var nav = navigator;
    var userAgent = nav.userAgent.toLowerCase();
    var oscpu = nav.oscpu;
    var platform = nav.platform.toLowerCase();
    var os;
    if (userAgent.indexOf("windows phone") >= 0) {
      os = "Windows Phone";
    } else if (userAgent.indexOf("win") >= 0) {
      os = "Windows";
    } else if (userAgent.indexOf("android") >= 0) {
      os = "Android";
    } else if (userAgent.indexOf("linux") >= 0) {
      os = "Linux";
    } else if (userAgent.indexOf("iphone") >= 0 || userAgent.indexOf("ipad") >= 0) {
      os = "iOS";
    } else if (userAgent.indexOf("mac") >= 0) {
      os = "Mac";
    } else {
      os = "Other";
    }
    var mobileDevice = "ontouchstart" in window || nav.maxTouchPoints > 0 || nav.msMaxTouchPoints > 0;
    if (mobileDevice && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other") {
      return true;
    }
    if (typeof oscpu !== "undefined") {
      oscpu = oscpu.toLowerCase();
      if (oscpu.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
        return true;
      } else if (oscpu.indexOf("linux") >= 0 && os !== "Linux" && os !== "Android") {
        return true;
      } else if (oscpu.indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS") {
        return true;
      } else if ((oscpu.indexOf("win") === -1 && oscpu.indexOf("linux") === -1 && oscpu.indexOf("mac") === -1) !== (os === "Other")) {
        return true;
      }
    }
    if (platform.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
      return true;
    } else if ((platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("pike") >= 0) && os !== "Linux" && os !== "Android") {
      return true;
    } else if ((platform.indexOf("mac") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS") {
      return true;
    } else if (os === "Other" && platform.indexOf("mac") === -1 && platform.indexOf("ipad") === -1 && platform.indexOf("ipod") === -1 && platform.indexOf("iphone") === -1 && platform.indexOf("linux") === -1 && platform.indexOf("android") === -1 && platform.indexOf("pike") === -1 && platform.indexOf("win") === -1) {
      return true;
    }
    return typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone";
  }
  function getHasLiedBrowser() {
    var nav = navigator;
    var userAgent = nav.userAgent.toLowerCase();
    var productSub = nav.productSub;
    var browser;
    if (userAgent.indexOf("firefox") >= 0) {
      browser = "Firefox";
    } else if (userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0) {
      browser = "Opera";
    } else if (userAgent.indexOf("chrome") >= 0) {
      browser = "Chrome";
    } else if (userAgent.indexOf("safari") >= 0) {
      browser = "Safari";
    } else if (userAgent.indexOf("trident") >= 0) {
      browser = "Internet Explorer";
    } else {
      browser = "Other";
    }
    if ((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107") {
      return true;
    }
    var tempRes = eval.toString().length;
    if (tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other") {
      return true;
    } else if (tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other") {
      return true;
    } else if (tempRes === 33 && browser !== "Chrome" && browser !== "Opera" && browser !== "Other") {
      return true;
    }
    var errFirefox;
    try {
      throw "a";
    } catch (err) {
      try {
        err.toSource();
        errFirefox = true;
      } catch (errOfErr) {
        errFirefox = false;
      }
    }
    return errFirefox && browser !== "Firefox" && browser !== "Other";
  }
  function timezone() {
    try {
      var param = wnd.Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (param == undefined) {
        return "not available";
      } else {
        return param;
      }
    } catch (_a) {
      return "not available";
    }
  }
  function timezoneOffset() {
    try {
      var timeOffset = new Date().getTimezoneOffset();
      if (timeOffset == undefined || typeof timeOffset != "number") {
        return null;
      } else {
        return timeOffset;
      }
    } catch (_a) {
      return null;
    }
  }
  function getWebdriver() {
    try {
      var webdrv = navigator.webdriver;
      if (webdrv == undefined) {
        return false;
      }
      if (webdrv == true) {
        return true;
      }
      if (webdrv == false) {
        return false;
      } else {
        return null;
      }
    } catch (_a) {
      return null;
    }
  }
  function getBodyStyle() {
    try {
      var bs = document.body.style;
      if ("msTransform" in bs) {
        return "ms";
      } else if ("MozTransform" in bs && "MozColumnCount" in bs && "MozBorderImage" in bs && "MozColumnGap" in bs) {
        return "moz";
      } else if ("OTransform" in bs) {
        return "opera";
      } else {
        return "undefined";
      }
    } catch (_a) {
      return null;
    }
  }
  function getHiddenFunc(d) {
    try {
      if (d.webkitHidden != undefined) {
        return "webkitHidden";
      }
      if (d.msHidden != undefined) {
        return "msHidden";
      }
      if (d.mozHidden != undefined) {
        return "mozHidden";
      } else {
        return "n/a";
      }
    } catch (_a) {
      return "n/a";
    }
  }
  for (var _i = 0, _a = fpData.getComponents(); _i < _a.length; _i++) {
    var item = _a[_i];
    obj[item.key] = item.value;
  }
  obj.adBlock = getAdBlock();
  obj.bodyStyle = getBodyStyle();
  obj.buildId = getBuildId();
  obj.clipboard = nav.clipboard != null && nav.clipboard != undefined;
  var cd = wnd.screen.colorDepth;
  obj.colorDepth = +cd;
  obj.doNotTrack = getDoNotTrack();
  obj.getBattery = !!("getBattery" in nav);
  obj.hasLiedLanguages = getHasLiedLanguages();
  obj.hasLiedResolution = getHasLiedResolution();
  obj.hasLiedOs = getHasLiedOs();
  obj.hasLiedBrowser = getHasLiedBrowser();
  obj.locationBar = wnd.locationbar && wnd.locationbar.visible || wnd.locationbar != undefined;
  obj.mozInnerScreen = "mozInnerScreenX" in wnd && "mozInnerScreenY" in wnd;
  obj.requestFileSystem = !!("webkitRequestFileSystem" in wnd);
  obj.timezone = timezone();
  obj.timezoneOffset = timezoneOffset();
  obj.userAgent = nav.userAgent;
  obj.webdriver = getWebdriver();
  obj.productSub = nav.productSub.toString();
  obj.phantom = !!wnd.callPhantom || !!wnd._phantom;
  obj.node = wnd.Buffer !== undefined;
  if (bhd.inf.sid == 152156) {
    obj.node = false;
  }
  obj.coach = wnd.emit !== undefined;
  obj.rhino = wnd.spawn !== undefined;
  obj.domAuto = wnd.domAutomation !== undefined || wnd.domAutomationController !== undefined;
  obj.online = wnd.navigator.onLine;
  obj.audio = null;
  obj.canvas = null;
  obj.webgl = null;
  obj.touchSupport = null;
  obj.pixelRatio = null;
  var d = document;
  obj.performance = !!wnd.performance && typeof performance.now == "function";
  obj.topself = window.top === window.self;
  obj.hiddenFunc = getHiddenFunc(d);
  obj.hasFocus = "hasFocus" in document ? document.hasFocus() ? true : false : undefined;
  obj.sendBeacon = nav.sendBeacon ? true : false;
  obj.hasCookie = !!nav.cookieEnabled;
  obj.media = nav.mediaDevices && nav.mediaDevices.getUserMedia ? 2 : nav.getUserMedia ? 1 : 0;
  obj.mFullScreen = !!d.mozCancelFullScreen || !!d.mozFullScreen || !!d.mozFullScreenElement || !!d.mozFullScreenEnabled || !!d.mozSetImageElement;
  obj.mRtci = !!wnd.mozRTCIceCandidate || !!wnd.mozRTCPeerConnection || !!wnd.mozRTCSessionDescription;
  if (obj.fonts == "TypeError: Cannot read property 'appendChild' of undefined") {
    obj.fonts = ["TypeError"];
  }
  obj.uaDataMobile = null;
  obj.uaDataPlatform = null;
  obj.uaDataBrands = null;
  var uaData = nav.userAgentData;
  if (uaData != undefined) {
    if (typeof uaData.brands == "object") {
      obj.uaDataBrands = uaData.brands;
      obj.uaDataMobile = uaData.mobile;
      obj.uaDataPlatform = uaData.platform;
    }
  }
  obj.windowChrome = !!wnd.chrome;
  obj.doNotTrack = !!obj.doNotTrack;
  if (typeof obj.productSub != "string") {
    obj.productSub = obj.productSub.toString();
  }
  if (typeof obj.deviceMemory != "number") {
    obj.deviceMemory = null;
  }
  var scr = obj.screenResolution;
  if (typeof scr[0] != "number" || typeof scr[1] != "number") {
    obj.screenResolution = [0, 0];
  }
  var av_scr = obj.availableScreenResolution;
  if (typeof av_scr[0] != "number" || typeof av_scr[1] != "number") {
    obj.availableScreenResolution = [0, 0];
  }
  if (typeof obj.hardwareConcurrency != "number") {
    obj.hardwareConcurrency = null;
  }
  bhd.fpr = obj;
  bhd.hah = fpData.getValue();
}
exports.fp = fp;