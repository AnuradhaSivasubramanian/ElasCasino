import React, { Component } from "react";
import axios from "axios";
import "./GameTable.scss";
let myTimeoutStartButton = "";


class StartButton extends Component{
    constructor(props) {
        super(props);

this.drawOnClick = this.drawOnClick.bind(this);

    }
drawOnClick() {
    axios
      .get(
        `https://deckofcardsapi.com/api/deck/phk05g1i9bck/draw/?count=26`
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
        `https://deckofcardsapi.com/api/deck/phk05g1i9bck/draw/?count=26`
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
      myTimeoutStartButton=setTimeout(this.drawPlayer_1, 1000);
    }
  
  render( ){
      return(
<div>
{this.drawOnClick}
</div> )
  }
}

export default StartButton