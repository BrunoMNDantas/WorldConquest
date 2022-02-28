import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './PlayerItem.module.css'

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
    const fromPlayer = useSelector(state => selectPlayerById(state, move.fromPlayerId))
    const toPlayer = useSelector(state => selectPlayerById(state, toRegion.playerId))

    const distance = Math.round(calculateDistance(move.position, toCountry.capital.center))
    const isFromPlayer = move.fromPlayerId === playerId

    let fromContent = <div className={style.fromContainer}>
        <img src={fromPlayer.avatar} className={style.image} style={{borderColor:fromPlayer.color}}/>
        <img src={fromCountry.flagUrl} className={style.itemFromFlag}/>
    </div>

    let distanceContent = <div className={style.distanceContainer}>
        <div className={style.itemLineDistance}>
            {distance} Km
        </div>
        <div className={isFromPlayer ? style.itemLineFrom : style.itemLineTo}/>
    </div>
     
    let toContent = <div class={style.toContainer}>
        <img src={toPlayer.avatar} className={style.image} style={{borderColor:toPlayer.color}}/>
        <img src={toCountry.flagUrl} className={style.itemToFlag}/>
    </div>

    return (
        <ListItem className={style.item}>
            <div className={style.itemContent}>
                <div className={style.fromContent}>
                    {fromContent}
                </div>
                <div className={style.distanceContent}>
                    {distanceContent}
                </div>
                <div className={style.toContent}>
                    {toContent}
                </div>
            </div>
        </ListItem>
    )  
}

const PlayerItem = ({playerId}) => {
    console.log(":Move Item::")

    const [open, setOpen] = useState(false)
    const currentPlayerId = useSelector(selectCurrentPlayerId)
    const player = useSelector(state => selectPlayerById(state, playerId));
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

export default PlayerItem;