import { createSelector } from '@reduxjs/toolkit'
import { regionsAdapter } from './Region.reducer'

export const selectAllRegions = regionsAdapter.getSelectors(state => state.regions).selectAll
export const selectRegionsId = regionsAdapter.getSelectors(state => state.regions).selectIds
export const selectRegionById = regionsAdapter.getSelectors(state => state.regions).selectById

export const selectRegionOfCountry = createSelector(
    [selectAllRegions, (state, countryId) => countryId],
    (regions, countryId) => regions.filter(region => region.countryId === countryId)[0])
export const selectRegionsOfPlayer =  createSelector(
    [selectAllRegions, (state, playerId) => playerId],
    (regions, playerId) => regions.filter(region => region.playerId === playerId))

export const selectPlayerIdOfRegion = createSelector(
    [selectRegionById],
    (region) => region.playerId)
export const selectCountryIdOfRegion = createSelector(
    [selectRegionById],
    (region) => region.countryId)
export const selectUnitsOfRegion = createSelector(
    [selectRegionById],
    (region) => region.units)
export const selectMoneyOfRegion = createSelector(
    [selectRegionById],
    (region) => region.money)
export const selectHouseLevelOfRegion = createSelector(
    [selectRegionById],
    (region) => region.houseLevel)
export const selectBankLevelOfRegion = createSelector(
    [selectRegionById],
    (region) => region.bankLevel)
export const selectMoveLevelOfRegion = createSelector(
    [selectRegionById],
    (region) => region.moveLevel)