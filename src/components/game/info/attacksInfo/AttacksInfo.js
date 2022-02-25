import React from 'react'
import { useSelector } from 'react-redux';
import style from './AttacksInfo.module.css'

import { selectPlayersIds } from '../../../../store/player/Player.selectors'

import { List } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import InfoPanel from '../infoPanel/InfoPanel';
import AttackItem from './attackItem/AttackItem';


const AttacksInfo = () => {
    console.log(":Attacks Info::")

    const playersId = useSelector(selectPlayersIds)
    const playersIdSorted = [...playersId].sort()
    
    return (
        <InfoPanel tooltip="Players Attacks" icon={<Cancel/>}>
            <List className={style.list}>
                {playersIdSorted.map(id => <AttackItem key={"AttacksInfo " + id} playerId={id}/>)}
            </List>
        </InfoPanel>
    )
}

export default AttacksInfo;