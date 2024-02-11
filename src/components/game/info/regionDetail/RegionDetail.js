import { useSelector } from "react-redux";
import style from './RegionDetail.module.css'
import { Slide, Paper, Divider } from "@material-ui/core";

import { selectSelectedRegionId } from "../../../../store/game/Game.selectors";

import RegionData from "./regionData/RegionData";
import RegionMoves from "./regionMoves/RegionMoves";


const RegionDetail = () => {
    console.log("::Region Detail::")

    const selectedRegionId = useSelector(selectSelectedRegionId);
    const open = selectedRegionId !== undefined && selectedRegionId !== null

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper elevation={10} className={style.paper}>
                <div className={style.leftContainer}>
                    <RegionData regionId={selectedRegionId}/>
                </div>
                <Divider orientation="vertical" flexItem light/>
                <div className={style.rightContainer}>
                    <RegionMoves regionId={selectedRegionId}/>
                </div>
            </Paper>
        </Slide>
    )
}

export default RegionDetail;