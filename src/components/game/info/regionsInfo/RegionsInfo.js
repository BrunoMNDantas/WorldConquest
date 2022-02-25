import React from 'react'
import { useSelector } from 'react-redux';
import style from './RegionsInfo.module.css'

import { selectAllRegions } from '../../../../store/region/Region.selectors'
import { selectAllPlayers } from '../../../../store/player/Player.selectors'
import { selectAllCountries } from '../../../../store/country/Country.selectors'
import { selectCurrentPlayerId } from '../../../../store/game/Game.selectors'

import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import InfoPanel from '../infoPanel/InfoPanel';
import { Language } from '@material-ui/icons';

const PlayerItem = ({currentPlayerId, player, initialCountry, regions}) => {
    const itemBackgroundColor = player.id === currentPlayerId ? "#ffffff40" : ""
    const regionsText = regions.length + (regions.length == 1 ? " Region" : " Regions")

    return (
        <ListItem style={{backgroundColor: itemBackgroundColor}}>
            <ListItemAvatar>
                <img src={initialCountry.flagUrl} className={style.image} style={{borderColor:player.color}}/>
            </ListItemAvatar>
            <ListItemText primary={player.name} secondary={regionsText}/>
        </ListItem>
    )
}

const RegionsInfo = () => {
    console.log(":Regions Info::")

    const currentPlayerId = useSelector(selectCurrentPlayerId)
    const regions = useSelector(selectAllRegions)
    const players = useSelector(selectAllPlayers)
    const countries = useSelector(selectAllCountries)

    let data = []

    players.forEach(player => {
        data.push({
            player: player,
            initialCountry: countries.filter(c => c.id === player.initialCountry)[0],
            regions: regions.filter(r => r.playerId === player.id).map(r => {
                return {
                    region: r,
                    country: countries.filter(c => c.id === r.countryId)[0]
                }
            })
        })
    })

    data = data.sort((a,b) => b.regions.length-a.regions.length)
   
    return (
        <InfoPanel tooltip="Players Regions" icon={<Language/>}>
            <List className={style.list}>
                {data.map(d => 
                    <PlayerItem 
                        key={"RegionsInfo " + d.player.id}
                        currentPlayerId={currentPlayerId} 
                        {...d}/>)}
            </List>
        </InfoPanel>
    )
}

export default RegionsInfo;