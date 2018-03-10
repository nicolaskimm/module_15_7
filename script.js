class App extends React.Component {
    constructor() {
        super();
        this.state = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            running: false,
        }
    }

    reset() {
        if (!this.running) {
            this.setState({
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            });
        }
    }

    resetWatch() {
        this.reset();
    }

    format() {
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        let miliseconds = this.state.miliseconds
        let seconds = this.state.seconds
        let minutes = this.state.minutes

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
        })
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {
        return (
            <div>
                <nav className="controls">
                    <button onClick={this.start.bind(this)}>Start</button>
                    <button onClick={this.stop.bind(this)}>Stop</button>
                    <button onClick={this.reset.bind(this)}>Reset Watch</button>
                </nav>
                <p>{this.format()}</p>
            </div>
        );
    }
}

function pad0(value){
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<App />, document.querySelector(".stopwatch"));
