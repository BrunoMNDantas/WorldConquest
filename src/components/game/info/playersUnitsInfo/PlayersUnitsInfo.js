import React from 'react'
import { useSelector } from 'react-redux';
import style from './PlayersUnitsInfo.module.css'

import { selectAllRegions } from '../../../../store/region/Region.selectors'
import { selectAllPlayers } from '../../../../store/player/Player.selectors'
import { selectAllAttacks } from '../../../../store/attack/Attack.selectors'
import { selectAllCountries } from '../../../../store/country/Country.selectors'
import { selectCurrentPlayerId } from '../../../../store/game/Game.selectors'

import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import InfoPanel from '../infoPanel/InfoPanel';
import { Person } from '@material-ui/icons';

const PlayersUnitsInfo = () => {
    console.log(":Players Units Info::")

    const currentPlayerId = useSelector(selectCurrentPlayerId)
    const regions = useSelector(selectAllRegions)
    const players = useSelector(selectAllPlayers)
    const attacks = useSelector(selectAllAttacks)
    const countries = useSelector(selectAllCountries)

    let data = []

    players.forEach(player => {
        data.push({
            playerId: player.id,
            playerName: player.name,
            units: getPlayerUnits(player),
            flag: getPlayerFlag(player),
            color: player.color
        })
    })

    data = data.sort((a,b) => b.units-a.units)

    function getPlayerFlag(player) {
        return countries.filter(country => country.id === player.initialCountry)[0].flagUrl
    }

    function getPlayerUnits(player) {
        let counter = 0;

        regions.forEach(region => {
            if(region.playerId === player.id)
                counter += region.units
        })

        attacks.forEach(attack => {
            if(attack.fromPlayerId === player.id)
                counter += attack.units
        })

        return counter;
    }

    return (
        <InfoPanel tooltip="Players Units" icon={<Person/>}>
            <List className={style.list}>
                {
                    data.map(player => {
                        return (
                            <ListItem key={"PlayersUnitsInfo " + player.playerId} style={{backgroundColor: player.playerId === currentPlayerId ? "#ffffff40" : ""}}>
                                <ListItemAvatar>
                                    <img src={player.flag} className={style.image} style={{borderColor:player.color}}/>
                                </ListItemAvatar>
                                <ListItemText primary={player.playerName} secondary={player.units+ " Units"}/>
                            </ListItem>
                        )
                    })
                }
            </List>
        </InfoPanel>
    )
}

export default PlayersUnitsInfo;