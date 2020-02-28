import React from "react";
import "./Home.css";
import Rules from "./Rules";
import GameTable from "./GameTable";
import Settings from "./Settings";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesMount: false,
      playMount: false,
      settingsMount: false,
      isFullDeck: false,
      isLevelHard: true
    };

    this.toggleRulesMount = this.toggleRulesMount.bind(this);
    this.togglePlayMount = this.togglePlayMount.bind(this);
    this.toggleSettingsMount = this.toggleSettingsMount.bind(this);
    this.toggleDeckSize = this.toggleDeckSize.bind(this);
    this.toggleLevel = this.toggleLevel.bind(this);
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

  toggleSettingsMount() {
    this.setState({
      settingsMount: !this.state.settingsMount
    });
  }
  toggleDeckSize() {
    this.setState({
      isFullDeck: !this.state.isFullDeck
    });
  }
  toggleLevel() {
    this.setState({
      isLevelHard: !this.state.isLevelHard
    });
  }

  render() {
    return (
      <main className="home_container">
        <h1 className="home_container_h1">Ela’s casino</h1>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </article>
        <div className="buttons_container">
          <button
            className="pointer home_container_button"
            onClick={this.toggleSettingsMount}
          >
            SETTINGS
          </button>
          <button
            className="pointer home_container_button"
            onClick={this.toggleRulesMount}
          >
            RULES
          </button>
          <button
            className="pointer home_container_button"
            onClick={this.togglePlayMount}
          >
            PLAY
          </button>
        </div>

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
              // action={this.togglePlayMount}
              playMount={this.state.playMount}
              selectLevel={this.state.isLevelHard}
              selectDeck={this.state.isFullDeck}
            />
          )}
        </div>

        <div>
          {!this.state.settingsMount ? null : (
            <Settings
              action={this.toggleSettingsMount}
              selectDeck={this.toggleDeckSize}
              selectLevel={this.toggleLevel}
              settingsMount={this.state.settingsMount}
            />
          )}
        </div>
      </main>
    );
  }
}
export default Home;
