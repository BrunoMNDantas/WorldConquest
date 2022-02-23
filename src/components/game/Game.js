import React, { useEffect, useState } from 'react'
import Map from './map/Map'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'

import { runEngine } from '../../services/game/GameEngine'
import { useSelector } from 'react-redux'
import { selectWinner, selectCurrentPlayerLost } from '../../store/game/Game.selectors'

const SimpleDialog = ({open, title, onOk}) => {
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogActions>
                <Button color="primary" onClick={onOk}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const Game = () => {
    console.log("::Game::")
    
    const currentPlayerLost = useSelector(selectCurrentPlayerLost)
    const winner = useSelector(selectWinner)

    const [showCurrentPlayerLostDialog, setShowCurrentPlayerLostDialog] = useState(false)
    const [showWinnerDialog, setShowWinnerDialog] = useState(false)

    useEffect(() => runEngine(), [])
    useEffect(() => {
        if(currentPlayerLost)
            setShowCurrentPlayerLostDialog(true)
    }, [currentPlayerLost])
    useEffect(() => {
        if(winner)        
            setShowWinnerDialog(true)
    }, [winner])

    return (
        <div>
            <Map/>
            <SimpleDialog open={showCurrentPlayerLostDialog} title={"You lost!"} onOk={() => setShowCurrentPlayerLostDialog(false)}/>
            <SimpleDialog open={showWinnerDialog} title={winner + " won!"} onOk={() => setShowWinnerDialog(false)}/>
        </div>
    )
} 

export default React.memo(Game);