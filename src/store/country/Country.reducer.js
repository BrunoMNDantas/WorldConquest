import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

export const countriesAdapter = createEntityAdapter()

const initialState = countriesAdapter.getInitialState()

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountries: countriesAdapter.addMany,
    addCountry: countriesAdapter.addOne,

    removeCountries: countriesAdapter.removeMany,
    removeCountry: countriesAdapter.removeOne,

    updateCountries: countriesAdapter.updateMany,
    updateCountry: countriesAdapter.updateOne
  },
})

export default countrySlice.reducer
