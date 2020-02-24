import React from "react";
import GameLogic from "./GameLogic";
import Avatar from "./Avatar";
import "./GameTable.scss";

function GameTable({ playMount }) {
  return (
    <section className={playMount ? "playPage" : "display_none"}>
      <Avatar />
      <div className="table">
        <GameLogic />
      </div>
    </section>
  );
}

export default GameTable;
