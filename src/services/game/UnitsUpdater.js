import store from '../../store/store'

import { updateRegionUnits } from '../../store/region/Region.actions'

import { selectAllRegions } from '../../store/region/Region.selectors'
import { MAX_UNITS } from '../../Constants'


export function updateUnits() {
    let regions = selectAllRegions(store.getState())

    regions.forEach(region => {
        let units = calculateUnits(region)

        if(units != region.units)
            store.dispatch(updateRegionUnits({regionId: region.id, units}))
    })
}

export function calculateUnits(region) {
    let currentUnits = region.units

    if(currentUnits >= MAX_UNITS)
        return currentUnits

    return currentUnits + 1;
}