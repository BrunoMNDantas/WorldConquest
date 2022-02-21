import React from "react"
import { useSelector } from "react-redux"
import { selectCurrentPlayerId } from "../../store/game/Game.selectors"
import Configuration from "../configuration/Configuration"
import Game from "../game/Game"

const App = () => {
  console.log("::App::")

  const currentPlayerId = useSelector(selectCurrentPlayerId)

  return currentPlayerId ? <Game/> : <Configuration/>;
}

export default App;