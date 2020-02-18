import React, { Component } from "react";
import Axios from "axios";
import "./Winner.scss";

class Winner extends Component {
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
      `https://api.giphy.com/v1/gifs/random?api_key=Ja5BUp5RkITwVfo5PIjYLrtoNWHb1lVp&tag=Winner&rating=G
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
            <h1 className="winner_h1">You won!!</h1>
            <p className="winner_p">
              {" "}
              Winner Winner Chickens for dinner. Congratulations you won the
              match!
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

export default Winner;
