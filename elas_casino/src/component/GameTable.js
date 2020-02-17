import React from 'react'
import "./GameTable.scss"
import GameLogic from "./GameLogic"

function GameTable(){
return(
<main>
  <div className="table">
   <GameLogic/>
  </div>  
</main>
)
}

export default GameTable
