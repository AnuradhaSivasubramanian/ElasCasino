import React from "react";
import "./Avatar.scss";

function Avatar({avatar,playerName}) {

    return (
      <section>
        <div className="avatar_Display">
          <img
            src={avatar}
            alt="avatar"
            className="imagem_avatar"
          />
          <p className="playerName"> {playerName}</p>
          <img
            src="https://api.adorable.io/avatars/139/abott@adorabss899l9oe.io.png"
            alt=""
            className="imagem_avatar"
          />
          <p className="playerName"> Computer</p>
        </div>
      </section>
    );
  
}

export default Avatar;
