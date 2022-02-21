import { countriesAdapter } from './Country.reducer'

export const selectAllCountries = countriesAdapter.getSelectors(state => state.countries).selectAll
export const selectCountriesId = countriesAdapter.getSelectors(state => state.countries).selectIds
export const selectCountryById = countriesAdapter.getSelectors(state => state.countries).selectById
