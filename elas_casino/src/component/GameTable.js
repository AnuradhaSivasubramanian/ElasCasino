import React from 'react'
import GameLogic from "./GameLogic"
import Avatar from "./Avatar"

function GameTable(){
return(
<main>
  <Avatar/>
  <div className="table">
   <GameLogic/>
  </div>  
</main>
)
}

export default GameTable
