Object.defineProperty(exports, "__esModule", {
  value: true
});
var http_1 = require("./http");
var Block = function () {
  function Block(uri) {
    this._uri = uri;
  }
  Block.prototype.check = function (s, i, r, u, f, uid, bt) {
    var elements = {
      s: s,
      i: i,
      r: r,
      u: u,
      f: f,
      uid: uid,
      bt: bt
    };
    var result = http_1.Http.post_status_sync(this._uri, elements);
    return {
      status: result.status,
      action: result.action
    };
  };
  return Block;
}();
exports.Block = Block;