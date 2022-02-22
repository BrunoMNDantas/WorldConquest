import React, { useEffect } from 'react'
import Attacks from './attacks/Attacks'
import Regions from './regions/Regions'
import Map from './map/Map'
import Result from './resultDialog/ResultDialog'

import { runEngine } from '../../services/GameEngine'
import { useSelector } from 'react-redux'
import { selectResult } from '../../store/game/Game.selectors'

const Game = () => {
    console.log("::Game::")

    const result = useSelector(selectResult)

    useEffect(() => runEngine(), [])

    return (
        <div>
            <Map>
                <Regions/>
                <Attacks/>
            </Map>
            {result ? <Result open={result}/> : null}
        </div>
    )
} 

export default React.memo(Game);