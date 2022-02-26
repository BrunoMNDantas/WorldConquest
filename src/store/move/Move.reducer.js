import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const movesAdapter = createEntityAdapter()

const initialState = movesAdapter.getInitialState()

export const moveSlice = createSlice({
  name: 'moves',
  initialState,
  reducers: {
    addMoves: movesAdapter.addMany,
    addMove: movesAdapter.addOne,

    removeMoves: movesAdapter.removeMany,
    removeMove: movesAdapter.removeOne,

    updateMoves: movesAdapter.updateMany,
    updateMove: movesAdapter.updateOne,

    updateMovePosition: (state, action) => {
      let {moveId, position} = action.payload
      let move = state.entities[moveId]
      move.position = position
    }
  },
})

export default moveSlice.reducer
