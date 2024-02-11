import { useSelector } from "react-redux";
import style from './RegionData.module.css'
import { Button, ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import People from "@material-ui/icons/People";
import MonetizationOn from "@material-ui/icons/MonetizationOn";
import AttachMoney from "@material-ui/icons/AttachMoney";

import { increaseHouseLevel, increaseBankLevel, increaseMoveLevel } from "../../../../../services/game/GameEngine";

import { HOUSE_LEVELS, BANK_LEVELS, MOVE_LEVELS } from '../../../../../Constants' 

import { selectRegionById } from "../../../../../store/region/Region.selectors";
import { selectPlayerById } from "../../../../../store/player/Player.selectors";
import { selectCountryById } from "../../../../../store/country/Country.selectors";
import { selectCurrentPlayerId } from "../../../../../store/game/Game.selectors";

const RegionData = ({regionId}) => {
    console.log("::Region Data::")
    
    const currentPlayerId = useSelector(selectCurrentPlayerId)
    const region = useSelector(state => selectRegionById(state, regionId))
    const player = useSelector(state => selectPlayerById(state, region?.playerId))
    const country = useSelector(state => selectCountryById(state, region?.countryId))

    const houseLevel = region?.houseLevel.level
    const nextHouseLevel = houseLevel === HOUSE_LEVELS.length-1 ? null : HOUSE_LEVELS[houseLevel+1] 
    const bankLevel = region?.bankLevel.level
    const nextBankLevel = bankLevel === BANK_LEVELS.length-1 ? null : BANK_LEVELS[bankLevel+1] 
    const moveLevel = region?.moveLevel.level
    const nextMoveLevel = moveLevel === MOVE_LEVELS.length-1 ? null : MOVE_LEVELS[moveLevel+1] 

    function handleUpgradeHouseClick() {
        increaseHouseLevel(regionId)
    }

    function handleUpgradeBankClick() {
        increaseBankLevel(regionId)
    }

    function handleUpgradeMoveClick() {
        increaseMoveLevel(regionId)
    }
    
    return (
        <div className={style.infoContainer}>
            <div className={style.topContainer}>
                <div className={style.countryContainer}>
                    <ListItemAvatar disablePadding>
                        <img src={country?.flagUrl} className={style.countryFlagImage} alt=""/>
                    </ListItemAvatar>
                    <ListItemText primary={country?.name} disablePadding/>
                </div>
                <div className={style.playerContainer}>
                    <ListItemAvatar disablePadding>
                        <img src={player?.avatar} className={style.avatarImage} style={{borderColor:player?.color}} alt=""/>
                    </ListItemAvatar>
                    <ListItemText primary={player?.name} disablePadding/>
                </div>
            </div>
            <div className={style.bottomContainer}>
                <Tooltip title={"Units"}>
                    <div className={style.unitsContainer}>
                        <People fontSize="medium"/>  
                        <ListItemText primary={region?.units} className={style.units} disablePadding/>
                    </div>
                </Tooltip>
                <Tooltip title={"Money"}>
                    <div className={style.moneyContainer}>
                        <MonetizationOn fontSize="madium"/>  
                        <ListItemText primary={region?.money} className={style.money} disablePadding/>
                    </div>
                </Tooltip>
            </div>
            <div className={style.upgradesContainer}>
                <Tooltip title={region?.houseLevel.description}>
                    <div className={style.upgradeHouseContainer}>
                        <ListItemText primary={"House"} secondary={"Level: " + houseLevel} disablePadding/>
                        <Button variant="contained" color="primary" disabled={!nextHouseLevel || nextHouseLevel.price > region?.money || region?.playerId !== currentPlayerId} endIcon={<AttachMoney/>} onClick={handleUpgradeHouseClick}>
                            {nextHouseLevel?.price}
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip title={region?.bankLevel.description}>
                    <div className={style.upgradeBankContainer}>
                        <ListItemText primary={"Bank"} secondary={"Level: " + bankLevel} disablePadding/>
                        <Button variant="contained" color="primary" disabled={!nextBankLevel || nextBankLevel.price > region?.money || region?.playerId !== currentPlayerId} endIcon={<AttachMoney/>} onClick={handleUpgradeBankClick}>
                            {nextBankLevel?.price}
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip title={region?.moveLevel.description}>
                    <div className={style.upgradeMoveContainer}>
                        <ListItemText primary={"Move"} secondary={"Level: " + moveLevel} disablePadding/>
                        <Button variant="contained" color="primary" disabled={!nextMoveLevel || nextMoveLevel.price > region?.money || region?.playerId !== currentPlayerId} endIcon={<AttachMoney/>} onClick={handleUpgradeMoveClick}>
                            {nextMoveLevel?.price}
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default RegionData