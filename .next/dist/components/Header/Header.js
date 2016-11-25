'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/intern/Desktop/matricules/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _css = require('/Users/intern/Desktop/matricules/node_modules/next/dist/lib/css.js');

var _css2 = _interopRequireDefault(_css);

var _link = require('/Users/intern/Desktop/matricules/node_modules/next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  menu: (0, _css2.default)({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '50px'
  }),
  menuitem: (0, _css2.default)({
    padding: '5px 25px 5px 5px'
  })
};

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: styles.menu },
    _react2.default.createElement(
      'span',
      { className: styles.menuitem },
      _react2.default.createElement(
        _link2.default,
        { href: '/' },
        'studio xx matricules app'
      )
    ),
    _react2.default.createElement(
      'span',
      { className: styles.menuitem },
      _react2.default.createElement(
        _link2.default,
        { href: '/documents' },
        'documents list'
      )
    ),
    _react2.default.createElement(
      'span',
      { className: styles.menuitem },
      _react2.default.createElement(
        _link2.default,
        { href: '/about' },
        'about'
      )
    )
  );
};