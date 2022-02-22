export function buildAttack(fromRegion, toRegion, fromCountry) {
    return {
        id: Math.trunc(Math.random() * 1000000),
        fromRegionId: fromRegion.id,
        toRegionId: toRegion.id,
        fromPlayerId: fromRegion.playerId,
        toPlayerId: toRegion.playerId,
        units: fromRegion.units.ammount, 
        position: fromCountry.capital.center
    }
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

export function arrived(currentPosition, toPosition) {
    let currentLat = currentPosition.lat
    let currentLng = currentPosition.lng

    let toLat = toPosition.lat
    let toLng = toPosition.lng

    let latDistance = Math.abs(currentLat-toLat);
    let lngDistance = Math.abs(currentLng-toLng);

    return latDistance <= 0.05 && lngDistance <= 0.05
}