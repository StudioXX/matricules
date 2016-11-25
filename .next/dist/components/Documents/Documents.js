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

var _DocumentsList = require('./DocumentsList');

var _DocumentsList2 = _interopRequireDefault(_DocumentsList);

var _YearPicker = require('./YearPicker');

var _YearPicker2 = _interopRequireDefault(_YearPicker);

var _KeywordPicker = require('./KeywordPicker');

var _KeywordPicker2 = _interopRequireDefault(_KeywordPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Documents = function (_React$Component) {
  (0, _inherits3.default)(Documents, _React$Component);

  function Documents(props) {
    (0, _classCallCheck3.default)(this, Documents);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Documents.__proto__ || (0, _getPrototypeOf2.default)(Documents)).call(this, props));

    _this.state = {
      year: 'all',
      keyword: 'all'
    };
    _this.handleYearChange = _this.handleYearChange.bind(_this);
    _this.handleKeywordChange = _this.handleKeywordChange.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Documents, [{
    key: 'handleYearChange',
    value: function handleYearChange(yr) {
      var year = yr.toString();
      this.setState({
        year: year
      });
    }
  }, {
    key: 'handleKeywordChange',
    value: function handleKeywordChange(kw) {
      this.setState({
        keyword: kw
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_KeywordPicker2.default, { handleKeywordChange: this.handleKeywordChange }),
        _react2.default.createElement(_YearPicker2.default, { handleYearChange: this.handleYearChange }),
        _react2.default.createElement(_DocumentsList2.default, { year: this.state.year, keyword: this.state.keyword })
      );
    }
  }]);
  return Documents;
}(_react2.default.Component);

exports.default = Documents;