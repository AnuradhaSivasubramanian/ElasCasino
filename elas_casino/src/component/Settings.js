import React from "react";

import "./Settings.css";
import AvatarList from "./AvatarList";

class Settings extends React.Component {

   render() {
    return (
      <section
        className={
          this.props.settingsMount ? "settings_section" : "display_none"
        }
      >
        <div className="settings_div">
          <section className="container_name">
          <h1>Game Settings</h1>
          </section>
          <main className="container_middle">

          <div className="toggle_container">
            <div className="toggle1_div">
              Half Deck
              <label className="switch">
                <input type="checkbox" onChange={this.props.selectDeck} />
                <span className="slider round"></span>
              </label>
              Full Deck
            </div>
            <div className="toggle2_div">
              Easy Level
              <label className="switch">
                <input type="checkbox" onChange={this.props.selectLevel} />
                <span className="slider round"></span>
              </label>
              Hard Level
            </div>
          </div>


 <div className="settings_home_row">
        <figure className="pointer avatar-default">
      <img src={this.props.selectedAvatar} id="avatar-default"alt="avatar" onClick={this.props.onClick}/>
      <figurecaption id="avatar-caption">Click to choose your Avatar</figurecaption>
      </figure>
      {this.props.mountAvatar===true? <AvatarList avatarList={this.props.avatarList} onClick={this.props.onClick }  />
      :null}  
      <div className="input_settings">
      <label htmlFor="name" > Type your name </label> 
      <input  onChange={this.props.onchange} type="text" placeholder="John Doe" />
      </div> 
</div>
</main>
<section className="container_button">
          <button className="pointer" onClick={this.props.action}>
            CLOSE
          </button> 
          </section>
          
        </div>
      </section>
    );
  }
}

export default Settings;
