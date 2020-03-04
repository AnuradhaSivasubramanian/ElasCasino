import React from "react";
import "./scss/Button.scss";

function Buttons({ onclick, nameClass, buttonName }) {
  return (
    <div>
      <button onClick={onclick} className={nameClass}>
        {buttonName}
      </button>
    </div>
  );
}

export default Buttons;
