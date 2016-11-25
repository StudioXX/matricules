'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/intern/Desktop/matricules/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _DefaultPage = require('../HOC/DefaultPage');

var _DefaultPage2 = _interopRequireDefault(_DefaultPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function About() {
  return _react2.default.createElement(
    'div',
    null,
    'about studio xx and matricules'
  );
};

exports.default = (0, _DefaultPage2.default)(About);
    if (module.hot) {
      module.hot.accept()

      var Component = module.exports.default || module.exports
      Component.__route = "/about"

      if (module.hot.status() !== 'idle') {
        var components = next.router.components
        for (var r in components) {
          if (!components.hasOwnProperty(r)) continue

          if (components[r].Component.__route === "/about") {
            next.router.update(r, Component)
          }
        }
      }
    }
  