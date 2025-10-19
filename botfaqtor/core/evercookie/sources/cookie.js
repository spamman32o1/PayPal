Object.defineProperty(exports, "__esModule", {
  value: true
});
var Cookie = function () {
  function Cookie(options) {
    this._options = options;
  }
  Cookie.prototype.set = function (key, value) {
    this.cookie(key, value);
  };
  Cookie.prototype.get = function (key) {
    return Promise.resolve(this.cookie(key));
  };
  Cookie.prototype.delete = function (key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };
  Cookie.prototype.cookie = function (key, value = undefined) {
    if (value !== undefined) {
      document.cookie = key + "=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/; domain=" + this._options.domain;
      document.cookie = key + "=" + value + "; expires=Tue, 31 Dec 2099 00:00:00 UTC; path=/; domain=" + this._options.domain;
      return value;
    } else {
      return this.getFromStr(key, document.cookie);
    }
  };
  Cookie.prototype.getFromStr = function (name, text) {
    if (typeof text !== "string") {
      return;
    }
    var nameEQ = name + "=";
    var ca = text.split(/[;&]/);
    var i;
    var c;
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  };
  return Cookie;
}();
exports.Cookie = Cookie;