Object.defineProperty(exports, "__esModule", {
  value: true
});
var EverCookieOptions = function () {
  function EverCookieOptions() {
    var host = window.location.host;
    if (host.indexOf("www.") >= 0) {
      host = host.split("www.")[1];
    }
    this.domain = host.replace(/:\d+/, "");
  }
  return EverCookieOptions;
}();
exports.EverCookieOptions = EverCookieOptions;