import store from '../../store/store'

import { updateRegionUnits } from '../../store/region/Region.actions'
import { addMove } from '../../store/move/Move.actions'

import { selectAllRegions, selectRegionsOfPlayer } from '../../store/region/Region.selectors'
import { selectCountryById } from '../../store/country/Country.selectors'
import { selectCurrentPlayerId } from '../../store/game/Game.selectors'
import { selectMovesFromPlayer } from '../../store/move/Move.selectors'
import { selectAllPlayers } from '../../store/player/Player.selectors'

import { buildMove } from '../move/MoveService'


export const updateBots = () => {
    const currentPlayerId = selectCurrentPlayerId(store.getState())
    const bots = selectAllPlayers(store.getState()).filter(player => player.id !== currentPlayerId)

    bots.forEach(bot => {
        let aiLevel = bot.aiLevel

        switch (aiLevel) {
            case 1: updateBotAsDummy(bot); break;
            case 2: updateBotAsNormal(bot); break;
            case 3: updateBotAsExpert(bot); break;
            default: window.alert("Unknown aiLevel: " + aiLevel)
        }
    })
}

export function updateBotAsDummy(bot) {
    let regions = selectAllRegions(store.getState())

    let botRegions = selectRegionsOfPlayer(store.getState(), bot.id)

    if(botRegions.length === 0)//Bot doesn't have regions, there is no action to take
        return;

    let othersRegions = regions.filter(region => region.playerId !== bot.id)

    if(othersRegions.length === 0)//There are no regions to moves
        return;

    let botMoves = selectMovesFromPlayer(store.getState(), bot.id)

    if(botMoves.length !== 0)//Bot has moves in progress. Wait to for moves to finish to decide the nest step
        return;
        
    let botRegionWithMostUnits = botRegions.sort((a,b) => a.units - b.units)[botRegions.length-1]
    let othersRegionWithLessUnits = othersRegions.sort((a,b) => a.units - b.units)[0]

    createMove(botRegionWithMostUnits, othersRegionWithLessUnits)
}

export function updateBotAsNormal(bot) {
    let regions = selectAllRegions(store.getState())

    let botRegions = selectRegionsOfPlayer(store.getState(), bot.id)

    if(botRegions.length === 0)//Bot doesn't have regions, there is no action to take
        return;

    let othersRegions = regions.filter(region => region.playerId !== bot.id)

    if(othersRegions.length === 0)//There are no regions to moves
        return;

    let botMoves = selectMovesFromPlayer(store.getState(), bot.id)

    if(botMoves.length !== 0)//Bot has moves in progress. Wait to for moves to finish to decide the nest step
        return;
        
    let botRegionWithMostUnits = botRegions.sort((a,b) => a.units - b.units)[botRegions.length-1]
    let othersRegionWithLessUnits = othersRegions.sort((a,b) => a.units - b.units)[0]

    if(botRegionWithMostUnits.units > othersRegionWithLessUnits.units) {
        createMove(botRegionWithMostUnits, othersRegionWithLessUnits)
    }
}

export function updateBotAsExpert(bot) {
    let regions = selectAllRegions(store.getState())

    let botRegions = selectRegionsOfPlayer(store.getState(), bot.id)

    if(botRegions.length === 0)//Bot doesn't have regions, there is no action to take
        return;

    let othersRegions = regions.filter(region => region.playerId !== bot.id)

    if(othersRegions.length === 0)//There are no regions to moves
        return;

    let botMoves = selectMovesFromPlayer(store.getState(), bot.id)

    if(botMoves.length !== 0)//Bot has moves in progress. Wait to for moves to finish to decide the nest step
        return;
        
    let botRegionWithMostUnits = botRegions.sort((a,b) => a.units - b.units)[botRegions.length-1]
    let othersRegionWithLessUnits = othersRegions.sort((a,b) => a.units - b.units)[0]

    if(botRegionWithMostUnits.units > othersRegionWithLessUnits.units) {
        createMove(botRegionWithMostUnits, othersRegionWithLessUnits)
    } else {
        let botWaekRegions = botRegions.filter(region => region.id !== botRegionWithMostUnits.id)
        botWaekRegions.forEach(weakRegion => {
            createMove(weakRegion, botRegionWithMostUnits)
        })
    }
}

export function createMove(fromRegion, toRegion) {
    let fromCountry = selectCountryById(store.getState(), fromRegion.countryId)
    
    let move = buildMove(fromRegion, toRegion, fromCountry)
    store.dispatch(addMove(move))
    
    store.dispatch(updateRegionUnits({regionId: fromRegion.id, units: 0}))
}