import React from "react";
import "./AvatarImplement.scss";

const  AvatarImplement  =({key,onClick,obj,unmount}) =>{
 const SelectedOb=()=>{
   onClick(obj)
 }

    return (
      
      <section className="container_avatar"> 
          <ul>
          <li>
            <img 
            id={key}
            src={obj} 
            onClick={SelectedOb}
            
            
            alt="avatar" className="imgItem" /></li>
          </ul>
      
      </section>
     
    );
  
}

export default AvatarImplement;
