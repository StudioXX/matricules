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

var Statefull = function (_Component) {
  (0, _inherits3.default)(Statefull, _Component);

  function Statefull(props) {
    (0, _classCallCheck3.default)(this, Statefull);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Statefull.__proto__ || (0, _getPrototypeOf2.default)(Statefull)).call(this, props));

    _this.state = { answer: null };
    return _this;
  }

  (0, _createClass3.default)(Statefull, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ answer: 42 });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'p',
          null,
          'The answer is ',
          this.state.answer
        )
      );
    }
  }]);
  return Statefull;
}(_react.Component);

exports.default = Statefull;