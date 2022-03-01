import store from '../../store/store'

import { updateRegionUnits, updateRegionPlayerId } from '../../store/region/Region.actions'
import { removeMove, updateMovePosition } from '../../store/move/Move.actions'

import { selectRegionById } from '../../store/region/Region.selectors'
import { selectCountryById } from '../../store/country/Country.selectors'
import { selectAllMoves } from '../../store/move/Move.selectors'

export function updateMoves() {
    let moves = selectAllMoves(store.getState())
    moves.forEach(move => {
        let toRegion = selectRegionById(store.getState(), move.toRegionId)
        let toCountry = selectCountryById(store.getState(), toRegion.countryId)
        let fromPlayerId = move.fromPlayerId 
        let toPlayerId = toRegion.playerId
        let currentPosition = move.position

        if(arrived(currentPosition, toCountry.capital.center)) {
            let regionUnits = toRegion.units
            let moveUnits = move.units

            if(toPlayerId === fromPlayerId) {
                let units = regionUnits + moveUnits
                store.dispatch(updateRegionUnits({regionId: toRegion.id, units}))
            } else if(regionUnits >= moveUnits) {
                let units = regionUnits - moveUnits
                store.dispatch(updateRegionUnits({regionId: toRegion.id, units}))
            } else {
                let units = moveUnits - regionUnits
                let playerId = move.fromPlayerId
                store.dispatch(updateRegionUnits({regionId: toRegion.id, units}))
                store.dispatch(updateRegionPlayerId({regionId: toRegion.id, playerId}))
            }
            
            store.dispatch(removeMove(move.id))
        } else {
            let fromRegion = selectRegionById(store.getState(), move.fromRegionId)
            let newPosition = getNewPosition(currentPosition, toCountry.capital.center, fromRegion.moveLevel)
            store.dispatch(updateMovePosition({moveId: move.id, position: newPosition}))
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

export function getNewPosition(currentPosition, toPosition, moveLevel) {
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

    let lat = currentPosition.lat + (latDirection * latProportion * (0.005 * moveLevel.kmPerUpdate))

    let lng = currentPosition.lng + (lngDirection * lngProportion * (0.005 * moveLevel.kmPerUpdate))

    return { lat, lng };
}

export function calculateDistance(from, to) {    
    const lonFrom =  from.lng * Math.PI / 180;
    const lonTo = to.lng * Math.PI / 180;
    const latFrom = from.lat * Math.PI / 180;
    const latTo = to.lat * Math.PI / 180;

    let dlon = lonTo - lonFrom;
    let dlat = latTo - latFrom;

    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latTo) * Math.cos(latFrom) * Math.pow(Math.sin(dlon / 2),2);
    
    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;

    return c * r;
}