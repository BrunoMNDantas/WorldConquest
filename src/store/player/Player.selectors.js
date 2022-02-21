import { createSelector } from '@reduxjs/toolkit'
import { playersAdapter } from './Player.reducer'

export const selectAllPlayers = playersAdapter.getSelectors(state => state.players).selectAll
export const selectPlayersIds = playersAdapter.getSelectors(state => state.players).selectIds
export const selectPlayerById = playersAdapter.getSelectors(state => state.players).selectById

export const selectPlayerWithInitialCountry = createSelector(
    [selectAllPlayers, (state, initialCountryId) => initialCountryId],
    (players, initialCountryId) => players.filter(player => player.initialCountry === initialCountryId))