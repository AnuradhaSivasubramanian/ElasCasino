import React, { Component } from "react";
import axios from "axios";
let myTimeoutFuncPlayer_1 = "";
let myTimeoutFuncPlayer_2 = "";
let myTimeoutSnapButton = "";

class Ligia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: "uxjo517j8usn",
      player_1_remaining: "",
      player_2_remaining: "",
      player1: [],
      player2: [],
      dumppile: [],
      WhosTurn: 1
    };
    this.shuffleOnClick = this.shuffleOnClick.bind(this);
    this.drawOnClick = this.drawOnClick.bind(this);
    this.drawPlayer_1 = this.drawPlayer_1.bind(this);
    this.drawPlayer_2 = this.drawPlayer_2.bind(this);
    this.mustSnap_1 = this.mustSnap_1.bind(this);
    this.mustSnap_2 = this.mustSnap_2.bind(this);
    this.isNoWinner = this.isNoWinner.bind(this);
  }
  shuffleOnClick() {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/shuffle/`)
      .then(response => response.data)
      .then(data => {
        console.log(data.remaining);
      });
  }
  drawOnClick() {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=6`
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
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=6`
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

    myTimeoutFuncPlayer_1 = setTimeout(this.drawPlayer_1, 4000);
  }

  setPlayer1Pile(codes) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_1/add/?cards=${codes}`
      )
      .then(response => response.data)
      .then(data => {
        this.setState({ player_1_remaining: data.piles.player_1.remaining });
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
            .then(response =>
              this.setState({
                dumppile: response.data.piles.dumppile.remaining
              })
            );
        });

      if (this.state.player_2_remaining !== 0) {
        myTimeoutFuncPlayer_2 = setTimeout(this.drawPlayer_2, 10000);
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
            .then(response =>
              this.setState({
                dumppile: response.data.piles.dumppile.remaining
              })
            );
        });

      if (this.state.player_1_remaining !== 0) {
        myTimeoutFuncPlayer_1 = setTimeout(this.drawPlayer_1, 10000);
      }
    }
    if (
      this.state.player1.value !== this.state.player2.value &&
      this.state.dumppile !== 0
    ) {
      myTimeoutSnapButton = setTimeout(
        this.mustSnap_2,
        (Math.floor(Math.random() * 2) + 1) * 1000
      );
    }
  }

  isNoWinner() {
    if (this.state.player_1_remaining === 0) {
      console.log("player2 won!");
      return 0;
    } else if (this.state.player_2_remaining === 0) {
      console.log("player1 won!");
      return 0;
    } else return 1;
  }

  mustSnap_1() {
    clearTimeout(myTimeoutSnapButton);
    let listOfDumppile1 = [];
    if (
      this.state.player1.value !== this.state.player2.value &&
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
          .then(response =>
            this.setState({
              player_1_remaining: response.data.piles.player_1.remaining
                          })
          ); });
      
    } else {
      console.log("notequal");
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
          .then(response =>
            this.setState({
              player_2_remaining: response.data.piles.player_2.remaining
            })
          ); });
          this.setState({ WhosTurn: 1 });
  }

  render() {
    return (
      <main>
        <header>
          <h1>Lets play Snap!!</h1>
          <p>click on the button to get your cards</p>
        </header>
        <button onClick={this.shuffleOnClick}>Shuffle the deck</button>
        <button onClick={this.drawOnClick}>Draw cards</button>
        <button onClick={this.drawPlayer_1}>Player-1 draw card</button>
        <button onClick={this.drawPlayer_2}>Player-2 draw card</button>
        <button onClick={this.mustSnap_1}>Snap</button>
        <button onClick={this.mustSnap_2}>COMPUTER</button>

        <img src={this.state.player1.image} alt="" />
        <img src={this.state.player2.image} alt="" />
      </main>
    );
  }
}

export default Ligia;

/* {!this.state.player1 ? (
          this.isTheSame() ? (
            <p>Snap it is!!</p>
          ) : (
            <p>Draw Again</p>
          )
        ) : (
          <p></p>
        )} */
