import { configureStore } from '@reduxjs/toolkit'
import PlayerSlice from './player/Player.reducer'
import CountrySlice from './country/Country.reducer'
import RegionSlice from './region/Region.reducer'
import MoveSlice from './move/Move.reducer'
import GameSlice from './game/Game.reducer'

export default configureStore({
  reducer: {
      players: PlayerSlice, 
      countries: CountrySlice,
      regions: RegionSlice,
      moves: MoveSlice,
      game: GameSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),  
})