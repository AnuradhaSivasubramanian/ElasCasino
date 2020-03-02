import React from "react";
import "./Avatar.scss";

function Avatar({avatar,playerName}) {

    return (
      <section>
        <div className="avatar_Display">
          <img
            src={avatar? avatar:"https://cdn.onlinewebfonts.com/svg/img_181369.png"}
            alt="avatar"
            className="imagem_avatar"
          />
          <p className="playerName"> {playerName}</p>
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_181369.png"
            alt=""
            className="imagem_avatar"
          />
          <p className="playerName"> Computer</p>
        </div>
      </section>
    );
  
}

export default Avatar;
