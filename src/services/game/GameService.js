import { declareIfCurrentPlayerLost, declareIfGameFinish } from "./ResultUpdater"
import { updateUnits } from "./UnitsUpdater"
import { updateMoves } from "./MovesUpdater"
import { updateBots, createMove } from "./BotsUpdater"

export {
    declareIfCurrentPlayerLost,
    declareIfGameFinish,
    updateUnits,
    updateMoves,
    updateBots,
    createMove
}