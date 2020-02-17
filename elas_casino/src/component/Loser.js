import React, {Component} from 'react'
import Axios from 'axios'
import './Winner.css'


class Loser extends Component{
   constructor(props){
       super(props)
       this.state={
    displayImage: " "
}
this.displayWinner=this.displayWinner.bind(this)
} 
    componentDidMount() {
    this.displayWinner()
    }
    displayWinner(){
        Axios.get(`https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=cry&rating=G
            `)
            .then(response =>
                this.setState({displayImage:response.data.data.images.original.url})              )
    }
    
 render(){
     return(
<div className="display_flex ">
    <img src={this.state.displayImage} alt=""/>
         <div className="display_block">
        <h1>You lost!!</h1>
    <p> Kuan Kuan Kuan. 
       You lost the game, but DON'T CRY you can keep playing it!</p>
        <button>Close</button>
        </div>
       
</div>


     )
 }

}

export default Loser

