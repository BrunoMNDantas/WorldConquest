import React from 'react'
import { useSelector } from 'react-redux';
import style from './RegionsInfo.module.css'

import { selectPlayersIds } from '../../../../store/player/Player.selectors'

import { List } from '@material-ui/core';
import { Language } from '@material-ui/icons';
import InfoPanel from '../infoPanel/InfoPanel';
import RegionItem from './regionItem/RegionItem';


const RegionsInfo = () => {
    console.log(":Regions Info::")

    const playersId = useSelector(selectPlayersIds)
    const playersIdSorted = [...playersId].sort()
    
    return (
        <InfoPanel tooltip="Players Regions" icon={<Language/>}>
            <List className={style.list}>
                {playersIdSorted.map(id => <RegionItem key={"RegionsInfo " + id} playerId={id}/>)}
            </List>
        </InfoPanel>
    )
}

export default RegionsInfo;