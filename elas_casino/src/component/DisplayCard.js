import React from 'react'
import "./scss/DisplayCard.scss"

function DisplayCard({displaycard, flagValue}){
return(
    <div>
        <div id="placeholdercard">
        </div>

<img
src={displaycard}
alt=""
className={
    flagValue=== 4 || flagValue=== 5
    ? "visibility_none"
    : "card_image"
} />
</div>
)

}

export default DisplayCard



 /* 
<img
src={this.state.player1.image}
alt=""
className={
  this.state.flag === 4 || this.state.flag === 5
    ? "visibility_none"
    : "card_image"
} */