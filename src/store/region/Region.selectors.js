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
