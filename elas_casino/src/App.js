import React from "react";
import Ligia from "./component/GameLogic";
import Winner from "./component/Winner"
import Loser from "./component/Loser"
import GameTable from "./component/GameTable"
class App extends React.Component {
  render() {
    return (
      <main>
        <GameTable/>
      </main>
    );
  }
}

export default App;
