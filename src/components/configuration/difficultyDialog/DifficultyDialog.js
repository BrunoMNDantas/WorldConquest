import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core"
import { Rating } from '@material-ui/lab';
import { useState } from "react"
import { DIFFICULTY_LEVELS } from "../../../Constants"

const DifficultyDialog = ({open, onNext}) => {
    console.log("::Difficulty Dialog::")

    const difficulties = DIFFICULTY_LEVELS
    const [difficulty, setDifficulty] = useState(difficulties[0])

    function selectDifficulty(index) {
        setDifficulty(difficulties[index])
    }

    function handleFinish() {
      onNext(difficulty)
    }
    
    return (
      <Dialog open={open}>
        <DialogTitle style={{textAlign: "center"}}>Select Difficulty</DialogTitle>
        <DialogContent style={{textAlign: "center", marginTop:"10px", marginBottom:"10px"}}>
            <Rating
                name="simple-controlled"
                value={difficulty.level}
                max={difficulties.length}
                color="red"
                onChange={(event, newValue) => selectDifficulty(newValue-1)}/>
            <Typography component="legend">{difficulty.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleFinish}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default DifficultyDialog;