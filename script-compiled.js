'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            running: false
        };
        return _this;
    }

    _createClass(App, [{
        key: 'reset',
        value: function reset() {
            if (!this.running) {
                this.setState({
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                });
            }
        }
    }, {
        key: 'resetWatch',
        value: function resetWatch() {
            this.reset();

            startButton.style.display = 'block';
        }
    }, {
        key: 'format',
        value: function format() {
            return pad0(this.state.minutes) + ':' + pad0(this.state.seconds) + ':' + pad0(Math.floor(this.state.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }

            startButton.style.display = 'none';
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var miliseconds = this.state.miliseconds;
            var seconds = this.state.seconds;
            var minutes = this.state.minutes;

            miliseconds += 1;
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            }
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            }

            this.setState({
                miliseconds: miliseconds,
                seconds: seconds,
                minutes: minutes
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false;
            clearInterval(this.watch);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'button',
                        { onClick: this.start() },
                        'Start'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.stop() },
                        'Stop'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.reset() },
                        'Reset Watch'
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    this.format()
                )
            );
        }
    }]);

    return App;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(App, null), document.getElementById(".stopwatch"));
