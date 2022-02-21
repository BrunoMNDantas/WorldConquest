import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const attacksAdapter = createEntityAdapter()

const initialState = attacksAdapter.getInitialState()

export const attackSlice = createSlice({
  name: 'attacks',
  initialState,
  reducers: {
    addAttacks: attacksAdapter.addMany,
    addAttack: attacksAdapter.addOne,

    removeAttacks: attacksAdapter.removeMany,
    removeAttack: attacksAdapter.removeOne,

    updateAttacks: attacksAdapter.updateMany,
    updateAttack: attacksAdapter.updateOne,

    updateAttackPosition: (state, action) => {
      let {attackId, position} = action.payload
      let attack = state.entities[attackId]
      attack.position = position
    }
  },
})

export default attackSlice.reducer
