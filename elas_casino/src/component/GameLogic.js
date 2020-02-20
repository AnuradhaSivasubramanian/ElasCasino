import React, { Component } from "react";
import axios from "axios";
import "./GameTable.scss";
import TryAgain from "./TryAgain";
import Winner from "./Winner";
import Loser from "./Loser";

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
        this.drawCardsForPlayer("player_1");
        this.drawCardsForPlayer("player_2");
      });

    setTimeout(this.drawPlayer_1, 2000);
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
        this.setPlayerPile(player, tempCards);
      });
  }

  setPlayerPile(pilename, codes) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/${pilename}/add/?cards=${codes}`
      )
      .then(response => response.data)
      .then(data => {
        this.setState({ player_1_remaining: data.piles.player_1.remaining });
        this.setState({ flag: 0 });
      });
  }

  drawPlayer_1() {
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
          this.moveFromPlayerToDump(this.state.player1.code);
        });

      if (this.state.player_2_remaining !== 0) {
        setTimeout(this.drawPlayer_2, 1000);
      }
    }
  }

  drawPlayer_2() {
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
          this.moveFromPlayerToDump(this.state.player2.code);
        });

      if (this.state.player_1_remaining !== 0) {
        setTimeout(this.drawPlayer_1, 1000);
      }
    }
    if (
      this.state.player1.value === this.state.player2.value &&
      this.state.dumppile !== 0
    ) {
      myTimeoutSnapButton = setTimeout(
        this.mustSnap_2,
        (Math.floor(Math.random() * 9) + 1) * 500
      );
    }
  }
  moveFromPlayerToDump(code) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/pile/dumppile/add/?cards=${code} `
      )
      .then(
        response =>
          this.setState({
            dumppile: response.data.piles.dumppile.remaining
          }),
        this.setState({ flag: 0 })
      );
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
         
{/* component Dumppile  BackofCards  - RemaningCards*/ }
         
         <div className="dumpPileDiv">
          <p className="remaning_dumppile">{this.state.dumppile}</p>

          <img
            src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48982_640.png"
            alt="backofadeck"
            className="dumppile"
          />
                  </div>

{/*          component Dumppile* /}

{/*  Player 1 - BackofCards - DisplayCards - RemaningCards
 */}       
 
 
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
{/*     End of Player - 1
 */}        
   <p>EC</p>
   <div> {this.state.flag === 3 ? <TryAgain /> : null}</div>


        
          
{/*          Player 2  - BackofCards - DisplayCards - RemaningCards
 */}          <div className="container_child2">
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

{/*           end of player 2
 */}         
 
 
           <div className="result">
            {this.state.flag === 4 ? <Winner /> : null}
            {this.state.flag === 5 ? <Loser /> : null}
          </div>
        </div>

{/*        HandlerButtons container - having the 3 buttons
 */}        <div className="container2">
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
