import React from 'react'
import "./scss/BackOfTheDeck.scss"

function BackOfCards({flagValue,backofthedeckID}){

    return(
        <div>
        <img
        src="https://cdn.pixabay.com/photo/2012/05/07/18/53/card-game-48982_640.png"
        alt="Back of the deck of cards"
        className={flagValue===1 || flagValue===2?"backofadeck_on" : "backofadeck_off"}
        id= {backofthedeckID }       />
        </div>
    )
}

export default BackOfCards