Object.defineProperty(exports, "__esModule", {
  value: true
});
function wait_loadIframe(wnd, categories, srv) {
  var bhd = wnd._ab_data_;
  if (bhd.yan.snt && bhd.sts == 302 || bhd.inf.che == false) {
    if (srv == 1) {
      var _ab_ = document.createElement("iframe");
      _ab_.id = "ab";
      _ab_.style.cssText = "position:absolute; left:-9999px; top:-9999px;";
      if (bhd.goo.goo == true) {
        _ab_.src = "https://checks.botfaqtor.ru/?g=1";
      } else {
        _ab_.src = "https://checks.botfaqtor.ru/";
      }
      if (window.document.body) {
        window.document.body.appendChild(_ab_);
        return;
      }
    }
  } else if (bhd.sts == 200) {
    if (srv == 1) {
      var _ab_ = document.createElement("iframe");
      _ab_.id = "ab";
      _ab_.style.cssText = "position:absolute; left:-9999px; top:-9999px;";
      if (categories != null && categories != "") {
        if (bhd.goo.goo == true) {
          _ab_.src = "https://checks.botfaqtor.ru/?g=1&c=" + categories;
        } else {
          _ab_.src = "https://checks.botfaqtor.ru/&c=" + categories;
        }
      } else if (bhd.goo.goo == true) {
        _ab_.src = "https://checks.botfaqtor.ru/?g=1";
      } else {
        _ab_.src = "https://checks.botfaqtor.ru/";
      }
      if (window.document.body) {
        window.document.body.appendChild(_ab_);
        return;
      }
    }
  }
  setTimeout(function () {
    wait_loadIframe(wnd, categories, srv);
  }, 500);
}
function nowait_loadIframe(wnd, categories, srv) {
  var bhd = wnd._ab_data_;
  if (srv == 1) {
    var _ab_ = document.createElement("iframe");
    _ab_.id = "ab";
    _ab_.style.cssText = "position:absolute; left:-9999px; top:-9999px;";
    if (categories != null && categories != "") {
      if (bhd.goo.goo == true) {
        _ab_.src = "https://checks.botfaqtor.ru/?g=1&c=" + categories;
      } else {
        _ab_.src = "https://checks.botfaqtor.ru/&c=" + categories;
      }
    } else if (bhd.goo.goo == true) {
      _ab_.src = "https://checks.botfaqtor.ru/?g=1";
    } else {
      _ab_.src = "https://checks.botfaqtor.ru/";
    }
    if (window.document.body) {
      window.document.body.appendChild(_ab_);
      return;
    }
  }
  setTimeout(function () {
    nowait_loadIframe(wnd, categories, srv);
  }, 500);
}
function loadIframe(wnd, srv, categories) {
  if (wnd._ab_data_.inf.gid != 12507 && wnd._ab_data_.inf.gid != 12204 && wnd._ab_data_.inf.gid != 12227 && wnd._ab_data_.inf.gid != 40338 && wnd._ab_data_.inf.gid != 54254 && wnd._ab_data_.inf.gid != 128231 && wnd._ab_data_.inf.gid != 128636 && wnd._ab_data_.inf.gid != 128640 && wnd._ab_data_.inf.gid != 128657 && wnd._ab_data_.inf.gid != 128634 && wnd._ab_data_.inf.gid != 128656 && wnd._ab_data_.inf.gid != 128637 && wnd._ab_data_.inf.gid != 131120 && wnd._ab_data_.inf.gid != 35045) {
    if (wnd._ab_data_.yan.yan == true) {
      wait_loadIframe(wnd, categories, srv);
    } else {
      nowait_loadIframe(wnd, categories, srv);
    }
  }
}
exports.loadIframe = loadIframe;