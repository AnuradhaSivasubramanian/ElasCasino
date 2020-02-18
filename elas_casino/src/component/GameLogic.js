import React, { Component } from "react";
import axios from "axios";
import "./GameTable.scss";
import TryAgain from "./TryAgain";
import Winner from "./Winner";
import Loser from "./Loser";

let myTimeoutFuncPlayer_1 = "";
let myTimeoutFuncPlayer_2 = "";
let myTimeoutSnapButton = "";

class GameLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: "dqvjddyoqnxl",
      player_1_remaining: "",
      player_2_remaining: "",
      player1: [],
      player2: [],
      dumppile: [],
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
      });

    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=10`
      )
      .then(response => response.data)
      .then(data => {
        let tempCards = [];
        data.cards.forEach(element => {
          tempCards.push(element.code);
        });
        console.log(tempCards);

        this.setPlayer1Pile(tempCards);
      });

    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=10`
      )
      .then(response => response.data)
      .then(data => {
        let tempCards = [];
        data.cards.forEach(element => {
          tempCards.push(element.code);
        });
        console.log(tempCards);

        this.setPlayer2Pile(tempCards);
      });

    myTimeoutFuncPlayer_1 = setTimeout(this.drawPlayer_1, 1000);
  }

  setPlayer1Pile(codes) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_1/add/?cards=${codes}`
      )
      .then(response => response.data)
      .then(data => {
        this.setState({ player_1_remaining: data.piles.player_1.remaining });
        this.setState({ flag: 0 });
      });
  }
  setPlayer2Pile(codes) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_2/add/?cards=${codes}`
      )
      .then(response => response.data)
      .then(data => {
        this.setState({ player_2_remaining: data.piles.player_2.remaining });
        this.setState({ flag: 0 });
      });
  }

  drawPlayer_1() {
    clearTimeout(myTimeoutFuncPlayer_1);
    if (this.isNoWinner()) {
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_1/draw/bottom/?count=1`
        )
        .then(response => response.data)
        .then(data => {
          console.log(data);
          console.log(`${data.cards[0].suit} ${data.cards[0].value}`);
          this.setState({
            player1: data.cards[0],
            player_1_remaining: data.piles.player_1.remaining
          });

          axios
            .get(
              `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/add/?cards=${this.state.player1.code} `
            )
            .then(
              response =>
                this.setState({
                  dumppile: response.data.piles.dumppile.remaining
                }),
              this.setState({ flag: 0 })
            );
        });

      if (this.state.player_2_remaining !== 0) {
        myTimeoutFuncPlayer_2 = setTimeout(this.drawPlayer_2, 1000);
      }
    }
  }

  drawPlayer_2() {
    clearTimeout(myTimeoutFuncPlayer_2);

    if (this.isNoWinner()) {
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_2/draw/bottom/?count=1`
        )
        .then(response => response.data)
        .then(data => {
          console.log(data);
          console.log(`${data.cards[0].suit} ${data.cards[0].value}`);

          this.setState({
            player2: data.cards[0],
            player_2_remaining: data.piles.player_2.remaining
          });
          axios
            .get(
              `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/add/?cards=${this.state.player2.code} `
            )
            .then(
              response =>
                this.setState({
                  dumppile: response.data.piles.dumppile.remaining
                }),
              this.setState({ flag: 0 })
            );
        });

      if (this.state.player_1_remaining !== 0) {
        myTimeoutFuncPlayer_1 = setTimeout(this.drawPlayer_1, 1000);
      }
    }
    if (
      this.state.player1.value === this.state.player2.value &&
      this.state.dumppile !== 0
    ) {
      myTimeoutSnapButton = setTimeout(
        this.mustSnap_2,
        (Math.floor(Math.random() * 1) + 1) * 500
      );
    }
  }

  mustSnap_1() {
    clearTimeout(myTimeoutSnapButton);

    if (
      this.state.player1.value === this.state.player2.value &&
      this.state.dumppile !== 0 &&
      this.state.WhosTurn === 1
    ) {
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/list/`
        )
        .then(response => {
          let listOfDumppile1 = [];
          response.data.piles.dumppile.cards.forEach(element =>
            listOfDumppile1.push(element.code)
          );
          axios
            .get(
              `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_1/add/?cards=${listOfDumppile1}`
            )
            .then(
              response =>
                this.setState({
                  player_1_remaining: response.data.piles.player_1.remaining
                }),
              this.setState({ flag: 1 })
            );
        });
    } else {
      this.setState({ flag: 3 });
    }
  }

  mustSnap_2() {
    this.setState({ WhosTurn: 2 });
    let listOfDumppile2 = [];
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/list/`
      )
      .then(response => {
        response.data.piles.dumppile.cards.forEach(element =>
          listOfDumppile2.push(element.code)
        );
        axios
          .get(
            `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_2/add/?cards=${listOfDumppile2}`
          )
          .then(
            response =>
              this.setState({
                player_2_remaining: response.data.piles.player_2.remaining
              }),
            this.setState({ flag: 2 })
          );
      });
    this.setState({ WhosTurn: 1 });
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

          <img
            src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48982_640.png"
            alt="backofadeck"
            className="dumppile"
          />
        </div>
        <div className="container3">
          <div className="container_child1">
            <img
              src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48982_640.png"
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
              src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48982_640.png"
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
