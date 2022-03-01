import store from '../../store/store'

import { updateRegionUnits } from '../../store/region/Region.actions'

import { selectAllRegions } from '../../store/region/Region.selectors'


export function updateUnits() {
    let regions = selectAllRegions(store.getState())

    regions.forEach(region => {
        let units = calculateUnits(region)

        if(units !== region.units)
            store.dispatch(updateRegionUnits({regionId: region.id, units}))
    })
}

export function calculateUnits(region) {
    const currentUnits = region.units
    const maxUnits = region.houseLevel.maxUnits

    if(currentUnits >= maxUnits)
        return currentUnits

    return currentUnits + 1;
}