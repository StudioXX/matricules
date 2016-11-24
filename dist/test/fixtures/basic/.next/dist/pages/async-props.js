'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('/Users/intern/Desktop/nextnext/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var AsyncProps = function (_React$Component) {
  (0, _inherits3.default)(AsyncProps, _React$Component);

  function AsyncProps() {
    (0, _classCallCheck3.default)(this, AsyncProps);
    return (0, _possibleConstructorReturn3.default)(this, (AsyncProps.__proto__ || (0, _getPrototypeOf2.default)(AsyncProps)).apply(this, arguments));
  }

  (0, _createClass3.default)(AsyncProps, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'p',
        null,
        this.props.name
      );
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return AsyncProps.fetchData();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps() {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }, {
    key: 'fetchData',
    value: function fetchData() {
      var p = new _promise2.default(function (resolve) {
        setTimeout(function () {
          return resolve({ name: 'Diego Milito' });
        }, 10);
      });
      return p;
    }
  }]);
  return AsyncProps;
}(_react2.default.Component);

exports.default = AsyncProps;