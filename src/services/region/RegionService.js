import { BANK_LEVELS, HOUSE_LEVELS, MOVE_LEVELS } from "../../Constants"

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
            units: normalizePopulation(minPopulation, maxPopulation, country.population),
            money: 0,
            houseLevel: HOUSE_LEVELS[0],
            bankLevel: BANK_LEVELS[0],
            moveLevel: MOVE_LEVELS[0]
        })
    })

    return regions;
}

export function normalizePopulation(min, max, population) {
    const normalize = (minVal, maxVal, val) => (val - minVal) / (maxVal - min)

    const maxInitialUnits = HOUSE_LEVELS[0].maxUnits
    const minInitialUnits = 0
    let normalized = normalize(min, max, population)

    return Math.round(normalized * maxInitialUnits) + minInitialUnits
}