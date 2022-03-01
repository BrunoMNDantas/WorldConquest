import store from '../../store/store'

import { selectAllRegions } from '../../store/region/Region.selectors'

import { updateRegionMoney } from '../../store/region/Region.actions'


export function updateMoney() {
    let regions = selectAllRegions(store.getState())

    regions.forEach(region => {
        let increment = region.bankLevel.moneyPerUpdate
        let money = region.money + increment
        store.dispatch(updateRegionMoney({regionId: region.id, money}))
    })
}