import React from "react";
import Snap from "./Sounds/Snap.mp3";

let testAudio =new Audio("")
class Sounds extends React.Component {
   
   HandlerAudio(){
    if(this.props.soundValue === 3){
    this.PlayAudio({Snap})
   } 
/*    if(this.props.soundValue === 1||this.props.soundValue === 3){
   this.SetAudio("SoundHelix-Song-5.mp3")
   this.PlayAudio()
   }
  if(this.props.soundValue === 3){
    this.PlayAudio("SoundHelix-Song-3.mp3")
   }
   if(this.props.soundValue === 4){
    this.PlayAudio("SoundHelix-Song-4.mp3")
   } 
   if(this.props.soundValue === 5){
  this.SetAudio("SoundHelix-Song-5.mp3")
   } */
}
    SetAudio(link){
        testAudio = new Audio(
            `${link}`
          );
    }
     
    PlayAudio(){
               
      testAudio.play();
      console.log("I am playing")
    }
  

  render() {
      
    return (
      <div>
       {this.HandlerAudio()}
      </div>
    );
  }
}

export default Sounds;
