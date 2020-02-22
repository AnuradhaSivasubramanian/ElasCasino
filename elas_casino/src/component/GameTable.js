import React from "react";
import GameLogic from "./GameLogic";
import Avatar from "./Avatar";
import "./GameTable.scss"

function GameTable(props) {
  return (
    <section>
      <Avatar />
      <div className="table">
        <GameLogic />
      </div>
    </section>
  );
}

export default GameTable;
