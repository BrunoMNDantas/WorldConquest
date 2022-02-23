import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import PlayerForm from './playerForm/PlayerForm';


const ConfigurePlayerDialog = ({open, onNext}) => {
  console.log("::Configure Player Dialog::")
 
  const player = {}

  const handleFinish = () => {
    onNext(player)
  }
  
  return (
    <Dialog open={open}>
      <DialogTitle style={{textAlign: "center"}}>Configure Player</DialogTitle>
      <DialogContent>
        <PlayerForm player={player}/>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleFinish}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfigurePlayerDialog;