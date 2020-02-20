import React from "react";
import GameLogic from "./GameLogic";
import Avatar from "./Avatar";

function GameTable(props) {
  return (
    <section className={props.playMount ? "playPage" : "display_none"}>
      <Avatar />
      <div className="table">
        <GameLogic />
      </div>
    </section>
  );
}

export default GameTable;
