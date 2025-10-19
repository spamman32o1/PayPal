Object.defineProperty(exports, "__esModule", {
  value: true
});
var styles_1 = require("./styles");
var utils_1 = require("./utils");
var w = 310;
var h = 155;
var l = 42;
var r = 9;
var PI = Math.PI;
var L = l + r * 2 + 3;
function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
function addClass(element, className) {
  element.classList.add(className);
}
function setClass(element, className) {
  element.className = className;
}
function removeClass(element, className) {
  element.classList.remove(className);
}
function createElement(tagName, className) {
  var element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  return element;
}
function drawPath(ctx, x, y, operation) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.arc(x + l / 2, y - r + 2, r, PI * 0.72, PI * 2.26);
  ctx.lineTo(x + l, y);
  ctx.arc(x + l + r - 2, y + l / 2, r, PI * 1.21, PI * 2.78);
  ctx.lineTo(x + l, y + l);
  ctx.lineTo(x, y + l);
  ctx.arc(x + r - 2, y + l / 2, r + 0.4, PI * 2.76, PI * 1.24, true);
  ctx.lineTo(x, y);
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.stroke();
  ctx.globalCompositeOperation = "destination-over";
  if (operation === "fill") {
    ctx.fill();
  } else {
    ctx.clip();
  }
}
var Captcha = function () {
  function Captcha(options) {
    var el = options.el;
    var _a = options.width;
    var width = _a === undefined ? w : _a;
    var _b = options.height;
    var height = _b === undefined ? h : _b;
    var imgSrc = options.imgSrc;
    var onSuccess = options.onSuccess;
    var onFail = options.onFail;
    var onRefresh = options.onRefresh;
    Object.assign(el.style, {
      position: "relative",
      width: width + "px"
    });
    this.width = width;
    this.height = height;
    this.el = el;
    if (imgSrc) {
      this.imgSrc = imgSrc;
    }
    if (onSuccess) {
      this.onSuccess = onSuccess;
    }
    if (onFail) {
      this.onFail = onFail;
    }
    if (onRefresh) {
      this.onRefresh = onRefresh;
    }
  }
  Captcha.prototype.init = function () {
    this.initDOM();
    this.initStyle();
    this.initImg();
    this.bindEvents();
  };
  Captcha.prototype.initDOM = function () {
    var _a = this;
    var width = _a.width;
    var height = _a.height;
    var canvas = createCanvas(width, height);
    var block = createCanvas(width, height);
    setClass(block, "blockSlidrBf1379");
    var sliderContainer = createElement("div", "sliderContainerBf1123");
    sliderContainer.style.width = width + "px";
    sliderContainer.style.pointerEvents = "none";
    var refreshIcon = createElement("div", "refreshIconBf8421");
    var sliderMask = createElement("div", "sliderMaskBf1932");
    sliderMask.style.borderRadius = "20px 0 0 20px";
    var slider = createElement("div", "sliderBf8321");
    var sliderIcon = createElement("span", "sliderIconBf7382");
    var text = createElement("span", "sliderTextBf2892");
    canvas.style.borderRadius = "10px";
    text.innerHTML = "Проведите вправо";
    var loadingContainer = createElement("div", "loadingContainerBf8231");
    loadingContainer.style.width = width + "px";
    loadingContainer.style.height = height + "px";
    var loadingIcon = createElement("div", "loadingIconBf8371");
    var loadingText = createElement("span");
    loadingText.innerHTML = "Загрузка...";
    loadingContainer.appendChild(loadingIcon);
    loadingContainer.appendChild(loadingText);
    var el = this.el;
    el.appendChild(loadingContainer);
    el.appendChild(canvas);
    el.appendChild(refreshIcon);
    el.appendChild(block);
    slider.appendChild(sliderIcon);
    sliderMask.appendChild(slider);
    sliderContainer.appendChild(sliderMask);
    sliderContainer.appendChild(text);
    el.appendChild(sliderContainer);
    Object.assign(this, {
      canvas: canvas,
      block: block,
      sliderContainer: sliderContainer,
      loadingContainer: loadingContainer,
      refreshIcon: refreshIcon,
      slider: slider,
      sliderMask: sliderMask,
      sliderIcon: sliderIcon,
      text: text,
      canvasCtx: canvas.getContext("2d"),
      blockCtx: block.getContext("2d")
    });
  };
  Captcha.prototype.initStyle = function () {
    utils_1.appendStyle(styles_1.cssStr);
  };
  Captcha.prototype.initImg = function () {
    var _this = this;
    var img = this.createImg(function () {
      _this.setLoading(false);
      _this.draw(img);
    }, this.imgSrc);
    this.img = img;
  };
  Captcha.prototype.getRandomImgSrc = function (imgSrc = "") {
    if (imgSrc) {
      return this.imgSrc;
    }
    var rnd = utils_1.getRandomNumberByRange(1, 29);
    return "//verify.botfaqtor.ru/" + rnd;
  };
  Captcha.prototype.createImg = function (onload, localSrc) {
    var _this = this;
    if (localSrc === undefined) {
      localSrc = "";
    }
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = onload;
    img.src = this.getRandomImgSrc(localSrc);
    img.onerror = function () {
      img.src = _this.getRandomImgSrc(localSrc);
    };
    return img;
  };
  Captcha.prototype.setLoading = function (isLoading) {
    this.loadingContainer.style.display = isLoading ? "" : "none";
    this.sliderContainer.style.pointerEvents = isLoading ? "none" : "";
  };
  Captcha.prototype.draw = function (img) {
    var _a = this;
    var width = _a.width;
    var height = _a.height;
    this.x = utils_1.getRandomNumberByRange(L + 10, width - (L + 10));
    this.y = utils_1.getRandomNumberByRange(10 + r * 2, height - (L + 10));
    drawPath(this.canvasCtx, this.x, this.y, "fill");
    drawPath(this.blockCtx, this.x, this.y, "clip");
    this.canvasCtx.drawImage(img, 0, 0, width, height);
    this.blockCtx.drawImage(img, 0, 0, width, height);
    var y = this.y - r * 2 - 1;
    var ImageData = this.blockCtx.getImageData(this.x - 3, y, L, L);
    this.block.width = L;
    this.blockCtx.putImageData(ImageData, 0, y);
  };
  Captcha.prototype.bindEvents = function () {
    var _this = this;
    this.el.onselectstart = function () {
      return false;
    };
    this.refreshIcon.onclick = function () {
      _this.reset();
      if (typeof _this.onRefresh === "function") {
        _this.onRefresh();
      }
    };
    var originX;
    var originY;
    var isMouseDown = false;
    var trail = [];
    function handleDragStart(e) {
      if (e instanceof MouseEvent) {
        originX = e.clientX;
        originY = e.clientY;
      } else if (e instanceof TouchEvent) {
        originX = e.touches[0].clientX;
        originY = e.touches[0].clientY;
      } else {
        originX = 0;
        originY = 0;
      }
      isMouseDown = true;
    }
    var width = this.width;
    function handleDragMove(e) {
      if (!isMouseDown) {
        return false;
      }
      e.preventDefault();
      var eventX;
      var eventY;
      if (e instanceof MouseEvent) {
        eventX = e.clientX;
        eventY = e.clientY;
      } else if (e instanceof TouchEvent) {
        eventX = e.touches[0].clientX;
        eventY = e.touches[0].clientY;
      } else {
        eventX = 0;
        eventY = 0;
      }
      var moveX = eventX - originX;
      var moveY = eventY - originY;
      if (moveX < 0 || moveX + 38 >= width) {
        return false;
      }
      _this.slider.style.left = moveX + "px";
      var blockLeft = (width - 40 - 20) / (width - 40) * moveX;
      _this.block.style.left = blockLeft + "px";
      addClass(_this.sliderContainer, "sliderContainerBf1123_active");
      _this.sliderMask.style.width = moveX + "px";
      trail.push(moveY);
    }
    function handleDragEnd(e) {
      if (!isMouseDown) {
        return false;
      }
      isMouseDown = false;
      var eventX = e instanceof MouseEvent && e.clientX || e instanceof TouchEvent && e.changedTouches[0].clientX;
      if (eventX === originX) {
        return false;
      }
      removeClass(_this.sliderContainer, "sliderContainerBf1123_active");
      _this.trail = trail;
      var _a = _this.verify();
      var spliced = _a.spliced;
      var verified = _a.verified;
      if (spliced) {
        if (verified) {
          addClass(_this.sliderContainer, "sliderContainerBf1123_success");
          if (typeof _this.onSuccess === "function") {
            _this.onSuccess();
          }
        } else {
          addClass(_this.sliderContainer, "sliderContainerBf1123_fail");
          _this.text.innerHTML = "t";
          _this.reset();
        }
      } else {
        addClass(_this.sliderContainer, "sliderContainerBf1123_fail");
        if (typeof _this.onFail === "function") {
          _this.onFail();
        }
        setTimeout(function () {
          _this.reset();
        }, 1000);
      }
    }
    this.slider.addEventListener("mousedown", handleDragStart);
    this.slider.addEventListener("touchstart", handleDragStart);
    this.block.addEventListener("mousedown", handleDragStart);
    this.block.addEventListener("touchstart", handleDragStart);
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);
  };
  Captcha.prototype.verify = function () {
    var arr = this.trail;
    if (arr) {
      var average_1 = arr.reduce(utils_1.sum) / arr.length;
      var deviations = arr.map(function (x) {
        return x - average_1;
      });
      var stddev = Math.sqrt(deviations.map(utils_1.square).reduce(utils_1.sum) / arr.length);
      var left = parseInt(this.block.style.left);
      return {
        spliced: Math.abs(left - this.x) < 10,
        verified: stddev !== 0
      };
    } else {
      console.log("Конфликт с установленным плагином браузера");
    }
  };
  Captcha.prototype.reset = function () {
    var _this = this;
    var _a = this;
    var width = _a.width;
    var height = _a.height;
    setClass(this.sliderContainer, "sliderContainerBf1123");
    this.slider.style.transition = "left 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    this.block.style.transition = "left 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    this.sliderMask.style.transition = "width 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
    this.sliderMask.style.borderRadius = "20px 0 0 20px";
    this.slider.style.left = "3px";
    this.block.width = width;
    this.block.style.left = "0px";
    this.sliderMask.style.width = "0px";
    setTimeout(function () {
      _this.slider.style.transition = "";
      _this.block.style.transition = "";
      _this.sliderMask.style.transition = "";
      _this.sliderMask.style.borderRadius = "20px 0 0 20px";
      _this.canvasCtx.clearRect(0, 0, width, height);
      _this.blockCtx.clearRect(0, 0, width, height);
      _this.setLoading(true);
      _this.img.src = _this.getRandomImgSrc(_this.imgSrc);
    }, 800);
  };
  return Captcha;
}();
function captcha(opts) {
  var pt = opts;
  var cpt = new Captcha(pt);
  return cpt;
}
exports.captcha = captcha;