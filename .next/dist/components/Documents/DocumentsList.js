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

var DocumentsList = function (_React$Component) {
  (0, _inherits3.default)(DocumentsList, _React$Component);

  function DocumentsList(props) {
    (0, _classCallCheck3.default)(this, DocumentsList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DocumentsList.__proto__ || (0, _getPrototypeOf2.default)(DocumentsList)).call(this, props));

    _this.state = {
      doclist: []
    };
    _this.updateFilter = _this.updateFilter.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(DocumentsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // set mounted property so we only set state if component is mounted
      this.mounted = true;
      this.updateFilter();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.year !== this.props.year || prevProps.keyword !== this.props.keyword) {
        this.updateFilter();
      }
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
      queries += 'year=' + this.props.year;
      queries += '&keyword=' + this.props.keyword;
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
  }, {
    key: 'render',
    value: function render() {
      var docs = this.state.doclist;
      return _react2.default.createElement(
        'ul',
        null,
        docs.map(function (doc, i) {
          return _react2.default.createElement(
            'li',
            { key: i },
            doc.accession_number,
            ' ',
            doc.title
          );
        })
      );
    }
  }]);
  return DocumentsList;
}(_react2.default.Component);

DocumentsList.propTypes = {
  keyword: _react2.default.PropTypes.string,
  year: _react2.default.PropTypes.string
};

exports.default = DocumentsList;