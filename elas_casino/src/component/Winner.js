import React, {Component} from 'react'
import Axios from 'axios'
import './Winner.scss'


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
    <img src={this.state.displayImage} alt="" className="winner_img"/>
        <h1 className="winner_h1">You won!!</h1>
    <p className="winner_p"> Winner Winner Chickens for dinner. 
        Congratulations you won the match!</p>
        <button className="winner_button">Close</button>
       
</div>


     )
 }

}

export default Winner

