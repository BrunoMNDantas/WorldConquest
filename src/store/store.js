import { configureStore } from '@reduxjs/toolkit'
import PlayerSlice from './player/Player.reducer'
import CountrySlice from './country/Country.reducer'
import RegionSlice from './region/Region.reducer'
import AttackSlice from './attack/Attack.reducer'
import GameSlice from './game/Game.reducer'

export default configureStore({
  reducer: {
      players: PlayerSlice, 
      countries: CountrySlice,
      regions: RegionSlice,
      attacks: AttackSlice,
      game: GameSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
  }),  
})