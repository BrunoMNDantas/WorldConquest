import { ATTACKS_UPDATE_INTERVAL, UNITS_UPDATE_INTERVAL, BOTS_UPDATE_INTERVAL } from '../../Constants'

import store from '../../store/store'

import { updateRegionUnitsAmmount, updateRegionPlayerId } from '../../store/region/Region.actions'
import { addAttack, removeAttack, updateAttackPosition } from '../../store/attack/Attack.actions'
import { setResult, setSelectedRegionId } from '../../store/game/Game.actions'

import { selectAllAttacks, selectAttacksFromPlayer } from '../../store/attack/Attack.selectors'
import { selectCountryById } from '../../store/country/Country.selectors'
import { selectAllPlayers } from '../../store/player/Player.selectors'
import { selectAllRegions, selectRegionById, selectRegionsOfPlayer } from '../../store/region/Region.selectors'
import { selectCurrentPlayerId, selectSelectedRegionId, selectResult } from '../../store/game/Game.selectors';

import { buildAttack, getNewPosition, arrived } from '../attack/AttackService'
import { calculateUnitsAmmount } from '../region/RegionService'


export const runEngine = () => {
    console.log("--Scheduling Engine--")

    setInterval(() => {    
        updateUnits()
    }, UNITS_UPDATE_INTERVAL)

    setInterval(() => {    
        updateAttacks()
    }, ATTACKS_UPDATE_INTERVAL)

    setInterval(() => {
        updateBots()
    }, BOTS_UPDATE_INTERVAL)
}

const updateUnits = () => {
    console.log("--Updating Regions Units--")
    
    let regions = selectAllRegions(store.getState())

    regions.forEach(region => {
        let ammount = calculateUnitsAmmount(region)
        store.dispatch(updateRegionUnitsAmmount({regionId: region.id, ammount}))
    })

    let result = selectResult(store.getState())

    if(result)
        return
        
    let currentPlayerId = selectCurrentPlayerId(store.getState())
    let currentPlayerRegions = selectRegionsOfPlayer(store.getState(), currentPlayerId)
    let othersAttacks = selectAllAttacks(store.getState()).filter(attack => attack.fromPlayerId !== currentPlayerId)
    let currentPlayerAttacks = selectAttacksFromPlayer(store.getState(), currentPlayerId)
    
    if(currentPlayerRegions.length === regions.length && othersAttacks.length === 0)
        store.dispatch(setResult({ won: true }))
    else if(currentPlayerRegions.length === 0 && currentPlayerAttacks.length === 0)
        store.dispatch(setResult({ won: false }))
}

const updateAttacks = () => {
    console.log("--Updating Attacks--")

    let attacks = selectAllAttacks(store.getState())
    attacks.forEach(attack => {
        let toRegion = selectRegionById(store.getState(), attack.toRegionId)
        let toCountry = selectCountryById(store.getState(), toRegion.countryId)
        let fromPlayerId = attack.fromPlayerId 
        let toPlayerId = toRegion.playerId
        let currentPosition = attack.position

        if(arrived(currentPosition, toCountry.capital.center)) {
            let regionUnits = toRegion.units.ammount
            let attackUnits = attack.units

            if(toPlayerId === fromPlayerId) {
                let ammount = regionUnits + attackUnits
                store.dispatch(updateRegionUnitsAmmount({regionId: toRegion.id, ammount}))
            } else if(regionUnits >= attackUnits) {
                let ammount = regionUnits - attackUnits
                store.dispatch(updateRegionUnitsAmmount({regionId: toRegion.id, ammount}))
            } else {
                let ammount = attackUnits - regionUnits
                let playerId = attack.fromPlayerId
                store.dispatch(updateRegionUnitsAmmount({regionId: toRegion.id, ammount}))
                store.dispatch(updateRegionPlayerId({regionId: toRegion.id, playerId}))
            }
            
            store.dispatch(removeAttack(attack.id))
        } else {
            let newPosition = getNewPosition(currentPosition, toCountry.capital.center)
            store.dispatch(updateAttackPosition({attackId: attack.id, position: newPosition}))
        }
    })
}

const updateBots = () => {
    console.log("--Updating Bots Units--")

    const currentPlayerId = selectCurrentPlayerId(store.getState())
    const bots = selectAllPlayers(store.getState()).filter(player => player.id !== currentPlayerId)

    bots.forEach(bot => {
        let regions = selectAllRegions(store.getState())
        let attacks = selectAllAttacks(store.getState())
        let botRegions = selectRegionsOfPlayer(store.getState(), bot.id)
        let othersRegions = regions.filter(region => region.playerId !== bot.id)
        let botAttacks = selectAttacksFromPlayer(store.getState(), bot.id)

        if(botRegions.length == 0 || othersRegions.length == 0 || botAttacks.length !== 0)
            return;

        let botRegionWithMostUnits = botRegions.sort((a,b) => a.units.ammount - b.units.ammount)[botRegions.length-1]
        let othersRegionWithLessUnits = othersRegions.sort((a,b) => a.units.ammount - b.units.ammount)[0]

        if(botRegionWithMostUnits.units.ammount > othersRegionWithLessUnits.units.ammount) {
            createAttack(botRegionWithMostUnits, othersRegionWithLessUnits)
        } else {
            let botWaekRegions = botRegions.filter(region => region.id !== botRegionWithMostUnits.id)
            botWaekRegions.forEach(weakRegion => {
                createAttack(weakRegion, botRegionWithMostUnits)
            })
        }
    })
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
                createAttack(selectedRegion, region)
                store.dispatch(setSelectedRegionId(null))
            }
        }
    } 
}

function createAttack(fromRegion, toRegion) {
    let fromCountry = selectCountryById(store.getState(), fromRegion.countryId)
    
    let attack = buildAttack(fromRegion, toRegion, fromCountry)
    store.dispatch(addAttack(attack))
    
    store.dispatch(updateRegionUnitsAmmount({regionId: fromRegion.id, ammount: 0}))

    store.dispatch(setSelectedRegionId(null))
}