import React, { Component } from "react";
import axios from "axios";
import "./GameTable.scss";
import TryAgain from "./TryAgain";
import Winner from "./Winner";
import Loser from "./Loser";

import Card from "./Photos/BackOfaDeck2.png";

let myTimeoutSnapButton = "";

class GameLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: "92f3sjrskpo7",
      player_1_remaining: "",
      player_2_remaining: "",
      player1: [],
      player2: [],
      dumppile: "",
      WhosTurn: 1,
      flag: 0
    };
    this.drawOnClick = this.drawOnClick.bind(this);
    this.drawPlayer_1 = this.drawPlayer_1.bind(this);
    this.drawPlayer_2 = this.drawPlayer_2.bind(this);
    this.mustSnap_1 = this.mustSnap_1.bind(this);
    this.mustSnap_2 = this.mustSnap_2.bind(this);
    this.isNoWinner = this.isNoWinner.bind(this);
  }

  drawOnClick() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/shuffle/`)
      .then(response => response.data)
      .then(data => {
        console.log(data.remaining);
        this.setState({ flag: 0 });
        this.drawCardsForPlayer("player_1");
        this.drawCardsForPlayer("player_2");
      })
      .catch(error => console.error(`something went wrong: ${error}`));

    setTimeout(this.drawPlayer_1, 4000);
  }

  drawCardsForPlayer(player) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=12`
      )
      .then(response => response.data)
      .then(data => {
        let tempCards = [];
        data.cards.forEach(element => {
          tempCards.push(element.code);
        });
        this.addCardsToPile(tempCards, player, 0);
      });
  }

  addCardsToPile(codes, pilename, setFlag) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${pilename}/add/?cards=${codes}`
      )
      .then(response => response.data)
      .then(data => {
        if (pilename === "player_1") {
          this.setState({ player_1_remaining: data.piles.player_1.remaining });
        }
        if (pilename === "player_2") {
          this.setState({
            player_1_remaining: data.piles.player_1.remaining,
            player_2_remaining: data.piles.player_2.remaining
          });
        }
        if (pilename === "dumppile") {
          this.setState({
            player_1_remaining: data.piles.player_1.remaining,
            player_2_remaining: data.piles.player_2.remaining,
            dumppile: data.piles.dumppile.remaining
          });
        }
        this.setState({ flag: setFlag });
      })
      .catch(error => console.error(`something went wrong: ${error}`));
  }

  drawPlayer_1() {
    if (this.isNoWinner()) {
      this.drawACardForPlayer("player_1", 1);

      if (this.state.player_2_remaining !== 0) {
        setTimeout(this.drawPlayer_2, 5000);
      }
    }
  }

  drawPlayer_2() {
    if (this.isNoWinner()) {
      this.drawACardForPlayer("player_2", 1);

      if (this.state.player_1_remaining !== 0) {
        setTimeout(this.drawPlayer_1, 5000);
      }
    }
    if (
      this.state.player1.value === this.state.player2.value &&
      this.state.dumppile !== 0
    ) {
      myTimeoutSnapButton = setTimeout(
        this.mustSnap_2,
        (Math.floor(Math.random() * 9) + 1) * 1000
      );
    }
  }

  drawACardForPlayer(pilename, noOfCards) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${pilename}/draw/bottom/?count=${noOfCards}`
      )
      .then(response => response.data)
      .then(data => {
        if (pilename === "player_1") {
          this.setState({
            player1: data.cards[0],
            player_1_remaining: data.piles.player_1.remaining
          });
          this.addCardsToPile(this.state.player1.code, "dumppile", 0);
        }
        if (pilename === "player_2") {
          this.setState({
            player2: data.cards[0],
            player_2_remaining: data.piles.player_1.remaining
          });
          this.addCardsToPile(this.state.player2.code, "dumppile", 0);
        }
      })
      .catch(error => console.error(`something went wrong: ${error}`));
  }

  mustSnap_1() {
    clearTimeout(myTimeoutSnapButton);

    if (
      this.state.player1.value === this.state.player2.value &&
      this.state.dumppile !== 0 &&
      this.state.WhosTurn === 1
    ) {
      this.dumpPileToPlayer("player_1", 1);
    } else {
      this.setState({ flag: 3 });
    }
  }

  mustSnap_2() {
    this.setState({ WhosTurn: 2 });
    this.dumpPileToPlayer("player_2", 2);
    this.setState({ WhosTurn: 1 });
  }
  dumpPileToPlayer(pilename, flagValue) {
    let listOfDumppile = [];
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/list/`
      )
      .then(response => {
        response.data.piles.dumppile.cards.forEach(element =>
          listOfDumppile.push(element.code)
        );
        this.addCardsToPile(listOfDumppile, pilename, flagValue);
      })
      .catch(error => console.error(`something went wrong: ${error}`));
  }
  isNoWinner() {
    if (this.state.player_1_remaining === 0) {
      this.setState({ flag: 5 });
      return 0;
    } else if (this.state.player_2_remaining === 0) {
      this.setState({ flag: 4 });
      return 0;
    } else return 1;
  }

  render() {
    return (
      <section>
        <div className="dumpPileDiv">
          <p className="remaning_dumppile">{this.state.dumppile}</p>

          <img src={Card} alt="backofadeck" className="dumppile" />
        </div>
        <div className="container3">
          <div className="container_child1">
            <img
              src={Card}
              alt="backofadeck"
              className={
                this.state.flag === 1 ? "backofadeck_on" : "backofadeck_off"
              }
            />
            <img
              src={this.state.player1.image}
              alt=""
              className={
                this.state.flag === 4 || this.state.flag === 5
                  ? "visibility_none"
                  : "card_image"
              }
            />
            <p className="remaning_player1">{this.state.player_1_remaining}</p>
          </div>
          <h3>EC</h3>
          <div> {this.state.flag === 3 ? <TryAgain /> : null}</div>
          <div className="container_child2">
            <img
              src={this.state.player2.image}
              alt=""
              className={
                this.state.flag === 4 || this.state.flag === 5
                  ? "visibility_none"
                  : "card_image"
              }
            />
            <img
              src={Card}
              alt="backofadeck"
              className={
                this.state.flag === 2 ? "backofadeck_on" : "backofadeck_off"
              }
            />
            <p className="remaning_player2">{this.state.player_2_remaining}</p>
          </div>
          <div className="result">
            {this.state.flag === 4 ? <Winner /> : null}
            {this.state.flag === 5 ? <Loser /> : null}
          </div>
        </div>
        <div className="container2">
          <button onClick={this.mustSnap_1} className="snap">
            Snap
          </button>
          <button className="snap">Snap</button>
        </div>
        <div className="container1">
          <button onClick={this.drawOnClick}>Start the Game</button>
        </div>
      </section>
    );
  }
}

export default GameLogic;
