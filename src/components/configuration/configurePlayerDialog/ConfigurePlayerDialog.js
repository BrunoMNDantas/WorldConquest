import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PlayerForm from './playerForm/PlayerForm';


const ConfigurePlayerDialog = ({open, onFinish}) => {
  console.log("::Configure Player Dialog::")
 
  const player = {}

  const handleFinish = () => {
    onFinish(player)
  }
  
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" style={{textAlign: "center"}}>Configure Player</DialogTitle>
      <DialogContent>
        <PlayerForm player={player}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleFinish}>
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfigurePlayerDialog;