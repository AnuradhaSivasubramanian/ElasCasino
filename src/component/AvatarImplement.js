import React from "react";
import "./scss/AvatarImplement.scss";

const AvatarImplement = ({ onClick, obj }) => {
  const SelectedOb = () => {
    onClick(obj);
  };

  return (
    <section className="container_avatar">
      <ul>
        <li>
          <img
            src={obj}
            onClick={SelectedOb}
            alt="avatar"
            className="imgItem"
          />
        </li>
      </ul>
    </section>
  );
};

export default AvatarImplement;
