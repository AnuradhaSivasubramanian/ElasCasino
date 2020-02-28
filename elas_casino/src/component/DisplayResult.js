import React, { Component } from "react";
import Axios from "axios";
import "./scss/DisplayWinnerOrLoser.scss";
import GiveTheResult from "./GiveTheResult";

class DisplayResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      WinnerOrCry: "",
      displayImage: ""
    };
  }
  componentDidMount() {
    this.decidetheWinner();
  }

  decidetheWinner() {
    if (this.props.result === 5) {
      const status = "cry";
      this.APIWinnerOrLoser(status);
    } else if (this.props.result === 4) {
      const status = "Claps";
      this.APIWinnerOrLoser(status);
      this.setState({ WinnerOrCry: "Winner" });
    }
  }

  APIWinnerOrLoser(status) {
    if (this.props.result === 5 || this.props.result === 4) {
      Axios.get(
        `https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=${status}&rating=G
          `
      )
        .then(response => {
          if (this.props.result === 5 || this.props.result === 4) {
            console.log(response.data);
            this.setState({
              displayImage: response.data.data.images.original.url
            });
          }
        })
        .catch(error => console.error(`something went wrong: ${error}`));
    }
  }

  componentWillUnmount() {
    this.props.actiondisplay();
  }

  render() {
    return (
      <section className="blur">
        <div className="display_flex">
          <img
            src={this.state.displayImage}
            alt=" Gif"
            className="winner_img"
          />
          <div className="display_block">
            <GiveTheResult WinnerOrCry={this.state.WinnerOrCry} />
          </div>
          <button onClick={this.props.actiondisplay} className="winner_button">
            Close
          </button>
        </div>
      </section>
    );
  }
}

export default DisplayResult;
