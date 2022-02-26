import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './MoveItem.module.css'

import { Collapse, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { selectCurrentPlayerId } from '../../../../../store/game/Game.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors';
import { selectAllMoves, selectMoveById } from '../../../../../store/move/Move.selectors' 
import { selectRegionsOfPlayer, selectRegionById } from '../../../../../store/region/Region.selectors';
import { selectCountryById } from '../../../../../store/country/Country.selectors';
import { calculateDistance } from '../../../../../services/game/MovesUpdater';

const Item = ({playerId, moveId}) => {
    const move = useSelector(state => selectMoveById(state, moveId))
    const fromRegion = useSelector(state => selectRegionById(state, move.fromRegionId))
    const toRegion = useSelector(state => selectRegionById(state, move.toRegionId))
    const fromCountry = useSelector(state => selectCountryById(state, fromRegion.countryId))
    const toCountry = useSelector(state => selectCountryById(state, toRegion.countryId))

    const distance = Math.round(calculateDistance(move.position, toCountry.capital.center))
    const isFromPlayer = move.fromPlayerId === playerId

    let content = (
        <div className={style.itemContent}>
            <div className={style.itemFromFlagContainer}>
                <img src={fromCountry.flagUrl} className={style.itemFromFlag}/>
            </div>
            <div className={style.itemLineContainer}>
                <div className={style.itemLineDistance}>
                    {distance} Km
                </div>
                <div className={isFromPlayer ? style.itemLineFrom : style.itemLineTo}/>
            </div>
            <div className={style.itemToFlagContainer}>
                <img src={toCountry.flagUrl} className={style.itemToFlag}/>
            </div>
        </div>
    )

    return (
        <ListItem style={{paddingLeft:"50px", justifyContent:"center"}}>
            {content}
        </ListItem>
    )  
}

const MoveItem = ({playerId}) => {
    console.log(":Move Item::")

    const [open, setOpen] = useState(false)
    const currentPlayerId = useSelector(selectCurrentPlayerId)
    const player = useSelector(state => selectPlayerById(state, playerId));
    const initialCountry = useSelector(state => selectCountryById(state, player.initialCountry))
    const regionsIdsOfPlayer = useSelector(state => selectRegionsOfPlayer(state, playerId)).map(r => r.id)
    const moves = useSelector(selectAllMoves)

    const playerMoves = [
        ...(moves.filter(move => move.fromPlayerId === playerId).map(a => a.id)),
        ...(moves.filter(move => regionsIdsOfPlayer.indexOf(move.toRegionId) !== -1).map(a => a.id)),
    ]

    return (
        <div>
            <ListItem 
                className={style.item}
                style={{backgroundColor: playerId === currentPlayerId ? "#ffffff40" : ""}} 
                onClick={() => setOpen(!open)}>
                <ListItemAvatar>
                    <img 
                        src={player.avatar} 
                        className={style.image} 
                        style={{borderColor:player.color}}/>
                </ListItemAvatar>
                <ListItemText 
                    primary={player.name} 
                    secondary={playerMoves.length + (playerMoves.length == 1 ? " Move" : " Moves")}/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    { playerMoves.map(moveId => <Item key={"MoveItem " + moveId} playerId={playerId} moveId={moveId}/>) }
                </List>
            </Collapse>
        </div>
    )
}

export default MoveItem;