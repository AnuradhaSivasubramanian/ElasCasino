import React from "react";
import "./AvatarImplement.scss";

class AvatarImplement extends React.Component {
  state = { isSelected: this.props.selected };

  handleClick = () => {
    this.setState({ isSelected: !this.state.isSelected });
  };

  render() {
    return (
      
      <section className="container">
        
         
          <ul className="imgContainer">
          <li className="imgItem"><img src={this.props.image} onClick={this.handleClick} alt="avatar" className="avatar" /></li>
          </ul>
      
      </section>
     
    );
  }
}

export default AvatarImplement;
