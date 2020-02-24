import React from "react";
import "./Avatar.scss";

class Avatar extends React.Component {
  render() {
    return (
      <section>
        <div className="avatar_Display">
          <img
            src="https://cdn.onlinewebfonts.com/svg/img_181369.png"
            alt=""
            className="imagem_avatar"
          />
          <p className="playerName"> Player 1</p>
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
}

export default Avatar;
