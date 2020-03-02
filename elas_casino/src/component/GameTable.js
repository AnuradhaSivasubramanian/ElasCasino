import React  from "react";
import GameLogic from "./GameLogic";
import Avatar from "./Avatar";
import "./GameTable.scss";

function GameTable({ playMount, selectLevel, selectDeck,avatar,playerName,onClick}) {


  return (
    <section className={playMount ? "playPage" : "display_none"}>
      <Avatar avatar={avatar} playerName={playerName} />
      <div className="table">
        <GameLogic selectLevel={selectLevel} selectDeck={selectDeck} />
      </div>
      <button onClick={onClick}>Home</button>
      

      
   

    </section>
  );
}

export default GameTable;
