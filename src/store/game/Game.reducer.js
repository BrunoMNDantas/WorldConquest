import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPlayerId: null,
  selectedRegionId: null,
  result: null
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setResult: (state, action) => {
      state.result = action.payload
    },
    setCurrentPlayerId: (state, action) => {
      state.currentPlayerId = action.payload
    },
    setSelectedRegionId: (state, action) => {
      state.selectedRegionId = action.payload
    },
  },
})

export default gameSlice.reducer
