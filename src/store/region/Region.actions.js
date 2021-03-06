import { regionSlice } from "./Region.reducer";

export const {
    addRegions, 
    addRegion, 
    removeRegions,
    removeRegion, 
    updateRegions, 
    updateRegion,
    updateRegionUnits,
    updateRegionPlayerId,
    updateRegionMoney, 
    updateRegionHouseLevel,
    updateRegionBankLevel,
    updateRegionMoveLevel
} = regionSlice.actions

