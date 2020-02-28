import React, { Component } from "react";
import axios from "axios";
import "./scss/Logo.scss";
import TryAgain from "./TryAgain";
import Pile from "./Pile";
import DisplayResult from "./DisplayResult";
import Buttons from "./Buttons";
 import Sounds from "./Sounds";
  let myTimeoutSnapButton = "";
// HEY ANU I AM UPDATED
class GameLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck_id: "",
      player_1_remaining: "",
      player_2_remaining: "",
      player1: [],
      player2: [],
      dumppile: "",
      WhosTurn: 1,
      flag: 0,
      countCards: 0
    };
    this.drawOnClick = this.drawOnClick.bind(this);
    this.drawPlayer_1 = this.drawPlayer_1.bind(this);
    this.drawPlayer_2 = this.drawPlayer_2.bind(this);
    this.mustSnap_1 = this.mustSnap_1.bind(this);
    this.mustSnap_2 = this.mustSnap_2.bind(this);
    this.isNoWinner = this.isNoWinner.bind(this);
    this.fullDeck = this.fullDeck.bind(this);
    this.resultUnmount = this.resultUnmount.bind(this);
  }
  componentDidMount() {
    this.fullDeck();
  }

  fullDeck() {
    if (this.props.selectDeck === true) {
      this.setState({ deck_id: "1zbmzpx5yxvt" });
      this.setState({ countCards: 26 });
    } else {
      this.setState({ deck_id: "5eb1ajr3aoxt" });
      this.setState({ countCards: 13 });
    }
  }
  resultUnmount() {
    this.setState({
      flag: 0
    });
    console.log("set flag to 0");
  }

  drawOnClick() {
    this.setState({
      player_1_remaining: "",
      player_2_remaining: "",
      player1: [],
      player2: [],
      dumppile: "",
      WhosTurn: 1,
      flag: 0
    });
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

    if (this.props.selectLevel) {
      setTimeout(this.drawPlayer_1, 3000);
      console.log(this.props.selectLevel);
      console.log("easy");
    } else {
      setTimeout(this.drawPlayer_1, 1000);
      console.log("hard");
      console.log(this.props.selectLevel);
    }
  }

  drawCardsForPlayer(player) {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=${this.state.countCards}`
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
        if (this.props.selectLevel) {
          setTimeout(this.drawPlayer_2, 3000);
        } else {
          setTimeout(this.drawPlayer_2, 1000);
        }
      }
    }
  }

  drawPlayer_2() {
    if (this.isNoWinner()) {
      this.drawACardForPlayer("player_2", 1);

      if (this.state.player_1_remaining !== 0) {
        if (this.props.selectLevel) {
          setTimeout(this.drawPlayer_1, 3000);
        } else {
          setTimeout(this.drawPlayer_1, 1000);
        }
      }
    }
    if (
      this.state.player1.value === this.state.player2.value 
        &&
      (this.state.player_1_remaining !== 0 ||
        this.state.player_2_remaining !== 0)
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
            player_1_remaining: data.piles.player_1.remaining,
            flag: 0
          });
          this.addCardsToPile(this.state.player1.code, "dumppile", 0);
        }
        if (pilename === "player_2") {
          this.setState({
            player2: data.cards[0],
            player_2_remaining: data.piles.player_2.remaining,
            flag: 0
          });
          this.addCardsToPile(this.state.player2.code, "dumppile", 0);
        }
      })
      .catch(error => console.error(`something went wrong: ${error}`));
  }

  mustSnap_1() {
    clearTimeout(myTimeoutSnapButton);

    if (
      this.state.player1.value === this.state.player2.value 
    &&
      this.state.dumppile !== 0 &&
      this.state.WhosTurn === 1 &&
      this.state.player_1_remaining > 0
    ) {
      console.log("I am inside if");
      this.dumpPileToPlayer("player_1", 1);
      this.setState({ player2: [] });
    } else {
      if (this.state.player_1_remaining > 0) {
        this.setState({ flag: 3 });
      }
    }
  }

  mustSnap_2() {
    this.setState({ WhosTurn: 2 });
    this.dumpPileToPlayer("player_2", 2);
    this.setState({ player1: [] });
    this.setState({ WhosTurn: 1 });
    console.log("computer snap");
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
           <Sounds soundValue={this.state.flag} />
        <div className="cards_container">
          <div className="player_1_container">
            <Pile
              nameTheRemainingCards="remaining_player1"
              playerRemainingCards={this.state.player_1_remaining}
              flagValueBackOfTheCards={
                this.state.flag === 1 ? this.state.flag : null
              }
              isDisplayCard
              displayCardImage={this.state.player1.image}
              flagValueDisplayCard={this.state.flag}
            />
          </div>
          <div className="middle_container">
            <Pile
              nameTheRemainingCards="remaining_dumppile"
              playerRemainingCards={this.state.dumppile}
              isDumppile
            />
            <div className="positionLogo">
              <p>E</p>
              <p id="C">C</p>
            </div>
          </div>

          <div className="player_2_container">
            <Pile
              nameTheRemainingCards="remaining_player2"
              playerRemainingCards={this.state.player_2_remaining}
              flagValueBackOfTheCards={
                this.state.flag === 2 ? this.state.flag : null
              }
              isDisplayCard={true}
              displayCardImage={this.state.player2.image}
              flagValueDisplayCard={this.state.flag}
              player2Plays
            />
          </div>
        </div>
        <div className="snapButton_container">
          <Buttons
            onclick={this.mustSnap_1}
            nameClass="snapButton"
            buttonName="SNAP"
          />
          <Buttons nameClass="snapButton" buttonName="SNAP" />
        </div>
        {this.state.flag === 3 ? <TryAgain /> : null}
        {this.state.flag === 4 || this.state.flag === 5 ? (
          <DisplayResult
            result={this.state.flag}
            actiondisplay={this.resultUnmount}
          />
        ) : null}
        <Buttons
          onclick={this.drawOnClick}
          nameClass="StartButton"
          buttonName="Start the game"
        />
      </section>
    );
  }
}

export default GameLogic;
