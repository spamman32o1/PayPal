Object.defineProperty(exports, "__esModule", {
  value: true
});
var Http = function () {
  function Http() {}
  Http.get = function (url) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status >= 200 && this.status < 404) {
          var res = [this.status, this.response];
          resolve(res);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error("XMLHttpRequest Error: " + this.statusText));
      };
      request.open("GET", url, true);
      request.send();
    });
  };
  Http.post = function (url, data) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error("XMLHttpRequest Error: " + this.statusText));
      };
      request.open("POST", url, true);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
    });
  };
  Http.post_status = function (url, data) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status >= 200 && this.status < 303) {
          resolve(this.status);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error("XMLHttpRequest Error: " + this.statusText));
      };
      request.open("POST", url, true);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
    });
  };
  Http.post_status_sync = function (url, data) {
    var xhr = new XMLHttpRequest();
    xhr.onerror = function () {
      console.error("XMLHttpRequest Error: " + this.statusText);
      return new Error("XMLHttpRequest Error: " + this.statusText);
    };
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    var actionValue = xhr.getResponseHeader("Action");
    return {
      status: xhr.status == 302 ? xhr.status : 204,
      action: actionValue
    };
  };
  Http.post_statusData = function (url, data, fl) {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onload = function () {
        if (this.status >= 200 && this.status < 303) {
          var res = [this.status, this.response];
          resolve(res);
        } else {
          reject(new Error(this.statusText));
        }
      };
      request.onerror = function () {
        reject(new Error("(POST_COUNTER)XMLHttpRequest Error: " + this.statusText));
      };
      request.open("POST", url, true);
      if (fl != undefined) {
        request.setRequestHeader("fl", "1");
      }
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(data));
    });
  };
  return Http;
}();
exports.Http = Http;