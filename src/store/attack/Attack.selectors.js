import { createSelector } from '@reduxjs/toolkit'
import { attacksAdapter } from './Attack.reducer'

export const selectAllAttacks = attacksAdapter.getSelectors(state => state.attacks).selectAll
export const selectAttacksId = attacksAdapter.getSelectors(state => state.attacks).selectIds
export const selectAttackById = attacksAdapter.getSelectors(state => state.attacks).selectById

export const selectAttacksFromPlayer = createSelector(
    [selectAllAttacks, (state, fromPlayerId) => fromPlayerId],
    (attacks, fromPlayerId) => attacks.filter(attack => attack.fromPlayerId === fromPlayerId))
export const selectAttacksToPlayer = createSelector(
    [selectAllAttacks, (state, toPlayerId) => toPlayerId],
    (attacks, toPlayerId) => attacks.filter(attack => attack.toPlayerId === toPlayerId))
export const selectAttacksFromRegion = createSelector(
    [selectAllAttacks, (state, fromRegionId) => fromRegionId],
    (attacks, fromRegionId) => attacks.filter(attack => attack.fromRegionId === fromRegionId))
export const selectAttacksToRegion = createSelector(
    [selectAllAttacks, (state, toRegionId) => toRegionId],
    (attacks, toRegionId) => attacks.filter(attack => attack.toRegionId === toRegionId))

export const selectFromPlayerIdOfAttack = createSelector(
    [selectAttackById],
    (attack) => attack.fromPlayerId)
export const selectToPlayerIdOfAttack = createSelector(
    [selectAttackById],
    (attack) => attack.toPlayerId)
export const selectFromRegionIdOfAttack = createSelector(
    [selectAttackById],
    (attack) => attack.fromRegionId)
export const selectToRegionIdOfAttack = createSelector(
    [selectAttackById],
    (attack) => attack.toRegionId)
export const selectPositionOfAttack = createSelector(
    [selectAttackById],
    (attack) => attack.position)
export const selectUnitsOfAttack = createSelector(
    [selectAttackById],
    (attack) => attack.units)