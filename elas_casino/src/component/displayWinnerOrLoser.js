import React, { Component } from "react";
import Axios from "axios";
import "./scss/DisplayWinnerOrLoser.scss";
import GiveTheResult from "./GiveTheResult";

class DisplayWinnerOrLoser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WinnerOrCry: "",
      displayImage: " ",
      flag: false
    };
    this.unmount = this.unmount.bind(this);
  }
  componentDidMount() {
    this.decidetheWinner();
    //this.APIWinnerOrLoser();
  }

  decidetheWinner() {
    if (this.props.result === 5) {
      // this.APIWinnerOrLoser goes here
      const status = "cry"
      this.APIWinnerOrLoser(status)
    } else {
      const status = "Claps"
      this.APIWinnerOrLoser(status)
      this.setState({ WinnerOrCry: "Winner" });
    }
  }

  APIWinnerOrLoser(status) {
    Axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=${status}&rating=G
            `
    ).then(response => {
      console.log(response.data);
      this.setState({ displayImage: response.data.data.images.original.url });
    });
  }

  unmount() {
    this.setState({ flag: true });
  }

  render() {
    return (
      <section className={this.state.flag === false ? "blur" : "display_none "}>
        <div className="display_flex">
          <img
            src={this.state.displayImage}
            alt=" Gif"
            className="winner_img"
          />
          <div className="display_block">
            <GiveTheResult WinnerOrCry={this.state.WinnerOrCry} />
          </div>
          <button onClick={this.unmount} className="winner_button">
            Close
          </button>
        </div>
      </section>
    );
  }
}

export default DisplayWinnerOrLoser;
