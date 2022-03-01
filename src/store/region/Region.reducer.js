import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const regionsAdapter = createEntityAdapter()

const initialState = regionsAdapter.getInitialState({})

export const regionSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    addRegions: regionsAdapter.addMany,
    addRegion: regionsAdapter.addOne,

    removeRegions: regionsAdapter.removeMany,
    removeRegion: regionsAdapter.removeOne,

    updateRegions: regionsAdapter.updateMany,
    updateRegion: regionsAdapter.updateOne,

    updateRegionUnits: (state, action) => {
      let {regionId, units} = action.payload
      let region = state.entities[regionId]
      region.units = units
    },

    updateRegionPlayerId: (state, action) => {
      let {regionId, playerId} = action.payload
      let region = state.entities[regionId]
      region.playerId = playerId
    },

    updateRegionMoney: (state, action) => {
      let {regionId, money} = action.payload
      let region = state.entities[regionId]
      region.money = money
    },

    updateRegionHouseLevel: (state, action) => {
      let {regionId, level} = action.payload
      let region = state.entities[regionId]
      region.houseLevel = level
    },

    updateRegionBankLevel: (state, action) => {
      let {regionId, level} = action.payload
      let region = state.entities[regionId]
      region.bankLevel = level
    },

    updateRegionMoveLevel: (state, action) => {
      let {regionId, level} = action.payload
      let region = state.entities[regionId]
      region.moveLevel = level
    },
  },
})

export default regionSlice.reducer
