import React from "react";

import Home from "./component/Home";
import AvatarList from "./component/AvatarList";
/* import DisplayWinnerOrLoser from "./component/DisplayWinnerOrLoser";
import GameTable from "./component/GameTable"; */
class App extends React.Component {
  render() {
    return (
      <main>
        <AvatarList />
      </main>
    );
  }
}

export default App;
