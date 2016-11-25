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

var YearPicker = function (_React$Component) {
  (0, _inherits3.default)(YearPicker, _React$Component);

  function YearPicker(props) {
    (0, _classCallCheck3.default)(this, YearPicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (YearPicker.__proto__ || (0, _getPrototypeOf2.default)(YearPicker)).call(this, props));

    _this.state = {
      years: []
    };
    return _this;
  }

  (0, _createClass3.default)(YearPicker, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var currentyear = new Date().getFullYear();
      var yeararray = [];
      for (var i = 1995; i <= currentyear; i += 1) {
        yeararray.push(i);
      }
      yeararray.push('all');
      this.setState({ years: yeararray });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var years = this.state.years;
      return _react2.default.createElement(
        'div',
        null,
        years.map(function (year) {
          return _react2.default.createElement(
            'span',
            { onClick: function onClick() {
                return _this2.props.handleYearChange(year);
              }, style: { padding: '5px 5px 5px 5px' }, key: year },
            year
          );
        })
      );
    }
  }]);
  return YearPicker;
}(_react2.default.Component);

YearPicker.propTypes = {
  handleYearChange: _react2.default.PropTypes.func
};

exports.default = YearPicker;