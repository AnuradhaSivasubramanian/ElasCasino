import React, { Component } from "react";
import Axios from "axios";
import "./Winner.scss";

class Loser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayImage: " ",
      flag: false
    };
    this.displayWinner = this.displayWinner.bind(this);
    this.unmount = this.unmount.bind(this);
  }
  componentDidMount() {
    this.displayWinner();
  }

  displayWinner() {
    Axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=cry&rating=G
            `
    ).then(response =>
      this.setState({ displayImage: response.data.data.images.original.url })
    );
  }

  unmount() {
    this.setState({ flag: true });
    console.log(this.state.flag);
  }

  render() {
    return (
      <section className={this.state.flag === false ? "blur" : "display_none"}>
        <div className="display_flex" >
        <img src={this.state.displayImage} alt="" className="winner_img" />
        <div className="display_block">
        <h1 className="winner_h1">You lost!!</h1>
        <p className="winner_p">
        
          {" "}
          Kuan Kuan Kuan. You lost the game, but DON'T CRY you can keep playing
          it!
        </p>
        </div>
        <button onClick={this.unmount} className="winner_button">
          Close
        </button>
      </div>
      </section>
    );
  }
}

export default Loser;
