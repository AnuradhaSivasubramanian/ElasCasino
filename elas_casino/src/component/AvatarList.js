import React from "react";
import AvatarImplement from "./AvatarImplement";
import "./scss/AvatarImplement.scss";


const AvatarList = ({avatarList,onClick}) => {
  
  return(
  <div className="avatar_div">
   
    {avatarList.map((item, index) => (
      <AvatarImplement
        key={index}
        obj={item.image}
        onClick={onClick}
        
        
        
      />
      
    ))}
 </div>)
};

export default AvatarList;
