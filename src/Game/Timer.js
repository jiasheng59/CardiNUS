import React from "react";

class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {secondsLeft: this.props.secondsLeft};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    componentDidUpdate() {
      if (this.state.secondsLeft === 0) {
        clearInterval(this.timerID);
      }
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState(prevState => ({
          secondsLeft: prevState.secondsLeft - 1
      }));
    }
  
    render() {
      return (
          <div>You have {this.state.secondsLeft} seconds left.</div>
      );
    }
}

export default Timer;