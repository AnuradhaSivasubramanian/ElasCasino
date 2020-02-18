import React from "react";
import "./Home.css";
import Rules from "./Rules";
import GameTable from "./GameTable";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesMount: false,
      playMount: false
    };

    this.toggleRulesMount = this.toggleRulesMount.bind(this);
    this.togglePlayMount = this.togglePlayMount.bind(this);
  }

  toggleRulesMount() {
    this.setState({
      rulesMount: !this.state.rulesMount
    });
  }
  togglePlayMount() {
    this.setState({
      playMount: !this.state.playMount
    });
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

        <button className="pointer" onClick={this.togglePlayMount}>
          PLAY
        </button>
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
        <div>
          {!this.state.playMount ? null : (
            <GameTable
              action={this.togglePlayMount}
              playMount={this.state.playMount}
            />
          )}
        </div>
      </main>
    );
  }
}
export default Home;
