class App extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,   
            minutes: 0,
            seconds: 0,
            miliseconds: 0
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

        startButton.style.display = 'block';
    }

    format() {
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }

        startButton.style.display = 'none';
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
        return {
            <div>
                <button onClick={this.start}>Start</button>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.reset}>Reset Watch</button>
            </div>
            <p>{this.format()}</p>
        }
    }
}

function pad0(value){
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<App />, document.getElementById(".stopwatch"));
