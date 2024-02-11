import React from 'react'
import { useSelector } from 'react-redux';
import style from './MoveItem.module.css'

import { ListItem, Tooltip } from '@material-ui/core';

import { selectPlayerById } from '../../../../../../store/player/Player.selectors';
import { selectMoveById } from '../../../../../../store/move/Move.selectors' 
import { selectRegionById } from '../../../../../../store/region/Region.selectors';
import { selectCountryById } from '../../../../../../store/country/Country.selectors';
import { calculateDistance } from '../../../../../../services/game/MovesUpdater';

const MoveItem = ({playerId, moveId}) => {
    const move = useSelector(state => selectMoveById(state, moveId))
    const fromRegion = useSelector(state => selectRegionById(state, move.fromRegionId))
    const toRegion = useSelector(state => selectRegionById(state, move.toRegionId))
    const fromCountry = useSelector(state => selectCountryById(state, fromRegion.countryId))
    const toCountry = useSelector(state => selectCountryById(state, toRegion.countryId))
    const fromPlayer = useSelector(state => selectPlayerById(state, move.fromPlayerId))
    const toPlayer = useSelector(state => selectPlayerById(state, toRegion.playerId))

    const distance = Math.round(calculateDistance(move.position, toCountry.capital.center))
    const isJoin = toPlayer?.id === fromPlayer.id
    const isAttacking = !isJoin && fromPlayer.id === playerId
    
    const leftCountry = fromPlayer.id === playerId ? fromCountry : toCountry;
    const rightCountry = fromPlayer.id === playerId ? toCountry : fromCountry;
    const leftPlayer = fromPlayer.id === playerId ? fromPlayer : toPlayer;
    const rightPlayer = fromPlayer.id === playerId ? toPlayer : fromPlayer;

    let leftContent = 
        <div className={style.leftContent}>
            <img src={leftPlayer.avatar} className={style.leftPlayerAvatar} style={{borderColor:leftPlayer.color}} alt=""/>
            <img src={leftCountry.flagUrl} className={style.leftCountryFlag} alt=""/>
        </div>

    let distanceContent = 
        <div className={style.distanceContent}>
            <div className={style.distance}>
                {distance} Km
            </div>
            <div className={isJoin ? style.joinLine : (isAttacking ? style.attackingLine : style.underAttackLine)}/>
        </div>
     
    let rightContent = 
        toPlayer ? 
        <div className={style.rightContent}>
            <img src={rightCountry.flagUrl} className={style.rightCountryFlag} alt=""/>
            <img src={rightPlayer.avatar} className={style.rightPlayerAvatar} style={{borderColor:rightPlayer.color}} alt=""/>
        </div>
        :
        <div className={style.rightContent}>
            <img src={toCountry.flagUrl} className={style.rightCountryFlag} alt=""/>
            <div className={style.noPlayerAvatar} />
        </div>
        
    return (
        <Tooltip title={isAttacking ? "Attacking" : (isJoin ? "Joining Units" : "Under Attack")} placement="right">
            <ListItem className={style.root}>
                {leftContent}
                {distanceContent}
                {rightContent}
            </ListItem>
        </Tooltip>
    )  
}

export default MoveItem;