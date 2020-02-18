import React from "react";
import "./Home.css";
import Rules from "./Rules";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesMount: false
    };

    this.toggleRulesMount = this.toggleRulesMount.bind(this);
  }
  componentDidUpdate(prevState) {
    if (prevState.rulesMount !== this.state.rulesMount) {
      console.log("i am here");
    }
  }
  toggleRulesMount() {
    this.setState({
      rulesMount: !this.state.rulesMount
    });
  }

  saySomething() {
    console.log("access approved");
  }
  render() {
    return (
      <main className="home_container">
        <h1>Ela’s casino</h1>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </article>

        <button className="pointer">PLAY</button>
        <button className="pointer" onClick={this.toggleRulesMount}>
          RULES
        </button>
        <div>
          {!this.state.rulesMount ? null : (
            <Rules
              action={this.toggleRulesMount}
              rulesMount={this.state.rulesMount}
            />
          )}
        </div>
      </main>
    );
  }
}
export default Home;

