'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/intern/Desktop/nextnext/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _head = require('/Users/intern/Desktop/nextnext/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _head2.default,
      null,
      _react2.default.createElement('meta', { content: 'my meta' })
    ),
    _react2.default.createElement(
      'h1',
      null,
      'I can haz meta tags'
    )
  );
};