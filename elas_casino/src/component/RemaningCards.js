import React from 'react'
import "./scss/RemainingCards.scss"


function RemainingCards({playerRemainingCards,name}){
    return(
        <div>

    <p  className={name}>{playerRemainingCards}</p>
        </div>
    )
}

export default RemainingCards