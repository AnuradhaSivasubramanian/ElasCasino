import React from "react";
import "./Sounds";
//import Sound from "react-sound"
let testAudio =new Audio("")
class Sounds extends React.Component {
   
   HandlerAudio(){
     /*   if(this.props.soundValue === 0){
    this.PlayAudio("SoundHelix-Song-1.mp3")
   } */
   if(this.props.soundValue === 1||this.props.soundValue === 3){
   this.SetAudio("SoundHelix-Song-5.mp3")
   this.PlayAudio()
   setTimeout(this.PauseSong,1000)
    
    }
  /*  if(this.props.soundValue === 3){
    this.PlayAudio("SoundHelix-Song-3.mp3")
   }
   if(this.props.soundValue === 4){
    this.PlayAudio("SoundHelix-Song-4.mp3")
   } */
   if(this.props.soundValue === 5){
  this.SetAudio("SoundHelix-Song-5.mp3")
   }
}
    SetAudio(link){
        testAudio = new Audio(
            `https://www.soundhelix.com/examples/mp3/${link}`
          );
    }
     
    PlayAudio(){
       
        
      testAudio.play();
      console.log("I am playing")
    }
    PauseSong(){
       testAudio.currentTime=0
       testAudio.pause()

         console.log("I am stopping")
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
