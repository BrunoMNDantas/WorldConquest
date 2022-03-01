import { useSelector } from "react-redux";
import style from './RegionData.module.css'
import { ListItemAvatar, ListItemText, Tooltip } from "@material-ui/core";
import People from "@material-ui/icons/People";
import MonetizationOn from "@material-ui/icons/MonetizationOn";

import { selectRegionById } from "../../../../../store/region/Region.selectors";
import { selectPlayerById } from "../../../../../store/player/Player.selectors";
import { selectCountryById } from "../../../../../store/country/Country.selectors";

const RegionData = ({regionId}) => {
    console.log("::Region Data::")
    
    const region = useSelector(state => selectRegionById(state, regionId))
    const player = useSelector(state => selectPlayerById(state, region?.playerId))
    const country = useSelector(state => selectCountryById(state, region?.countryId))
    
    return (
        <div className={style.infoContainer}>
            <div className={style.topContainer}>
                <div className={style.countryContainer}>
                    <ListItemAvatar disablePadding>
                        <img src={country?.flagUrl} className={style.countryFlagImage}/>
                    </ListItemAvatar>
                    <ListItemText primary={country?.name} disablePadding/>
                </div>
                <div className={style.playerContainer}>
                    <ListItemAvatar disablePadding>
                        <img src={player?.avatar} className={style.avatarImage} style={{borderColor:player?.color}}/>
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
        </div>
    )
}

export default RegionData