export function buildMove(fromRegion, toRegion, fromCountry) {
    return {
        id: Math.trunc(Math.random() * 1000000),
        fromRegionId: fromRegion.id,
        toRegionId: toRegion.id,
        fromPlayerId: fromRegion.playerId,
        toPlayerId: toRegion.playerId,
        units: fromRegion.units, 
        position: fromCountry.capital.center
    }
}