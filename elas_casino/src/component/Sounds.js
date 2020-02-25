import React from "react";
import Cards_shuffle from "./Sounds/Cards_shuffle";

function Sounds({ Soundflag }) {
  {
    if (Soundflag === 0) {
      return (
        <div>
          <audio autoPlay>
            <source src={Cards_shuffle} type="audio/waw" />
          </audio>
        </div>
      );
    }
  }
}

export default Sounds;
