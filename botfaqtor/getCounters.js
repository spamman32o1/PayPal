Object.defineProperty(exports, "__esModule", {
  value: true
});
function getCounters(wnd, siteData) {
  var bhd = wnd._ab_data_;
  var _cl_ = siteData.extended;
  if (_cl_) {
    bhd.yan.yid = _cl_.y_id;
    bhd.goo.gid = _cl_.g_id;
    var dimId = _cl_.bot_id;
    if (dimId != null && dimId != undefined) {
      if (dimId.indexOf(":") > -1) {
        bhd.goo.bid = dimId.split(":")[1];
      }
    }
    var untargId = _cl_.low_id;
    if (untargId != null && untargId != undefined) {
      if (untargId.indexOf(":") > -1) {
        bhd.goo.lid = untargId.split(":")[1];
      }
    }
  }
}
exports.getCounters = getCounters;