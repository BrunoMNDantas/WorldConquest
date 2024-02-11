import React from 'react'
import { useSelector } from 'react-redux';
import style from './MovesInfo.module.css'

import { selectPlayersIds } from '../../../../store/player/Player.selectors'

import { List } from '@material-ui/core';
import { TransferWithinAStation } from '@material-ui/icons';
import InfoPanel from '../infoPanel/InfoPanel';
import PlayerItem from './playerItem/PlayerItem';


const MovesInfo = () => {
    console.log(":Moves Info::")

    const playersId = useSelector(selectPlayersIds)
    const playersIdSorted = [...playersId].sort()
    
    return (
        <InfoPanel tooltip="Players Moves" icon={<TransferWithinAStation/>}>
            <List className={style.list}>
                {playersIdSorted.map(id => <PlayerItem key={"MovesInfo " + id} playerId={id}/>)}
            </List>
        </InfoPanel>
    )
}

export default MovesInfo;