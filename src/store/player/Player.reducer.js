import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const playersAdapter = createEntityAdapter()

const initialState = playersAdapter.getInitialState({})

export const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addPlayers: playersAdapter.addMany,
    addPlayer: playersAdapter.addOne,

    removePlayers: playersAdapter.removeMany,
    removePlayer: playersAdapter.removeOne,

    updatePlayers: playersAdapter.updateMany,
    updatePlayer: playersAdapter.updateOne
  },
})

export default playerSlice.reducer
