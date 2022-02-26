import { createSelector } from '@reduxjs/toolkit'
import { movesAdapter } from './Move.reducer'

export const selectAllMoves = movesAdapter.getSelectors(state => state.moves).selectAll
export const selectMovesId = movesAdapter.getSelectors(state => state.moves).selectIds
export const selectMoveById = movesAdapter.getSelectors(state => state.moves).selectById

export const selectMovesFromPlayer = createSelector(
    [selectAllMoves, (state, fromPlayerId) => fromPlayerId],
    (moves, fromPlayerId) => moves.filter(move => move.fromPlayerId === fromPlayerId))
export const selectMovesToPlayer = createSelector(
    [selectAllMoves, (state, toPlayerId) => toPlayerId],
    (moves, toPlayerId) => moves.filter(move => move.toPlayerId === toPlayerId))
export const selectMovesFromRegion = createSelector(
    [selectAllMoves, (state, fromRegionId) => fromRegionId],
    (moves, fromRegionId) => moves.filter(move => move.fromRegionId === fromRegionId))
export const selectMovesToRegion = createSelector(
    [selectAllMoves, (state, toRegionId) => toRegionId],
    (moves, toRegionId) => moves.filter(move => move.toRegionId === toRegionId))

export const selectFromPlayerIdOfMove = createSelector(
    [selectMoveById],
    (move) => move.fromPlayerId)
export const selectToPlayerIdOfMove = createSelector(
    [selectMoveById],
    (move) => move.toPlayerId)
export const selectFromRegionIdOfMove = createSelector(
    [selectMoveById],
    (move) => move.fromRegionId)
export const selectToRegionIdOfMove = createSelector(
    [selectMoveById],
    (move) => move.toRegionId)
export const selectPositionOfMove = createSelector(
    [selectMoveById],
    (move) => move.position)
export const selectUnitsOfMove = createSelector(
    [selectMoveById],
    (move) => move.units)