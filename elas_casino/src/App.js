import React from "react";
import Home from "./component/Home";
import "./component/scss/App.scss"
import TurnYourPhone from "./component/TurnYourPhone"


class App extends React.Component {


  render() {
    return (
      <main>
        
    <div id="orientation">
        <Home />
      </div>
      <div id="use-landscape">
        <TurnYourPhone/>
      </div> 
      </main>
    );
  }
}

export default App;
