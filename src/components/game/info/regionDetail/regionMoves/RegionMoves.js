import { useSelector } from "react-redux"
import style from './RegionMoves.module.css'

import { List } from "@material-ui/core";

import { selectRegionById } from "../../../../../store/region/Region.selectors";
import { selectMovesToRegion, selectMovesFromRegion } from "../../../../../store/move/Move.selectors";
import MoveItem from "../../movesInfo/playerItem/moveItem/MoveItem";

const RegionMoves = ({regionId}) => {
    console.log("::Region Moves::")

    const region = useSelector(state => selectRegionById(state, regionId))
    const movesFromRegion = useSelector(state => selectMovesFromRegion(state, regionId))
    const movesToRegion = useSelector(state => selectMovesToRegion(state, regionId))

    return (
        movesFromRegion.length === 0 && movesToRegion.length === 0 ? 
            <p className={style.noMoves}>No moves</p> 
            : 
            <List className={style.list}>
                {movesFromRegion.map(move => <MoveItem playerId={region.playerId} moveId={move.id}/>)}
                {movesToRegion.map(move => <MoveItem playerId={region.playerId} moveId={move.id}/>)}
            </List>
    )
}

export default RegionMoves