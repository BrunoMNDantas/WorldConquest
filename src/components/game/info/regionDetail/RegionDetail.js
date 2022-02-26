import { useSelector } from "react-redux";
import style from './RegionDetail.module.css'
import { Slide, Paper, Divider, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import Person from "@material-ui/icons/Person";

import { selectRegionById } from "../../../../store/region/Region.selectors";
import { selectSelectedRegionId } from "../../../../store/game/Game.selectors";
import { selectPlayerById } from "../../../../store/player/Player.selectors";
import { selectCountryById } from "../../../../store/country/Country.selectors";


const RegionDetail = () => {
    console.log("::Region Detail::")

    const selectedRegionId = useSelector(selectSelectedRegionId);
    const region = useSelector(state => selectRegionById(state, selectedRegionId))
    const player = useSelector(state => selectPlayerById(state, region?.playerId))
    const playerInitialCountry = useSelector(state => selectCountryById(state, player?.initialCountry))
    const country = useSelector(state => selectCountryById(state, region?.countryId))
    const open = selectedRegionId !== undefined && selectedRegionId !== null

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper elevation={10} className={style.paper}>
                <div className={style.infoContainer}>
                    <ListItem>
                        <ListItemAvatar disablePadding>
                            <img src={country?.flagUrl} className={style.countryFlagImage}/>
                        </ListItemAvatar>
                        <ListItemText primary={country?.name} secondary={country?.capital.name} disablePadding/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar disablePadding>
                            <img src={player?.avatar} className={style.avatarImage} style={{borderColor:player?.color}}/>
                        </ListItemAvatar>
                        <ListItemText primary={player?.name} disablePadding/>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar disablePadding>
                            <Person fontSize="large"/>  
                        </ListItemAvatar>
                        <ListItemText primary={"Units"} secondary={region?.units} disablePadding/>
                    </ListItem>
                </div>
                <Divider orientation="vertical" flexItem light/>
                <div className={style.actionsContainer}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Paper>
        </Slide>
    )
}

export default RegionDetail;