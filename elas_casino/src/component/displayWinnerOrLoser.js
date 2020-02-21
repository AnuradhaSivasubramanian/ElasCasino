import React, { Component } from "react";
import Axios from "axios";
import "./scss/Winner.scss";

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
    this.APIWinnerOrLoser();
  }

  decidetheWinner() {
    if (this.props.result === 5) {
      this.setState({ WinnerOrCry: "cry" });
    } else {
      this.setState({ WinnerOrCry: "Winner" });
    }
  }

  APIWinnerOrLoser() {
    Axios.get(
      `https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=${this.state.WinnerOrCry}&rating=G
            `
    ).then(response =>
      this.setState({ displayImage: response.data.data.images.original.url })
    );
  }

  unmount() {
    this.setState({ flag: true });
  }

  render() {
    return (
      <section className={this.state.flag === false ? "blur" : "display_none "}>
        <div className="display_flex">
          <img src={this.state.displayImage} alt="" className="winner_img" />
          <div className="display_block">
            <h1 className="winner_h1">
              {this.state.WinnerOrCry === "Winner" ? "You won!!" : "You lost!!"}
            </h1>
            <p className="winner_p">
              {" "}
              {this.state.WinnerOrCry === "Winner"
                ? "Winner Winner Chickens for dinner. Congratulations you won the match!"
                : "  Kuan Kuan Kuan. You lost the game, but DON'T CRY you can keep playing it!"}
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

export default DisplayWinnerOrLoser;
