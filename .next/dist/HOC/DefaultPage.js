'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('/Users/intern/Desktop/matricules/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/Users/intern/Desktop/matricules/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _css = require('/Users/intern/Desktop/matricules/node_modules/next/dist/lib/css.js');

var _css2 = _interopRequireDefault(_css);

var _Header = require('../components/Header/Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  app: (0, _css2.default)({
    height: '100vh',
    width: '100vw'
  }),
  main: (0, _css2.default)({
    maxWidth: 1024,
    margin: '0 auto',
    padding: 30
  })
};

exports.default = function (Page) {
  return function (_React$Component) {
    (0, _inherits3.default)(DefaultPage, _React$Component);
    (0, _createClass3.default)(DefaultPage, null, [{
      key: 'getInitialProps',
      value: function getInitialProps(ctx) {
        return {
          currentUrl: ctx.pathname
        };
      }
    }]);

    function DefaultPage(props) {
      (0, _classCallCheck3.default)(this, DefaultPage);

      var _this = (0, _possibleConstructorReturn3.default)(this, (DefaultPage.__proto__ || (0, _getPrototypeOf2.default)(DefaultPage)).call(this, props));

      _this.state = {
        loggedUser: false,
        isAuthenticated: false
      };
      return _this;
    }

    //   componentDidMount () {
    //     const loggedUser = getCookie();
    //     const isAuthenticated = !!loggedUser
    //     this.setState({
    //       loggedUser: loggedUser,
    //       isAuthenticated: isAuthenticated
    //     })
    //   }

    (0, _createClass3.default)(DefaultPage, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: styles.app },
            _react2.default.createElement(
              'div',
              { className: styles.main },
              _react2.default.createElement(_Header2.default, this.props),
              _react2.default.createElement(Page, (0, _extends3.default)({}, this.props, { isAuthenticated: this.state.isAuthenticated, loggedUser: this.state.loggedUser }))
            )
          )
        );
      }
    }]);
    return DefaultPage;
  }(_react2.default.Component);
};