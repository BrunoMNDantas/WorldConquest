import { MOVES_UPDATE_INTERVAL, UNITS_UPDATE_INTERVAL, BOTS_UPDATE_INTERVAL, MONEY_UPDATE_INTERVAL, HOUSE_LEVELS, BANK_LEVELS, MOVE_LEVELS } from '../../Constants'

import store from '../../store/store'

import { setSelectedRegionId } from '../../store/game/Game.actions'

import { selectRegionById } from '../../store/region/Region.selectors'
import { selectCurrentPlayerId, selectSelectedRegionId } from '../../store/game/Game.selectors';

import { declareIfCurrentPlayerLost, declareIfGameFinish, updateUnits, updateMoves, updateBots, createMove, updateMoney } from './GameService'
import { updateRegionHouseLevel, updateRegionBankLevel, updateRegionMoveLevel, updateRegionMoney } from '../../store/region/Region.actions';

let updateUnitsInterval
let updateMovesInterval
let updateBotsInterval
let updateMoneyInterval

export const runEngine = () => {
    updateUnitsInterval = setInterval(() => {    
        updateUnits()
        checkGameFinishAndPlayerLost()
    }, UNITS_UPDATE_INTERVAL)

    updateMovesInterval = setInterval(() => {    
        updateMoves()
        checkGameFinishAndPlayerLost()
    }, MOVES_UPDATE_INTERVAL)

    updateBotsInterval = setInterval(() => {
        updateBots()
        checkGameFinishAndPlayerLost()
    }, BOTS_UPDATE_INTERVAL)

    updateMoneyInterval = setInterval(() => {
        updateMoney()
        checkGameFinishAndPlayerLost()
    }, MONEY_UPDATE_INTERVAL)
}

const checkGameFinishAndPlayerLost = () => {
    declareIfCurrentPlayerLost()

    if(declareIfGameFinish()) {
        clearInterval(updateUnitsInterval)
        clearInterval(updateMovesInterval)
        clearInterval(updateBotsInterval)
        clearInterval(updateMoneyInterval)
    }
}

export function selectRegion(regionId) {
    let selectedRegionId = selectSelectedRegionId(store.getState())

    if(regionId === selectedRegionId) {
        store.dispatch(setSelectedRegionId(null))
    } else {
        let selectedRegion = selectRegionById(store.getState(), selectedRegionId)
        let region = selectRegionById(store.getState(), regionId)
        let currentPlayerId = selectCurrentPlayerId(store.getState())

        if(!selectedRegionId) {
            if(region.playerId === currentPlayerId) {
                store.dispatch(setSelectedRegionId(regionId))
            }
        } else {
            if(selectedRegion.playerId !== currentPlayerId) {
                store.dispatch(setSelectedRegionId(null))
            } else {
                createMove(selectedRegion, region)
                store.dispatch(setSelectedRegionId(null))
            }
        }
    } 
}

export function increaseHouseLevel(regionId) {
    let region = selectRegionById(store.getState(), regionId)
    let nextLevel = HOUSE_LEVELS[region.houseLevel.level + 1]
    let money = region.money - nextLevel.price

    store.dispatch(updateRegionHouseLevel({regionId, level: nextLevel}))
    store.dispatch(updateRegionMoney({regionId, money}))
}

export function increaseBankLevel(regionId) {
    let region = selectRegionById(store.getState(), regionId)
    let nextLevel = BANK_LEVELS[region.bankLevel.level + 1]
    let money = region.money - nextLevel.price

    store.dispatch(updateRegionBankLevel({regionId, level: nextLevel}))
    store.dispatch(updateRegionMoney({regionId, money}))
}

export function increaseMoveLevel(regionId) {
    let region = selectRegionById(store.getState(), regionId)
    let nextLevel = MOVE_LEVELS[region.moveLevel.level + 1]
    let money = region.money - nextLevel.price

    store.dispatch(updateRegionMoveLevel({regionId, level: nextLevel}))
    store.dispatch(updateRegionMoney({regionId, money}))
}