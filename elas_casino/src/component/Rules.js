import React from "react";
import "./Rules.css";
class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesMount: true
    };
  }
  toggleRulesMount() {
    this.setState({
      rulesMount: false
    });
  }
  render() {
    return (
      <section
        className={this.props.rulesMount ? "rules_section" : "display_none"}
      >
        <div className="rules_div">
          <h1>Rules</h1>
          <article>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
            ipsum dolor sit amet, consectetur adipiscing elit.
          </article>
          <button className="pointer" onClick={this.props.action}>
            CLOSE
          </button>
        </div>
      </section>
    );
  }
}

export default Rules;
