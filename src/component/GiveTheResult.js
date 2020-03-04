import React from 'react'
import "./scss/GiveTheResult.scss"

function GiveTheResults({WinnerOrCry}){
    return(
<div className="container">
<h1 className="winner_h1">
  {WinnerOrCry === "Winner" ? "You won!!" : "You lost!!"}
</h1>
<p className="winner_p">
   {WinnerOrCry === "Winner"
    ? "Winner Winner Chickens for dinner. Congratulations you won the match!"
    : "  Kuan Kuan Kuan. You lost the game, but DON'T CRY you can keep playing it!"}
</p>
</div>
)
}

export default GiveTheResults