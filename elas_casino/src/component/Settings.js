import React from "react";

import "./Settings.css";
class Settings extends React.Component {
  render() {
    return (
      <section
        className={
          this.props.settingsMount ? "settings_section" : "display_none"
        }
      >
        <div className="settings_div">
          <h1>Game Settings</h1>
          <div className="toggle_container">
            <div className="toggle1_div">
              Half Deck
              <label className="switch">
                <input type="checkbox" onChange={this.props.selectDeck} />
                <span className="slider round"></span>
              </label>
              Full Deck
            </div>
            <div className="toggle2_div">
              Easy Level
              <label className="switch">
                <input type="checkbox" onChange={this.props.selectLevel} />
                <span className="slider round"></span>
              </label>
              Hard Level
            </div>
          </div>

          <button className="pointer" onClick={this.props.action}>
            CLOSE
          </button>
        </div>
      </section>
    );
  }
}

export default Settings;
