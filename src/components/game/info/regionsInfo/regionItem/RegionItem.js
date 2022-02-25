import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './RegionItem.module.css'

import { Collapse, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { selectCurrentPlayerId } from '../../../../../store/game/Game.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors';
import { selectRegionsOfPlayer, selectRegionById } from '../../../../../store/region/Region.selectors';
import { selectCountryById } from '../../../../../store/country/Country.selectors';

const Item = ({regionId}) => {
    const region = useSelector(state => selectRegionById(state, regionId))
    const country = useSelector(state => selectCountryById(state, region.countryId))

    return (
        <ListItem style={{paddingLeft:"50px"}}>
            <ListItemAvatar disablePadding>
                <img src={country.flagUrl} className={style.itemImage}/>
            </ListItemAvatar>
            <ListItemText primary={country.name} disablePadding/>
        </ListItem>
    )  
}

const RegionItem = ({playerId}) => {
    console.log(":Region Item::")

    const [open, setOpen] = useState(false)
    const currentPlayerId = useSelector(selectCurrentPlayerId)
    const player = useSelector(state => selectPlayerById(state, playerId));
    const initialCountry = useSelector(state => selectCountryById(state, player.initialCountry))
    const regionsOfPlayer = useSelector(state => selectRegionsOfPlayer(state, playerId))

    return (
        <div>
            <ListItem 
                className={style.item}
                style={{backgroundColor: playerId === currentPlayerId ? "#ffffff40" : ""}} 
                onClick={() => setOpen(!open)}>
                <ListItemAvatar>
                    <img 
                        src={initialCountry.flagUrl} 
                        className={style.image} 
                        style={{borderColor:player.color}}/>
                </ListItemAvatar>
                <ListItemText 
                    primary={player.name} 
                    secondary={regionsOfPlayer.length + (regionsOfPlayer.length == 1 ? " Region" : " Regions")}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { regionsOfPlayer.map(region => <Item key={"RegionItem " + region.id} regionId={region.id}/>) }
                </List>
            </Collapse>
        </div>
    )
}

export default RegionItem;