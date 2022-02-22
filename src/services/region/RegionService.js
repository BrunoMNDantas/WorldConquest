import { MAX_INITIAL_UNITS_AMMOUNT, MIN_INITIAL_UNITS_AMMOUNT, MAX_UNITS_AMMOUNT } from "../../Constants";

export function buildRegions(countries, players) {
    let id = 1;
    let regions = [];

    let populations = countries.map(country => country.population)
    const minPopulation = Math.min(...populations)
    const maxPopulation = Math.max(...populations)

    countries.forEach(country => {
        let player = players.filter(player => player.initialCountry === country.id)
        player = player.length === 0 ? null : player[0]

        regions.push({
            id: id++,
            countryId: country.id,
            playerId: player?.id,
            units: {
                ammount: normalizePopulation(minPopulation, maxPopulation, country.population),
                max: MAX_UNITS_AMMOUNT
            }
        })
    })

    return regions;
}

export function normalizePopulation(min, max, population) {
    const normalize = (minVal, maxVal, val) => (val - minVal) / (maxVal - min)

    let normalized = normalize(min, max, population)

    return Math.round(normalized * MAX_INITIAL_UNITS_AMMOUNT) + MIN_INITIAL_UNITS_AMMOUNT
}

export function calculateUnitsAmmount(region) {
    let currentAmmount = region.units.ammount
    let maxAmmount = region.units.max

    if(currentAmmount >= maxAmmount)
        return currentAmmount

    return currentAmmount + 1;
}