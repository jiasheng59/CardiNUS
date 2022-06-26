import React from "react";
import { setDoneToZero } from "./Game";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { secondsLeft: this.props.secondsLeft };
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
    if (this.state.secondsLeft === 0) {
      this.props.changePhase("Vote For Captain");
      setDoneToZero(this.props.roomId);
      return <div></div>;
    } else {
      return (
        <div>{this.state.secondsLeft} seconds</div>
      );
    }
  }
}

export default Timer;