import React from "react";
import "./Rules.css";
class Rules extends React.Component {
  render() {
    return (
      <section className="myContainer">
        <h1>Rules</h1>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </article>
        <button className="pointer" className={this.props.closeRulesMount}>
          CLOSE
        </button>
      </section>
    );
  }
}

export default Rules;
