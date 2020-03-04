import React from 'react'
import "./scss/App.scss"
import TurnPhone from "./Photos/turn_your_phone.gif"

function TurnYourPhone(){
return(
    <div className="turnBody">
 <img src={TurnPhone} alt="turn your phone" id="phonegif"/>
 <h1 id="turnphone_h1">Turn your Phone or maximize your Screen</h1>
     </div>

)
}

export default TurnYourPhone