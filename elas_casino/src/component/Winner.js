import React, {Component} from 'react'
import Axios from 'axios'
import './Winner.css'


class Winner extends Component{
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
        Axios.get(`https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=Winner&rating=G
            `)
            .then(response =>
                this.setState({displayImage:response.data.data.images.original.url})              )
    }
    
 render(){
     return(
<div className="display_flex ">
    <img src={this.state.displayImage} alt=""/>
         <div className="display_block">
        <h1>You won!!</h1>
    <p> Winner Winner Chickens for dinner. 
        Congratulations you won the match!</p>
        <button>Close</button>
        </div>
       
</div>


     )
 }

}

export default Winner

