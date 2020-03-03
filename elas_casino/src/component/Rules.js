import React from "react";
import "./scss/Rules.scss";
class Rules extends React.Component {
  render() {
    return (
      <section
        className={this.props.rulesMount ? "rules_section" : "display_none"}
      >
        <div className="rules_div">
          <section className="rules_h1">
            <h1>Rules</h1>
          </section>
          <article className="rules_list">
            <ul>
              <li>Snap is a matching game.</li>
              <li>Your goal is to win all of the cards</li>
              <li>
                The cards are shuffled and distributed evenly to both players
              </li>
              <li>
                When the game starts, one card of each player is displayed at
                the same time.
              </li>
              <li>
                If there is no action in the hand the cards go to the dump pile
              </li>
              <li>
                If the cards match click on{" "}
                <span className="color_red">SNAP</span> to win the hand
              </li>
              <li>
                The player who wins the hand will recive all the cards from the
                dump pile
              </li>
              <li>The player who runs out of cards loses.</li>

              <li>
                The game can <span className="color_red">only</span> be played
                in landscape mode on smart devices or maximized screen on
                desktops!
              </li>
            </ul>
          </article>
          <section className="button_rules">
            <button className="pointer " onClick={this.props.action}>
              CLOSE
            </button>
          </section>
        </div>
      </section>
    );
  }
}

export default Rules;
