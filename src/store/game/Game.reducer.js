import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPlayerId: null,
  selectedRegionId: null,
  winner: undefined,
  currentPlayerLost: false,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentPlayerId: (state, action) => {
      state.currentPlayerId = action.payload
    },
    setSelectedRegionId: (state, action) => {
      state.selectedRegionId = action.payload
    },
    setWinner: (state, action) => {
      state.winner = action.payload
    },
    setCurrentPlayerLost: (state, action) => {
      state.currentPlayerLost = action.payload
    },
    setResult: (state, action) => {
      state.result = action.payload
    },
  },
})

export default gameSlice.reducer
