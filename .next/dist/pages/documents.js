'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('/Users/intern/Desktop/matricules/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _DefaultPage = require('../HOC/DefaultPage');

var _DefaultPage2 = _interopRequireDefault(_DefaultPage);

var _Documents = require('../components/Documents/Documents');

var _Documents2 = _interopRequireDefault(_Documents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _DefaultPage2.default)(_Documents2.default);
    if (module.hot) {
      module.hot.accept()

      var Component = module.exports.default || module.exports
      Component.__route = "/documents"

      if (module.hot.status() !== 'idle') {
        var components = next.router.components
        for (var r in components) {
          if (!components.hasOwnProperty(r)) continue

          if (components[r].Component.__route === "/documents") {
            next.router.update(r, Component)
          }
        }
      }
    }
  