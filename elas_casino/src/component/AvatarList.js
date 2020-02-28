import React from "react";
import AvatarImplement from "./AvatarImplement";
import "./AvatarImplement.scss";

const list = [
  {
    image:
      "https://api.adorable.io/avatars/158/abott@ab45t09ytiiip4l8le.io.png",
    selected: false
  },

  {
    image:
      "https://api.adorable.io/avatars/146/abott@ab45t09ytiiiip4l8le.io.png",
    selected: false
  },

  /* {
    image: "https://api.adorable.io/avatars/158/abott@ab45ytiiip4l8le.io.png",
    selected: false
  }, */

  {
    image: "https://api.adorable.io/avatars/285/abott@ab45y4l8lepink.io.png",
    selected: false
  },

  {
    image: "https://api.adorable.io/avatars/285/abott@ab45y4l8leoran.io.png",
    selected: false
  },

  {
    image:
      "https://api.adorable.io/avatars/285/abott@a5y4l8leor8iro7rmrng36n.io.png",
    selected: false
  },

  {
    image: "https://api.adorable.io/avatars/285/abott@a5irmrng36n.io.png",
    selected: false
  },

  {
    image: "https://api.adorable.io/avatars/285/abott@a51011jokopmin.io.png",
    selected: false
  },

  {
    image: "https://api.adorable.io/avatars/285/abott@a5mouth7.io.png",
    selected: false
  }
];

const AvatarList = () => (
  
  <div className="avatar_div">
   
    {list.map((item, index) => (
      <AvatarImplement
        key={index}
        image={item.image}
        selected={item.selected}
      />
      
    ))}
 </div>
);

export default AvatarList;
