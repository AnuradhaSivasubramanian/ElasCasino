import React from "react";
// import Shuffle from "./Sounds/Cards_shuffle.wav";
import No_match from "./Sounds/No_match.mp3";
import Snap from "./Sounds/Snap.mp3";
import Winner from "./Sounds/Crowd_Cheers.mp3";
import Loser from "./Sounds/Crowd_Sigh.wav";

class Sounds extends React.Component {
  HandlerAudio() {
    if (this.props.soundValue === 3) {
      
      let testAudio = new Audio(`${No_match}`);
      testAudio.play();
    } else if (this.props.soundValue === 1 || this.props.soundValue === 2) {
    
      let testAudio = new Audio(`${Snap}`);
      testAudio.play();
    } else if (this.props.soundValue === 4) {
     
      let testAudio = new Audio(`${Winner}`);
      testAudio.play();
    } else if (this.props.soundValue === 5) {
      
      let testAudio = new Audio(`${Loser}`);
      testAudio.play();
    }
  }

  render() {
    return <div>{this.HandlerAudio()}</div>;
  }
}

export default Sounds;
