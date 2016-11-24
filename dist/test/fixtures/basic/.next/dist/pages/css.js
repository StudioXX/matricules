'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/intern/Desktop/nextnext/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _css = require('/Users/intern/Desktop/nextnext/dist/lib/css.js');

var _css2 = _interopRequireDefault(_css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: styles },
    'This is red'
  );
};

var styles = (0, _css2.default)({ color: 'red' });