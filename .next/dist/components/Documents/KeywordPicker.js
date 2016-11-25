'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/Users/intern/Desktop/matricules/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeywordPicker = function (_React$Component) {
  (0, _inherits3.default)(KeywordPicker, _React$Component);

  function KeywordPicker(props) {
    (0, _classCallCheck3.default)(this, KeywordPicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (KeywordPicker.__proto__ || (0, _getPrototypeOf2.default)(KeywordPicker)).call(this, props));

    _this.state = {
      value: ''
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(KeywordPicker, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      this.props.handleKeywordChange(this.state.value);
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        'keyword:',
        _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange }),
        _react2.default.createElement('input', { type: 'submit', value: 'Submit' })
      );
    }
  }]);
  return KeywordPicker;
}(_react2.default.Component);

KeywordPicker.propTypes = {
  handleKeywordChange: _react2.default.PropTypes.func
};

exports.default = KeywordPicker;