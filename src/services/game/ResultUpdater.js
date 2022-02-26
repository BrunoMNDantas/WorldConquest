import store from '../../store/store'

import { setCurrentPlayerLost, setWinner } from '../../store/game/Game.actions'

import { selectAllRegions } from '../../store/region/Region.selectors'
import { selectCurrentPlayerId, selectCurrentPlayerLost, selectWinner } from '../../store/game/Game.selectors'
import { selectAllMoves } from '../../store/move/Move.selectors'


export function declareIfCurrentPlayerLost() {
    if(selectCurrentPlayerLost(store.getState())) {//Already declared
        return false
    }

    if(hasCurrentPlayerLost()) {
        store.dispatch(setCurrentPlayerLost(true))
        return true
    }

    return false
}

export function hasCurrentPlayerLost() {
    let currentPlayerId = selectCurrentPlayerId(store.getState())
    let regions = selectAllRegions(store.getState())

    if(regions.some(region => region.playerId === currentPlayerId)) {//Current player has regions
        return false
    } else {//Current player doesn't have regions
        let moves = selectAllMoves(store.getState())

        if(moves.some(move => move.fromPlayerId === currentPlayerId)) {//Current player has moves in progress
            return false
        } else {//Current player doesn't have moves in progress
            return true
        }
    }
}

export function declareIfGameFinish() {
    if(selectWinner(store.getState())) {//Already declared
        return false
    }

    if(hasGameFinished()) {
        let winner = getWinner()
        store.dispatch(setWinner(winner))
        return true
    }

    return false
}

export function getWinner() {
    //Winner controls all regions so we just need to pick the first region as example
    let regions = selectAllRegions(store.getState())
    let region = regions[0]
    return region.playerId
}

export function hasGameFinished() {
    let regions = selectAllRegions(store.getState())

    if(regions.some(region => region.playerId === undefined || region.playerId == null)) {//If there are regions without player, the game hasn't finished
        return false
    } else {
        let distinct = (value, index, self) => self.indexOf(value) === index
        let regionsPlayers = regions.map(region => region.playerId).filter(distinct)

        if(regionsPlayers.length > 1) {//There are multiple players with regions
            return false
        } else {//There is only one player with regions
            let player = regionsPlayers[0]
            let moves = selectAllMoves(store.getState())
            let movesFromPlayers = moves.map(move => move.fromPlayerId).filter(distinct)
    
            if(movesFromPlayers.every(playerId => playerId === player.id)) {//All moves are from the player that controlls all regions
                return true;
            } else {//There are moves that came from other players
                return false;
            }
        }
    }
}