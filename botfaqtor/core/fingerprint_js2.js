(function (name, context, definition) {
  'use strict';

  if (typeof _module2 !== "undefined" && module.exports) {
    module.exports = definition();
  } else if (context.exports) {
    context.exports = definition();
  } else {
    context[name] = definition();
  }
})("Fingerprint2", this, function () {
  'use strict';

  function x64Add(m, n) {
    m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
    n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
    var o = [0, 0, 0, 0];
    o[3] += m[3] + n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 65535;
    o[2] += m[2] + n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 65535;
    o[1] += m[1] + n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[0] += m[0] + n[0];
    o[0] &= 65535;
    return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
  }
  function x64Multiply(m, n) {
    m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
    n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
    var o = [0, 0, 0, 0];
    o[3] += m[3] * n[3];
    o[2] += o[3] >>> 16;
    o[3] &= 65535;
    o[2] += m[2] * n[3];
    o[1] += o[2] >>> 16;
    o[2] &= 65535;
    o[2] += m[3] * n[2];
    o[1] += o[2] >>> 16;
    o[2] &= 65535;
    o[1] += m[1] * n[3];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[1] += m[2] * n[2];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[1] += m[3] * n[1];
    o[0] += o[1] >>> 16;
    o[1] &= 65535;
    o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
    o[0] &= 65535;
    return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
  }
  function x64Rotl(m, n) {
    n %= 64;
    if (n === 32) {
      return [m[1], m[0]];
    } else if (n < 32) {
      return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
    } else {
      n -= 32;
      return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
    }
  }
  function x64LeftShift(m, n) {
    n %= 64;
    if (n === 0) {
      return m;
    } else if (n < 32) {
      return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
    } else {
      return [m[1] << n - 32, 0];
    }
  }
  function x64Xor(m, n) {
    return [m[0] ^ n[0], m[1] ^ n[1]];
  }
  function x64Fmix(h) {
    h = x64Xor(h, [0, h[0] >>> 1]);
    h = x64Multiply(h, [4283543511, 3981806797]);
    h = x64Xor(h, [0, h[0] >>> 1]);
    h = x64Multiply(h, [3301882366, 444984403]);
    h = x64Xor(h, [0, h[0] >>> 1]);
    return h;
  }
  function x64hash128(key, seed) {
    key = key || "";
    seed = seed || 0;
    var remainder = key.length % 16;
    var bytes = key.length - remainder;
    var h1 = [0, seed];
    var h2 = [0, seed];
    var k1 = [0, 0];
    var k2 = [0, 0];
    var c1 = [2277735313, 289559509];
    var c2 = [1291169091, 658871167];
    for (var i = 0; i < bytes; i = i + 16) {
      k1 = [key.charCodeAt(i + 4) & 255 | (key.charCodeAt(i + 5) & 255) << 8 | (key.charCodeAt(i + 6) & 255) << 16 | (key.charCodeAt(i + 7) & 255) << 24, key.charCodeAt(i) & 255 | (key.charCodeAt(i + 1) & 255) << 8 | (key.charCodeAt(i + 2) & 255) << 16 | (key.charCodeAt(i + 3) & 255) << 24];
      k2 = [key.charCodeAt(i + 12) & 255 | (key.charCodeAt(i + 13) & 255) << 8 | (key.charCodeAt(i + 14) & 255) << 16 | (key.charCodeAt(i + 15) & 255) << 24, key.charCodeAt(i + 8) & 255 | (key.charCodeAt(i + 9) & 255) << 8 | (key.charCodeAt(i + 10) & 255) << 16 | (key.charCodeAt(i + 11) & 255) << 24];
      k1 = x64Multiply(k1, c1);
      k1 = x64Rotl(k1, 31);
      k1 = x64Multiply(k1, c2);
      h1 = x64Xor(h1, k1);
      h1 = x64Rotl(h1, 27);
      h1 = x64Add(h1, h2);
      h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 1390208809]);
      k2 = x64Multiply(k2, c2);
      k2 = x64Rotl(k2, 33);
      k2 = x64Multiply(k2, c1);
      h2 = x64Xor(h2, k2);
      h2 = x64Rotl(h2, 31);
      h2 = x64Add(h2, h1);
      h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 944331445]);
    }
    k1 = [0, 0];
    k2 = [0, 0];
    switch (remainder) {
      case 15:
        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48));
      case 14:
        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40));
      case 13:
        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32));
      case 12:
        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24));
      case 11:
        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16));
      case 10:
        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8));
      case 9:
        k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)]);
        k2 = x64Multiply(k2, c2);
        k2 = x64Rotl(k2, 33);
        k2 = x64Multiply(k2, c1);
        h2 = x64Xor(h2, k2);
      case 8:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56));
      case 7:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48));
      case 6:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40));
      case 5:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32));
      case 4:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24));
      case 3:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16));
      case 2:
        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8));
      case 1:
        k1 = x64Xor(k1, [0, key.charCodeAt(i)]);
        k1 = x64Multiply(k1, c1);
        k1 = x64Rotl(k1, 31);
        k1 = x64Multiply(k1, c2);
        h1 = x64Xor(h1, k1);
    }
    h1 = x64Xor(h1, [0, key.length]);
    h2 = x64Xor(h2, [0, key.length]);
    h1 = x64Add(h1, h2);
    h2 = x64Add(h2, h1);
    h1 = x64Fmix(h1);
    h2 = x64Fmix(h2);
    h1 = x64Add(h1, h2);
    h2 = x64Add(h2, h1);
    return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
  }
  var defaultOptions = {
    preprocessor: null,
    audio: {
      timeout: 1000,
      excludeIOS11: true
    },
    fonts: {
      swfContainerId: "fingerprintjs2",
      swfPath: "flash/compiled/FontList.swf",
      userDefinedFonts: [],
      extendedJsFonts: false
    },
    screen: {
      detectScreenOrientation: false
    },
    plugins: {
      sortPluginsFor: [/palemoon/i],
      excludeIE: false
    },
    extraComponents: [],
    excludes: {
      enumerateDevices: true,
      pixelRatio: true,
      doNotTrack: true,
      fontsFlash: true
    },
    NOT_AVAILABLE: "not available",
    ERROR: "error",
    EXCLUDED: "excluded"
  };
  function each(obj, iterator) {
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
      obj.forEach(iterator);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        iterator(obj[i], i, obj);
      }
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj);
        }
      }
    }
  }
  function map(obj, iterator) {
    var results = [];
    if (obj == null) {
      return results;
    }
    if (Array.prototype.map && obj.map === Array.prototype.map) {
      return obj.map(iterator);
    }
    each(obj, function (value, index, list) {
      results.push(iterator(value, index, list));
    });
    return results;
  }
  function extendSoft(target, source) {
    if (source == null) {
      return target;
    }
    var value;
    var key;
    for (key in source) {
      value = source[key];
      if (value != null && !Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = value;
      }
    }
    return target;
  }
  function isEnumerateDevicesSupported() {
    return navigator.mediaDevices && navigator.mediaDevices.enumerateDevices;
  }
  function UserAgent(done) {
    done(navigator.userAgent);
  }
  function languageKey(done, options) {
    done(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE);
  }
  function colorDepthKey(done, options) {
    done(window.screen.colorDepth || options.NOT_AVAILABLE);
  }
  function deviceMemoryKey(done, options) {
    done(navigator.deviceMemory || options.NOT_AVAILABLE);
  }
  function pixelRatioKey(done, options) {
    done(window.devicePixelRatio || options.NOT_AVAILABLE);
  }
  function screenResolutionKey(done, options) {
    done(getScreenResolution(options));
  }
  function getScreenResolution(options) {
    var resolution = [window.screen.width, window.screen.height];
    return resolution;
  }
  function availableScreenResolutionKey(done, options) {
    done(getAvailableScreenResolution(options));
  }
  function getAvailableScreenResolution(options) {
    if (window.screen.availWidth && window.screen.availHeight) {
      var available = [window.screen.availWidth, window.screen.availHeight];
      return available;
    }
    return options.NOT_AVAILABLE;
  }
  function timezoneOffset(done) {
    done(new Date().getTimezoneOffset());
  }
  function timezone(done, options) {
    if (window.Intl && window.Intl.DateTimeFormat) {
      done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone);
      return;
    }
    done(options.NOT_AVAILABLE);
  }
  function sessionStorageKey(done, options) {
    done(hasSessionStorage(options));
  }
  function localStorageKey(done, options) {
    done(hasLocalStorage(options));
  }
  function indexedDbKey(done, options) {
    done(hasIndexedDB(options));
  }
  function addBehaviorKey(done) {
    done(!!document.body && !!document.body.addBehavior);
  }
  function openDatabaseKey(done) {
    done(!!window.openDatabase);
  }
  function cpuClassKey(done, options) {
    done(getNavigatorCpuClass(options));
  }
  function platformKey(done, options) {
    done(getNavigatorPlatform(options));
  }
  function doNotTrackKey(done, options) {
    done(getDoNotTrack(options));
  }
  function canvasKey(done, options) {
    if (isCanvasSupported()) {
      done(getCanvasFp(options));
      return;
    }
    done(options.NOT_AVAILABLE);
  }
  function webglKey(done, options) {
    if (isWebGlSupported()) {
      done(getWebglFp());
      return;
    }
    done(options.NOT_AVAILABLE);
  }
  function webglVendorAndRendererKey(done) {
    if (isWebGlSupported()) {
      done(getWebglVendorAndRenderer());
      return;
    }
    done();
  }
  function adBlockKey(done) {
    done(getAdBlock());
  }
  function hasLiedLanguagesKey(done) {
    done(getHasLiedLanguages());
  }
  function hasLiedResolutionKey(done) {
    done(getHasLiedResolution());
  }
  function hasLiedOsKey(done) {
    done(getHasLiedOs());
  }
  function hasLiedBrowserKey(done) {
    done(getHasLiedBrowser());
  }
  function flashFontsKey(done, options) {
    if (!hasSwfObjectLoaded()) {
      return done("swf object not loaded");
    }
    if (!hasMinFlashInstalled()) {
      return done("flash not installed");
    }
    if (!options.fonts.swfPath) {
      return done("missing options.fonts.swfPath");
    }
    loadSwfAndDetectFonts(function (fonts) {
      done(fonts);
    }, options);
  }
  function pluginsComponent(done, options) {
    if (isIE()) {
      if (!options.plugins.excludeIE) {
        done(getIEPlugins(options));
      } else {
        done(options.EXCLUDED);
      }
    } else {
      done(getRegularPlugins(options));
    }
  }
  function getRegularPlugins(options) {
    if (navigator.plugins == null) {
      return options.NOT_AVAILABLE;
    }
    var plugins = [];
    for (var i = 0, l = navigator.plugins.length; i < l; i++) {
      if (navigator.plugins[i]) {
        plugins.push(navigator.plugins[i]);
      }
    }
    if (pluginsShouldBeSorted(options)) {
      plugins = plugins.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    return map(plugins, function (p) {
      var mimeTypes = map(p, function (mt) {
        return [mt.type, mt.suffixes];
      });
      return [p.name, p.description, mimeTypes];
    });
  }
  function getIEPlugins(options) {
    var result = [];
    if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
      var names = ["AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
      result = map(names, function (name) {
        try {
          new window.ActiveXObject(name);
          return name;
        } catch (e) {
          return options.ERROR;
        }
      });
    } else {
      result.push(options.NOT_AVAILABLE);
    }
    if (navigator.plugins) {
      result = result.concat(getRegularPlugins(options));
    }
    return result;
  }
  function pluginsShouldBeSorted(options) {
    var should = false;
    for (var i = 0, l = options.plugins.sortPluginsFor.length; i < l; i++) {
      var re = options.plugins.sortPluginsFor[i];
      if (navigator.userAgent.match(re)) {
        should = true;
        break;
      }
    }
    return should;
  }
  function touchSupportKey(done) {
    done(getTouchSupport());
  }
  function hardwareConcurrencyKey(done, options) {
    done(getHardwareConcurrency(options));
  }
  function hasSessionStorage(options) {
    try {
      return !!window.sessionStorage;
    } catch (e) {
      return options.ERROR;
    }
  }
  function hasLocalStorage(options) {
    try {
      return !!window.localStorage;
    } catch (e) {
      return options.ERROR;
    }
  }
  function hasIndexedDB(options) {
    try {
      return !!window.indexedDB;
    } catch (e) {
      return options.ERROR;
    }
  }
  function getHardwareConcurrency(options) {
    let hc = navigator.hardwareConcurrency;
    if (hc) {
      if (typeof hc == "number") {
        return navigator.hardwareConcurrency;
      }
    }
    return options.NOT_AVAILABLE;
  }
  function getNavigatorCpuClass(options) {
    return navigator.cpuClass || options.NOT_AVAILABLE;
  }
  function getNavigatorPlatform(options) {
    if (navigator.platform) {
      return navigator.platform;
    } else {
      return options.NOT_AVAILABLE;
    }
  }
  function getDoNotTrack(options) {
    if (navigator.doNotTrack) {
      return navigator.doNotTrack;
    } else if (navigator.msDoNotTrack) {
      return navigator.msDoNotTrack;
    } else if (window.doNotTrack) {
      return window.doNotTrack;
    } else {
      return options.NOT_AVAILABLE;
    }
  }
  function getTouchSupport() {
    var maxTouchPoints = 0;
    var touchEvent;
    if (typeof navigator.maxTouchPoints !== "undefined") {
      maxTouchPoints = navigator.maxTouchPoints;
    } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
      maxTouchPoints = navigator.msMaxTouchPoints;
    }
    try {
      document.createEvent("TouchEvent");
      touchEvent = true;
    } catch (_) {
      touchEvent = false;
    }
    var touchStart = "ontouchstart" in window;
    return [maxTouchPoints, touchEvent, touchStart];
  }
  function getCanvasFp(options) {
    var result = [];
    var canvas = document.createElement("canvas");
    canvas.width = 2000;
    canvas.height = 200;
    canvas.style.display = "inline";
    var ctx = canvas.getContext("2d");
    ctx.rect(0, 0, 10, 10);
    ctx.rect(2, 2, 6, 6);
    result.push("canvas winding:" + (ctx.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no"));
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    if (options.dontUseFakeFontInCanvas) {
      ctx.font = "11pt Arial";
    } else {
      ctx.font = "11pt no-real-font-123";
    }
    ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
    ctx.font = "18pt Arial";
    ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(0,255,255)";
    ctx.beginPath();
    ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(255,255,0)";
    ctx.beginPath();
    ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
    ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
    if (canvas.toDataURL) {
      result.push("canvas fp:" + canvas.toDataURL());
    }
    return result;
  }
  function getWebglFp() {
    var gl;
    function fa2s(fa) {
      gl.clearColor(0, 0, 0, 1);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      return "[" + fa[0] + ", " + fa[1] + "]";
    }
    function maxAnisotropy(gl) {
      var ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
      if (ext) {
        var anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        if (anisotropy === 0) {
          anisotropy = 2;
        }
        return anisotropy;
      } else {
        return null;
      }
    }
    gl = getWebglCanvas();
    if (!gl) {
      return null;
    }
    var result = [];
    var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
    var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    var vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    vertexPosBuffer.itemSize = 3;
    vertexPosBuffer.numItems = 3;
    var program = gl.createProgram();
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vShaderTemplate);
    gl.compileShader(vshader);
    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fShaderTemplate);
    gl.compileShader(fshader);
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
    program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
    gl.enableVertexAttribArray(program.vertexPosArray);
    gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.uniform2f(program.offsetUniform, 1, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
    try {
      result.push(gl.canvas.toDataURL());
    } catch (e) {}
    result.push("extensions:" + (gl.getSupportedExtensions() || []).join(";"));
    result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
    result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
    result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
    result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
    result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
    result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
    result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
    result.push("webgl max anisotropy:" + maxAnisotropy(gl));
    result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
    result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
    result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
    result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
    result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
    result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
    result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
    result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
    result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
    result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
    result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
    result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
    result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
    result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
    result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
    result.push("webgl version:" + gl.getParameter(gl.VERSION));
    try {
      var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (extensionDebugRendererInfo) {
        result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
        result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
      }
    } catch (e) {}
    if (!gl.getShaderPrecisionFormat) {
      return result;
    }
    each(["FLOAT", "INT"], function (numType) {
      each(["VERTEX", "FRAGMENT"], function (shader) {
        each(["HIGH", "MEDIUM", "LOW"], function (numSize) {
          each(["precision", "rangeMin", "rangeMax"], function (key) {
            var format = gl.getShaderPrecisionFormat(gl[shader + "_SHADER"], gl[numSize + "_" + numType])[key];
            if (key !== "precision") {
              key = "precision " + key;
            }
            var line = ["webgl ", shader.toLowerCase(), " shader ", numSize.toLowerCase(), " ", numType.toLowerCase(), " ", key, ":", format].join("");
            result.push(line);
          });
        });
      });
    });
    return result;
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
    return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight;
  }
  function getHasLiedOs() {
    var userAgent = navigator.userAgent.toLowerCase();
    var oscpu = navigator.oscpu;
    var platform = navigator.platform.toLowerCase();
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
    var mobileDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
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
    } else if ((platform.indexOf("win") === -1 && platform.indexOf("linux") === -1 && platform.indexOf("mac") === -1) !== (os === "Other")) {
      return true;
    }
    return typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone";
  }
  function getHasLiedBrowser() {
    var userAgent = navigator.userAgent.toLowerCase();
    var productSub = navigator.productSub;
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
  function isCanvasSupported() {
    var elem = document.createElement("canvas");
    return !!elem.getContext && !!elem.getContext("2d");
  }
  function isWebGlSupported() {
    if (!isCanvasSupported()) {
      return false;
    }
    var glContext = getWebglCanvas();
    return !!window.WebGLRenderingContext && !!glContext;
  }
  function isIE() {
    if (navigator.appName === "Microsoft Internet Explorer") {
      return true;
    } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
      return true;
    }
    return false;
  }
  function hasSwfObjectLoaded() {
    return typeof window.swfobject !== "undefined";
  }
  function hasMinFlashInstalled() {
    return window.swfobject.hasFlashPlayerVersion("9.0.0");
  }
  function addFlashDivNode(options) {
    var node = document.createElement("div");
    node.setAttribute("id", options.fonts.swfContainerId);
    document.body.appendChild(node);
  }
  function loadSwfAndDetectFonts(done, options) {
    var hiddenCallback = "___fp_swf_loaded";
    window[hiddenCallback] = function (fonts) {
      done(fonts);
    };
    var id = options.fonts.swfContainerId;
    addFlashDivNode();
    var flashvars = {
      onReady: hiddenCallback
    };
    var flashparams = {
      allowScriptAccess: "always",
      menu: "false"
    };
    window.swfobject.embedSWF(options.fonts.swfPath, id, "1", "1", "9.0.0", false, flashvars, flashparams, {});
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
  var components = [{
    key: "userAgent",
    getData: UserAgent
  }, {
    key: "language",
    getData: languageKey
  }, {
    key: "colorDepth",
    getData: colorDepthKey
  }, {
    key: "deviceMemory",
    getData: deviceMemoryKey
  }, {
    key: "pixelRatio",
    getData: pixelRatioKey
  }, {
    key: "hardwareConcurrency",
    getData: hardwareConcurrencyKey
  }, {
    key: "screenResolution",
    getData: screenResolutionKey
  }, {
    key: "availableScreenResolution",
    getData: availableScreenResolutionKey
  }, {
    key: "timezoneOffset",
    getData: timezoneOffset
  }, {
    key: "timezone",
    getData: timezone
  }, {
    key: "sessionStorage",
    getData: sessionStorageKey
  }, {
    key: "localStorage",
    getData: localStorageKey
  }, {
    key: "indexedDb",
    getData: indexedDbKey
  }, {
    key: "addBehavior",
    getData: addBehaviorKey
  }, {
    key: "openDatabase",
    getData: openDatabaseKey
  }, {
    key: "cpuClass",
    getData: cpuClassKey
  }, {
    key: "platform",
    getData: platformKey
  }, {
    key: "doNotTrack",
    getData: doNotTrackKey
  }, {
    key: "plugins",
    getData: pluginsComponent
  }, {
    key: "canvas",
    getData: canvasKey
  }, {
    key: "webgl",
    getData: webglKey
  }, {
    key: "webglVendorAndRenderer",
    getData: webglVendorAndRendererKey
  }, {
    key: "adBlock",
    getData: adBlockKey
  }, {
    key: "hasLiedLanguages",
    getData: hasLiedLanguagesKey
  }, {
    key: "hasLiedResolution",
    getData: hasLiedResolutionKey
  }, {
    key: "hasLiedOs",
    getData: hasLiedOsKey
  }, {
    key: "hasLiedBrowser",
    getData: hasLiedBrowserKey
  }, {
    key: "touchSupport",
    getData: touchSupportKey
  }];
  function Fingerprint2(options) {
    throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200");
  }
  Fingerprint2.get = function (options, callback) {
    if (!callback) {
      callback = options;
      options = {};
    } else if (!options) {
      options = {};
    }
    extendSoft(options, defaultOptions);
    options.components = options.extraComponents.concat(components);
    var keys = {
      data: [],
      addPreprocessedComponent: function (key, value) {
        if (typeof options.preprocessor === "function") {
          value = options.preprocessor(key, value);
        }
        keys.data.push({
          key: key,
          value: value
        });
      }
    };
    var i = -1;
    function chainComponents(alreadyWaited) {
      i += 1;
      if (i >= options.components.length) {
        callback(keys.data);
        return;
      }
      var component = options.components[i];
      if (options.excludes[component.key]) {
        chainComponents(false);
        return;
      }
      if (!alreadyWaited && component.pauseBefore) {
        i -= 1;
        setTimeout(function () {
          chainComponents(true);
        }, 1);
        return;
      }
      try {
        component.getData(function (value) {
          keys.addPreprocessedComponent(component.key, value);
          chainComponents(false);
        }, options);
      } catch (error) {
        keys.addPreprocessedComponent(component.key, String(error));
        chainComponents(false);
      }
    }
    chainComponents(false);
  };
  Fingerprint2.getPromise = function (options) {
    return new Promise(function (resolve, reject) {
      Fingerprint2.get(options, resolve);
    });
  };
  Fingerprint2.getV18 = function (options, callback) {
    if (callback == null) {
      callback = options;
      options = {};
    }
    return Fingerprint2.get(options, function (components) {
      var newComponents = [];
      for (var i = 0; i < components.length; i++) {
        var component = components[i];
        if (component.value === (options.NOT_AVAILABLE || "not available")) {
          newComponents.push({
            key: component.key,
            value: "unknown"
          });
        } else if (component.key === "plugins") {
          newComponents.push({
            key: "plugins",
            value: map(component.value, function (p) {
              var mimeTypes = map(p[2], function (mt) {
                if (mt.join) {
                  return mt.join("~");
                }
                return mt;
              }).join(",");
              return [p[0], p[1], mimeTypes].join("::");
            })
          });
        } else if (["canvas", "webgl"].indexOf(component.key) !== -1) {
          newComponents.push({
            key: component.key,
            value: component.value.join("~")
          });
        } else if (["sessionStorage", "localStorage", "indexedDb", "addBehavior", "openDatabase"].indexOf(component.key) !== -1) {
          if (component.value) {
            newComponents.push({
              key: component.key,
              value: 1
            });
          } else {
            continue;
          }
        } else if (component.value) {
          newComponents.push(component.value.join ? {
            key: component.key,
            value: component.value.join(";")
          } : component);
        } else {
          newComponents.push({
            key: component.key,
            value: component.value
          });
        }
      }
      var murmur = x64hash128(map(newComponents, function (component) {
        return component.value;
      }).join("~~~"), 31);
      callback(murmur, newComponents);
    });
  };
  Fingerprint2.x64hash128 = x64hash128;
  Fingerprint2.VERSION = "2.0.0";
  return Fingerprint2;
});