import React from "react";
import "./AvatarImplement.scss";

const  AvatarImplement  =({key,onClick,obj,unmount}) =>{
 const SelectedOb=()=>{
   onClick(obj)
 }

    return (
      
      <section className="container"> 
          <ul className="imgContainer">
          <li className="imgItem">
            <img 
            id={key}
            src={obj} 
            onClick={SelectedOb}
            
            
            alt="avatar" className="avatar" /></li>
          </ul>
      
      </section>
     
    );
  
}

export default AvatarImplement;
