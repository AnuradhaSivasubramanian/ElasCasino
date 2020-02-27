import React from "react";
import "./Rules.css";
class Rules extends React.Component {
  render() {
    return (
      <section
        className={this.props.rulesMount ? "rules_section" : "display_none"}
      >
        <div className="rules_div">
          <h1>Rules</h1>
          <article>
            <ul>
              <li>Snap is a matching game.</li>
              <li>Your goal is to win all of the cards</li>
              <li>
                The cards are shuffled and distributed evenly to both players
              </li>
              <li>
                When the game starts, one card of each player is displayed at the same time. 
              </li>
              <li>If there is no action in the hand the cards go to the dump pile</li>
              <li>If the cards match click on <span class="color_red">SNAP</span> to win the hand</li>
              <li>The player who wins the hand will recive all the cards from the dump pile</li>
              <li>The player who runs out of cards loses.</li>

              <li>The game can <span class="color_red">only</span>  be played in landscape mode on smart devices or maximized screen on desktops!</li>

              <li></li>
            </ul>
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
