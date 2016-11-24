'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/Users/intern/Desktop/nextnext/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CatchAll = function (_Component) {
  (0, _inherits3.default)(CatchAll, _Component);

  function CatchAll(props) {
    (0, _classCallCheck3.default)(this, CatchAll);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CatchAll.__proto__ || (0, _getPrototypeOf2.default)(CatchAll)).call(this, props));

    var routeParts = _this.props.url.pathname.split('/');
    _this.state = { user_id: parseInt(routeParts[routeParts.length - 1]) };
    return _this;
  }

  (0, _createClass3.default)(CatchAll, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'user id: ',
          this.state.user_id
        )
      );
    }
  }]);
  return CatchAll;
}(_react.Component);

exports.default = CatchAll;