import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './PlayerItem.module.css'

import { Collapse, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import { selectCurrentPlayerId } from '../../../../../store/game/Game.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors';
import { selectAllMoves  } from '../../../../../store/move/Move.selectors' 
import { selectRegionsOfPlayer } from '../../../../../store/region/Region.selectors';

import MoveItem from './moveItem/MoveItem';

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
                    { playerMoves.map(moveId => <MoveItem key={"MoveItem " + moveId} playerId={playerId} moveId={moveId}/>) }
                </List>
            </Collapse>
        </div>
    )
}

export default PlayerItem;