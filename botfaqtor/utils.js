Object.defineProperty(exports, "__esModule", {
  value: true
});
function sum(x, y) {
  return x + y;
}
exports.sum = sum;
function square(x) {
  return x * x;
}
exports.square = square;
function getRandomNumberByRange(start, end) {
  return Math.round(Math.random() * (end - start) + start);
}
exports.getRandomNumberByRange = getRandomNumberByRange;
exports.appendStyle = function (style) {
  var styleEl = document.createElement("style");
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
};