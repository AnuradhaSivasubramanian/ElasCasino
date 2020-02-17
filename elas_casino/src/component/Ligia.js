import React, { Component } from "react";
import axios from "axios";
let myTimeoutFuncPlayer_1 = "";
let myTimeoutFuncPlayer_2 = "";

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
      WhosTurn: 0
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
    this.setState({ WhosTurn: 1 });
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
        });

      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/add/?cards=${this.state.player1.code} `
        )
        .then(response =>
          this.setState({ dumppile: response.data.piles.dumppile.remaining })
        );

      if (this.state.player_2_remaining !== 0) {
        myTimeoutFuncPlayer_2 = setTimeout(this.drawPlayer_2, 4000);
      }
    }
  }

  drawPlayer_2() {
    clearTimeout(myTimeoutFuncPlayer_2);
    this.setState({ WhosTurn: 2 });
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
        });

      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/add/?cards=${this.state.player2.code} `
        )
        .then(response =>
          this.setState({ dumppile: response.data.piles.dumppile.remaining })
        );

      if (this.state.player_1_remaining !== 0) {
        myTimeoutFuncPlayer_1 = setTimeout(this.drawPlayer_1, 4000);
      }
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
    let listOfDumppile = [];
   axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/list/`
      )

      .then(
        response => {
          response.data.cards.forEach(element => {
            listOfDumppile.push(element.code);
          });
        },

        console.log(listOfDumppile)
      ); 

    //draw
 /*    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/draw/?cards=${code}
        `
      )
      .then(response => {
        console.log("I am here drawing");
        console.log(response.data);
      });
    //add */
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_1/add/?cards=${listOfDumppile}`
      )
      .then(response => {
        console.log("I am now adding");
        console.log(response.data);
      });
  }

  mustSnap_2() {
    if (this.state.player1.value === this.state.player2.value) {
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/list/`
        )
        .then(response => {
          let lsitOfDumppile = [];
          response.data.piles.dumppile.cards.forEach(element =>
            lsitOfDumppile.push(element.code)
          );
        });
      axios
        .get(
          `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/player_2/add/?cards=${this.lsitOfDumppile}`
        )
        .then(response =>
          this.setState({
            player_2_remaining: response.data.piles.player_2.remaining
          })
        );
    } else {
      console.log("notequal");
    }
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
        <button onClick={this.mustSnap_2}>Snap</button>

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
