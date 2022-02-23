import store from '../../store/store'

import { setSelectedRegionId } from '../../store/game/Game.actions'
import { updateRegionUnits } from '../../store/region/Region.actions'
import { addAttack } from '../../store/attack/Attack.actions'

import { selectAllRegions, selectRegionsOfPlayer } from '../../store/region/Region.selectors'
import { selectCountryById } from '../../store/country/Country.selectors'
import { selectCurrentPlayerId } from '../../store/game/Game.selectors'
import { selectAttacksFromPlayer } from '../../store/attack/Attack.selectors'
import { selectAllPlayers } from '../../store/player/Player.selectors'

import { buildAttack } from '../attack/AttackService'


export const updateBots = () => {
    const currentPlayerId = selectCurrentPlayerId(store.getState())
    const bots = selectAllPlayers(store.getState()).filter(player => player.id !== currentPlayerId)

    bots.forEach(bot => {
        let regions = selectAllRegions(store.getState())

        let botRegions = selectRegionsOfPlayer(store.getState(), bot.id)

        if(botRegions.length === 0)//Bot doesn't have regions, there is no action to take
            return;

        let othersRegions = regions.filter(region => region.playerId !== bot.id)

        if(othersRegions.length === 0)//There are no regions to attacks
            return;

        let botAttacks = selectAttacksFromPlayer(store.getState(), bot.id)

        if(botAttacks.length !== 0)//Bot has attacks in progress. Wait to for attacks to finish to decide the nest step
            return;
            
        let botRegionWithMostUnits = botRegions.sort((a,b) => a.units - b.units)[botRegions.length-1]
        let othersRegionWithLessUnits = othersRegions.sort((a,b) => a.units - b.units)[0]

        if(botRegionWithMostUnits.units > othersRegionWithLessUnits.units) {
            createAttack(botRegionWithMostUnits, othersRegionWithLessUnits)
        } else {
            let botWaekRegions = botRegions.filter(region => region.id !== botRegionWithMostUnits.id)
            botWaekRegions.forEach(weakRegion => {
                createAttack(weakRegion, botRegionWithMostUnits)
            })
        }
    })
}

export function createAttack(fromRegion, toRegion) {
    let fromCountry = selectCountryById(store.getState(), fromRegion.countryId)
    
    let attack = buildAttack(fromRegion, toRegion, fromCountry)
    store.dispatch(addAttack(attack))
    
    store.dispatch(updateRegionUnits({regionId: fromRegion.id, units: 0}))

    store.dispatch(setSelectedRegionId(null))
}