import { NUMBER_OF_BOTS } from "../../Constants"

export function buildPlayer(player) {
    return {
        id: player.name,
        ...player
    }
}

export function buildPlayers(players) {
    return players.map(buildPlayer)
}

export function buildBots(colors, avatars, countriesIds, aiLevel) {
    let bots = []

    for(let i = 0; i < NUMBER_OF_BOTS; ++i) {
        bots.push({
            name: "Bot " + (i+1),
            color: colors[i],
            avatar: avatars[i],
            initialCountry: countriesIds[i],
            aiLevel: aiLevel
        })
    }

    return buildPlayers(bots)
}