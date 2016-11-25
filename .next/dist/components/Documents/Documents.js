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
      keyword: 'all',
      doclist: []
    };
    _this.handleYearChange = _this.handleYearChange.bind(_this);
    _this.handleKeywordChange = _this.handleKeywordChange.bind(_this);
    _this.updateFilter = _this.updateFilter.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Documents, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // set mounted property so we only set state if component is mounted
      this.mounted = true;
      this.updateFilter();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter() {
      var _this2 = this;

      var queries = '';
      queries += 'year=' + this.state.year;
      queries += '&keyword=' + this.state.keyword;
      fetch('http://localhost:4000/api/documents?' + queries, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        // only set state if component is mounted
        if (_this2.mounted === true) {
          _this2.setState({ doclist: json });
        }
      });
    }

    // these two functions require callbacks since setState is  asynchronous

  }, {
    key: 'handleYearChange',
    value: function handleYearChange(yr) {
      var _this3 = this;

      var year = yr.toString();
      this.setState({
        year: year
      }, function () {
        return _this3.updateFilter();
      });
    }
  }, {
    key: 'handleKeywordChange',
    value: function handleKeywordChange(kw) {
      var _this4 = this;

      this.setState({
        keyword: kw
      }, function () {
        return _this4.updateFilter();
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
        _react2.default.createElement(_DocumentsList2.default, { doclist: this.state.doclist })
      );
    }
  }]);
  return Documents;
}(_react2.default.Component);

exports.default = Documents;