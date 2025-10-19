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
Object.defineProperty(exports, "__esModule", {
  value: true
});
var events_1 = require("events");
var PageEvents;
(function (PageEvents) {
  PageEvents[PageEvents.Unknown = 0] = "Unknown";
  PageEvents[PageEvents.NotBounce = 1] = "NotBounce";
  PageEvents[PageEvents.Unload = 2] = "Unload";
  PageEvents[PageEvents.MouseClick = 13] = "MouseClick";
  PageEvents[PageEvents.TrapClick = 30] = "TrapClick";
  PageEvents[PageEvents.StraightMove = 40] = "StraightMove";
  PageEvents[PageEvents.ZeroMove = 50] = "ZeroMove";
  PageEvents[PageEvents.LiedEventsCursorOnMobile = 60] = "LiedEventsCursorOnMobile";
  PageEvents[PageEvents.External = 100] = "External";
  PageEvents[PageEvents.Download = 101] = "Download";
  PageEvents[PageEvents.Fragment = 102] = "Fragment";
  PageEvents[PageEvents.yParamIsBot = 901] = "yParamIsBot";
  PageEvents[PageEvents.yParamIsSuspect = 902] = "yParamIsSuspect";
  PageEvents[PageEvents.yParamIsHuman = 903] = "yParamIsHuman";
  PageEvents[PageEvents.yParamIsGarbage = 904] = "yParamIsGarbage";
  PageEvents[PageEvents.gParamIsBot = 905] = "gParamIsBot";
  PageEvents[PageEvents.gParamIsSuspect = 906] = "gParamIsSuspect";
  PageEvents[PageEvents.gParamIsHuman = 907] = "gParamIsHuman";
  PageEvents[PageEvents.gParamIsGarbage = 908] = "gParamIsGarbage";
})(PageEvents = exports.PageEvents ||= {});
var PageEventBase = function () {
  function PageEventBase() {}
  return PageEventBase;
}();
exports.PageEventBase = PageEventBase;
var PageEvent = function (_super) {
  __extends(PageEvent, _super);
  function PageEvent() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return PageEvent;
}(PageEventBase);
exports.PageEvent = PageEvent;
var PageEventItem = function (_super) {
  __extends(PageEventItem, _super);
  function PageEventItem() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  return PageEventItem;
}(PageEventBase);
exports.PageEventItem = PageEventItem;
var PageEventsCollection = function () {
  function PageEventsCollection() {
    this.items = {};
  }
  return PageEventsCollection;
}();
exports.PageEventsCollection = PageEventsCollection;
var Events = function (_super) {
  __extends(Events, _super);
  function Events() {
    var _this = _super.call(this) || this;
    var wnd = window;
    if (wnd.addEventListener) {
      addEventListener("click", _this.onClick.bind(_this));
    } else if (wnd.attachEvent) {
      wnd.attachEvent("onclick", _this.onClick.bind(_this));
    }
    setTimeout(_this.notBounce.bind(_this), 15000);
    return _this;
  }
  Events.prototype.send = function (ev) {
    var pe = new PageEventItem();
    pe.eventType = ev;
    pe.which = ev.which;
    _super.prototype.emit.call(this, "evt", pe);
  };
  Events.prototype.notBounce = function () {
    var pe = new PageEventItem();
    pe.eventType = PageEvents.NotBounce;
    _super.prototype.emit.call(this, "evt", pe);
  };
  Events.prototype.onClick = function (e) {
    var pe = new PageEventItem();
    pe.eventType = PageEvents.MouseClick;
    pe.x = e.pageX;
    pe.y = e.pageY;
    pe.which = e.which;
    _super.prototype.emit.call(this, "evt", pe);
  };
  Events.prototype.on2 = function (ev, callback) {
    _super.prototype.on.call(this, ev, callback);
  };
  return Events;
}(events_1.EventEmitter);
exports.Events = Events;