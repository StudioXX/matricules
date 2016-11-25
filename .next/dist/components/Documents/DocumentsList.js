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

var _link = require('/Users/intern/Desktop/matricules/node_modules/next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _react = require('/Users/intern/Desktop/matricules/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentsList = function (_React$Component) {
  (0, _inherits3.default)(DocumentsList, _React$Component);

  function DocumentsList(props) {
    (0, _classCallCheck3.default)(this, DocumentsList);
    return (0, _possibleConstructorReturn3.default)(this, (DocumentsList.__proto__ || (0, _getPrototypeOf2.default)(DocumentsList)).call(this, props));
  }

  (0, _createClass3.default)(DocumentsList, [{
    key: 'render',
    value: function render() {
      var docs = this.props.doclist;
      return _react2.default.createElement(
        'ul',
        null,
        docs.map(function (doc, i) {
          return _react2.default.createElement(
            'li',
            { key: i },
            _react2.default.createElement(
              _link2.default,
              { href: '/documents/' + doc.accession_number },
              doc.accession_number
            ),
            doc.title
          );
        })
      );
    }
  }]);
  return DocumentsList;
}(_react2.default.Component);

DocumentsList.propTypes = {
  doclist: _react2.default.PropTypes.array
};

exports.default = DocumentsList;