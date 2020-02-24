import React from "react";
import BackOfCards from "./BackOfCards";
import RemainingCards from "./RemaningCards";
import DisplayCard from "./DisplayCard";
import "./scss/Pile.scss";

function Pile({
  isDumppile,
  nameTheRemainingCards,
  playerRemainingCards,
  flagValueBackOfTheCards,
  isDisplayCard,
  displayCardImage,
  flagValueDisplayCard,
  player2Plays
}) {
  if (player2Plays) {
    return (
      <div className="display_inline">
        {isDisplayCard ? (
          <DisplayCard
            displaycard={displayCardImage}
            flagValue={flagValueDisplayCard}
          />
        ) : null}
        <RemainingCards
          name={nameTheRemainingCards}
          playerRemainingCards={playerRemainingCards}
        />
        <div className={isDumppile ? null : "backFromPile"}>
          <BackOfCards
            flagValue={flagValueBackOfTheCards}
            backofthedeckID={isDumppile ? "BackOfTheDeck_Dumppile" : null}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="display_inline">
        <div className={isDumppile ? null : "backFromPile"}>
          <BackOfCards
            flagValue={flagValueBackOfTheCards}
            backofthedeckID={isDumppile ? "BackOfTheDeck_Dumppile" : null}
          />
        </div>
        {isDisplayCard ? (
          <DisplayCard
            displaycard={displayCardImage}
            flagValue={flagValueDisplayCard}
          />
        ) : null}
        <RemainingCards
          name={nameTheRemainingCards}
          playerRemainingCards={playerRemainingCards}
        />
      </div>
    );
  }
}

export default Pile;
