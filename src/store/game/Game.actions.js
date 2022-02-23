import { gameSlice } from "./Game.reducer";

export const {
    setCurrentPlayerId,
    setSelectedRegionId,
    setWinner,
    setCurrentPlayerLost
} = gameSlice.actions

