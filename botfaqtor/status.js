Object.defineProperty(exports, "__esModule", {
  value: true
});
var block_1 = require("./core/block");
function get_status(wnd, bt) {
  var bhd = wnd._ab_data_;
  var uri = "https://" + bhd.inf.adr + ".botfaqtor.ru/b/";
  var _block = new block_1.Block(uri);
  var result = _block.check(bhd.inf.sid, bhd.hah, document.referrer, location.href, bhd.fpr, bhd.uid, bt);
  bhd.sts = result.status;
  bhd.act = result.action;
  bhd.inf.flg = 1;
}
exports.get_status = get_status;