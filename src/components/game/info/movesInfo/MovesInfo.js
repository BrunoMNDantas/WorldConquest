import React from 'react'
import { useSelector } from 'react-redux';
import style from './MovesInfo.module.css'

import { selectPlayersIds } from '../../../../store/player/Player.selectors'

import { List } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import InfoPanel from '../infoPanel/InfoPanel';
import MoveItem from './moveItem/MoveItem';


const MovesInfo = () => {
    console.log(":Moves Info::")

    const playersId = useSelector(selectPlayersIds)
    const playersIdSorted = [...playersId].sort()
    
    return (
        <InfoPanel tooltip="Players Moves" icon={<Cancel/>}>
            <List className={style.list}>
                {playersIdSorted.map(id => <MoveItem key={"MovesInfo " + id} playerId={id}/>)}
            </List>
        </InfoPanel>
    )
}

export default MovesInfo;