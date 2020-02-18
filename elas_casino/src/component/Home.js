import React from "react";
import "./Home.css";
import Rules from "./Rules";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesMount: false
    };
  }

  toggleRulesMount() {
    this.setState({
      rulesMount: !this.state.rulesMount
    });
  }
  componentDidUpdate(prevState) {}
  render() {
    return (
      <main className="myContainer">
        <h1>Ela’s casino</h1>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </article>
        <button className="pointer">PLAY</button>
        <button className="pointer" onClick={this.toggleRulesMount.bind(this)}>
          RULES
        </button>
        {this.state.RulesMount ? (
          <Rules closeRulesMount={this.toggleRulesMount.bind(this)} />
        ) : null}
      </main>
    );
  }
}
export default Home;
