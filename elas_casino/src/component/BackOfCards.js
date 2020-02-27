import React from "react";
import "./scss/BackOfTheDeck.scss";
import Card from "./Photos/BackOfaDeck2.png";

function BackOfCards({ flagValue, backofthedeckID }) {
  return (
    <div>
      <img
        src={Card}
        alt="Back of the deck of cards"
        className={
          flagValue === 1 || flagValue === 2
            ? "backofadeck_on"
            : "backofadeck_off"
        }
        id={backofthedeckID}
      />
    </div>
  );
}

export default BackOfCards;
