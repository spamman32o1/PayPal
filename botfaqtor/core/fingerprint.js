Object.defineProperty(exports, "__esModule", {
  value: true
});
var fp = require("./fingerprint_js2.js");
var ua_parser_js_1 = require("ua-parser-js");
var Fingerprint = function () {
  function Fingerprint(value, components) {
    this.value = value;
    this.components = components;
  }
  Fingerprint.prototype.getValue = function () {
    return this.value;
  };
  Fingerprint.prototype.getComponents = function () {
    return this.components;
  };
  Fingerprint.get = function () {
    function joinFingerprintObjects(array, sep) {
      var res = "";
      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (res != "") {
          res += sep;
        }
        res += obj.key + "," + obj.value;
      }
      return res;
    }
    function getFonts() {
      var baseFonts = ["monospace", "sans-serif", "serif"];
      var fontList = ["Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3"];
      fontList = fontList.filter(function (font, position) {
        return fontList.indexOf(font) === position;
      });
      var testString = "mmmmmmmmmmlli";
      var testSize = "72px";
      var h = document.getElementsByTagName("html")[0];
      var baseFontsDiv = document.createElement("div");
      var fontsDiv = document.createElement("div");
      var defaultWidth = {};
      var defaultHeight = {};
      function createSpan() {
        var s = document.createElement("span");
        s.style.position = "absolute";
        s.style.left = "-9999px";
        s.style.fontSize = testSize;
        s.style.lineHeight = "normal";
        s.innerHTML = testString;
        return s;
      }
      function createSpanWithFonts(fontToDetect, baseFont) {
        var s = createSpan();
        s.style.fontFamily = "'" + fontToDetect + "'," + baseFont;
        return s;
      }
      function initializeBaseFontsSpans() {
        var spans = [];
        for (var index = 0, length = baseFonts.length; index < length; index++) {
          var s = createSpan();
          s.style.fontFamily = baseFonts[index];
          baseFontsDiv.appendChild(s);
          spans.push(s);
        }
        return spans;
      }
      function initializeFontsSpans() {
        var spans = {};
        for (var i = 0, l = fontList.length; i < l; i++) {
          var fontSpans = [];
          for (var j = 0, numDefaultFonts = baseFonts.length; j < numDefaultFonts; j++) {
            var s = createSpanWithFonts(fontList[i], baseFonts[j]);
            fontsDiv.appendChild(s);
            fontSpans.push(s);
          }
          spans[fontList[i]] = fontSpans;
        }
        return spans;
      }
      function isFontAvailable(fontSpans) {
        var detected = false;
        for (var i = 0; i < baseFonts.length; i++) {
          detected = fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]];
          if (detected) {
            return detected;
          }
        }
        return detected;
      }
      var baseFontsSpans = initializeBaseFontsSpans();
      h.appendChild(baseFontsDiv);
      for (var index = 0, length = baseFonts.length; index < length; index++) {
        defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth;
        defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight;
      }
      var fontsSpans = initializeFontsSpans();
      h.appendChild(fontsDiv);
      var available = [];
      for (var i = 0, l = fontList.length; i < l; i++) {
        if (isFontAvailable(fontsSpans[fontList[i]])) {
          available.push(fontList[i]);
        }
      }
      h.removeChild(fontsDiv);
      h.removeChild(baseFontsDiv);
      return available;
    }
    function getWebglCanvas() {
      var canvas = document.createElement("canvas");
      var gl = null;
      try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      } catch (e) {}
      if (!gl) {
        gl = null;
      }
      return gl;
    }
    function getWebglVendorAndRenderer() {
      try {
        var glContext = getWebglCanvas();
        var extensionDebugRendererInfo = glContext.getExtension("WEBGL_debug_renderer_info");
        return glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + "~" + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
      } catch (e) {
        return null;
      }
    }
    function getBrowserName() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("MiuiBrowser") >= 0) {
        return "MiuiBrowser";
      } else if (userAgent.indexOf("NetCast") >= 0) {
        return "NetCast";
      }
      var parser = new ua_parser_js_1.UAParser(userAgent);
      var result = parser.getResult();
      return result.browser.name;
    }
    var f;
    var nav = navigator;
    (function () {
      return fp.get({
        NOT_AVAILABLE: null,
        ERROR: null,
        excludes: {
          userAgent: true,
          timezone: true,
          timezoneOffset: true,
          adBlock: true,
          doNotTrack: true,
          hasLiedBrowser: true,
          hasLiedLanguages: true,
          hasLiedOs: true,
          hasLiedResolution: true
        },
        extraComponents: [{
          key: "vendor",
          getData: function (done, options) {
            if (nav.vendor == undefined) {
              done("not available");
            } else {
              done(nav.vendor);
            }
          }
        }, {
          key: "productSub",
          getData: function (done, options) {
            var p = nav.productSub;
            if (p == undefined || typeof p != "string") {
              done("not available");
            } else {
              done(p);
            }
          }
        }, {
          key: "pluginsBool",
          getData: function (done, options) {
            done(nav.plugins != null && nav.plugins != undefined);
          }
        }, {
          key: "pluginsLenght",
          getData: function (done, options) {
            try {
              var length_1 = +nav.plugins.length;
              if (length_1 == undefined) {
                done(null);
              } else {
                done(length_1);
              }
            } catch (_a) {
              done(null);
            }
          }
        }, {
          key: "activeXObject",
          getData: function (done, options) {
            done(!!("ActiveXObject" in window));
          }
        }, {
          key: "browserName",
          getData: function (done, options) {
            try {
              done(getBrowserName());
            } catch (_a) {
              done("not available");
            }
          }
        }, {
          key: "fonts",
          getData: function (done, options) {
            try {
              done(getFonts());
            } catch (_a) {
              done("not available");
            }
          }
        }],
        preprocessor: function (key, value) {
          if (key == "deviceMemory") {
            var n = nav.deviceMemory;
            if (n == undefined || typeof n != "number") {
              return null;
            } else {
              return n;
            }
          } else if (key == "webglVendorAndRenderer") {
            var webgl = getWebglVendorAndRenderer();
            if (webgl == undefined) {
              return "not available";
            } else {
              return webgl;
            }
          } else {
            return value;
          }
        }
      }, function (c) {
        var hash = fp.x64hash128(joinFingerprintObjects(c, ""), 31);
        f = new Fingerprint(hash, c);
      });
    })();
    return f;
  };
  return Fingerprint;
}();
exports.Fingerprint = Fingerprint;