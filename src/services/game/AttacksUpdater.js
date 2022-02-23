import store from '../../store/store'

import { updateRegionUnits, updateRegionPlayerId } from '../../store/region/Region.actions'
import { removeAttack, updateAttackPosition } from '../../store/attack/Attack.actions'

import { selectRegionById } from '../../store/region/Region.selectors'
import { selectCountryById } from '../../store/country/Country.selectors'
import { selectAllAttacks } from '../../store/attack/Attack.selectors'

export function updateAttacks () {
    let attacks = selectAllAttacks(store.getState())
    attacks.forEach(attack => {
        let toRegion = selectRegionById(store.getState(), attack.toRegionId)
        let toCountry = selectCountryById(store.getState(), toRegion.countryId)
        let fromPlayerId = attack.fromPlayerId 
        let toPlayerId = toRegion.playerId
        let currentPosition = attack.position

        if(arrived(currentPosition, toCountry.capital.center)) {
            let regionUnits = toRegion.units
            let attackUnits = attack.units

            if(toPlayerId === fromPlayerId) {
                let units = regionUnits + attackUnits
                store.dispatch(updateRegionUnits({regionId: toRegion.id, units}))
            } else if(regionUnits >= attackUnits) {
                let units = regionUnits - attackUnits
                store.dispatch(updateRegionUnits({regionId: toRegion.id, units}))
            } else {
                let units = attackUnits - regionUnits
                let playerId = attack.fromPlayerId
                store.dispatch(updateRegionUnits({regionId: toRegion.id, units}))
                store.dispatch(updateRegionPlayerId({regionId: toRegion.id, playerId}))
            }
            
            store.dispatch(removeAttack(attack.id))
        } else {
            let newPosition = getNewPosition(currentPosition, toCountry.capital.center)
            store.dispatch(updateAttackPosition({attackId: attack.id, position: newPosition}))
        }
    })
}

export function arrived(currentPosition, toPosition) {
    let currentLat = currentPosition.lat
    let currentLng = currentPosition.lng

    let toLat = toPosition.lat
    let toLng = toPosition.lng

    let latDistance = Math.abs(currentLat-toLat);
    let lngDistance = Math.abs(currentLng-toLng);

    return latDistance <= 0.05 && lngDistance <= 0.05
}

export function getNewPosition(currentPosition, toPosition) {
    let fromLat = currentPosition.lat;
    let toLat = toPosition.lat;

    let fromLng = currentPosition.lng;
    let toLng = toPosition.lng;

    let latDistance = toLat - fromLat;
    let latDirection = Math.sign(latDistance);
    
    let lngDistance = toLng - fromLng
    let lngDirection = Math.sign(lngDistance);

    let latProportion = Math.abs(latDistance)/Math.abs(lngDistance)
    let lngProportion = Math.abs(lngDistance)/Math.abs(latDistance)

    let lat = currentPosition.lat + (latDirection * latProportion * 0.05)

    let lng = currentPosition.lng + (lngDirection * lngProportion * 0.05)

    return { lat, lng };
}
