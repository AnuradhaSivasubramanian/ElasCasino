import React from "react";
import "./Home.css";
import Rules from "./Rules";
import GameTable from "./GameTable";
import Settings from "./Settings";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesMount: false,
      playMount: false,
      settingsMount: false,
      isFullDeck: false,
      isLevelHard: true,
    
      avatarList :[ {
        image:
          "https://api.adorable.io/avatars/158/abott@ab45t09ytiiip4l8le.io.png",
        
      },
    
      {
        image:
          "https://api.adorable.io/avatars/146/abott@ab45t09ytiiiip4l8le.io.png",
        
      },
    
     
      {
        image: "https://api.adorable.io/avatars/285/abott@ab45y4l8lepink.io.png",
       
      },
    
      {
        image: "https://api.adorable.io/avatars/285/abott@ab45y4l8leoran.io.png",
        
      },
    
      {
        image:
          "https://api.adorable.io/avatars/285/abott@a5y4l8leor8iro7rmrng36n.io.png",
        
      },
    
      {
        image: "https://api.adorable.io/avatars/285/abott@a5irmrng36n.io.png",
        
      },
    
      {
        image: "https://api.adorable.io/avatars/285/abott@a51011jokopmin.io.png",
        
      },
    
      {
        image: "https://api.adorable.io/avatars/285/abott@a5mouth7.io.png",
        
      }],
        selectedAvatar:"",
        mountAvatar:false,
     playerName: "Player 1"
 }

    this.toggleRulesMount = this.toggleRulesMount.bind(this);
    this.togglePlayMount = this.togglePlayMount.bind(this);
    this.toggleSettingsMount = this.toggleSettingsMount.bind(this);
    this.toggleDeckSize = this.toggleDeckSize.bind(this);
    this.toggleLevel = this.toggleLevel.bind(this);
    this.handlerOnclick = this.handlerOnclick.bind(this);
    this.handlerOnChange = this.handlerOnChange.bind(this);

      };
      

    handlerOnclick(chosenAvatar){
      this.setState({selectedAvatar:chosenAvatar})
      this.setState({ mountAvatar: !this.state.mountAvatar});
    }

    handlerOnChange(e){
      this.setState({playerName:e.target.value})

    }
  toggleRulesMount() {
    this.setState({
      rulesMount: !this.state.rulesMount
    });
  }

  togglePlayMount() {
    this.setState({
      playMount: !this.state.playMount
    });
  }

  toggleSettingsMount() {
    this.setState({
      settingsMount: !this.state.settingsMount
    });
  }
  toggleDeckSize() {
    this.setState({
      isFullDeck: !this.state.isFullDeck
    });
  }
  toggleLevel() {
    this.setState({
      isLevelHard: !this.state.isLevelHard
    });
  }

  render() {
    return (
      <main className="home_container">
        <h1 className="home_container_h1">Ela’s casino</h1>
        <article>
          Are you ready to play Snap?
        </article>
        <div className="buttons_container">
          <button
            className="pointer home_container_button"
            onClick={this.toggleSettingsMount}
          >
            SETTINGS
          </button>
          <button
            className="pointer home_container_button"
            onClick={this.toggleRulesMount}
          >
            RULES
          </button>
          <button
            className="pointer home_container_button"
            onClick={this.togglePlayMount}
          >
            PLAY
          </button>
        </div>

        <div>
          {!this.state.rulesMount ? null : (
            <Rules
              action={this.toggleRulesMount}
              rulesMount={this.state.rulesMount}
            />
          )}
        </div>
        <div>
          {!this.state.playMount ? null : (
            <GameTable
              // action={this.togglePlayMount}
              onClick={this.togglePlayMount}
              playerName={this.state.playerName}
              avatar={this.state.selectedAvatar}
              playMount={this.state.playMount}
              selectLevel={this.state.isLevelHard}
              selectDeck={this.state.isFullDeck}
            />
          )}
        </div>

        <div>
          {!this.state.settingsMount ? null : (
            <Settings
             onchange={this.handlerOnChange} 
            avatarList={this.state.avatarList}
            mountAvatar={this.state.mountAvatar}
              onClick={this.handlerOnclick}
              action={this.toggleSettingsMount}
              selectDeck={this.toggleDeckSize}
              selectLevel={this.toggleLevel}
              settingsMount={this.state.settingsMount}
            />
          )}
        </div>
      </main>
    );
  }
}
export default Home;
