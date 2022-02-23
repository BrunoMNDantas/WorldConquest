import { declareIfCurrentPlayerLost, declareIfGameFinish } from "./ResultUpdater"
import { updateUnits } from "./UnitsUpdater"
import { updateAttacks } from "./AttacksUpdater"
import { updateBots, createAttack } from "./BotsUpdater"

export {
    declareIfCurrentPlayerLost,
    declareIfGameFinish,
    updateUnits,
    updateAttacks,
    updateBots,
    createAttack
}