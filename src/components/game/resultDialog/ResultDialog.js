import { useSelector } from "react-redux";
import Styles from "./ResultDialog.module.css";
import { selectResult } from "../../../store/game/Game.selectors";
import { Dialog, DialogTitle, DialogContent, Badge } from '@material-ui/core';
import { InsertEmoticonTwoTone, SentimentDissatisfiedTwoTone } from '@material-ui/icons';


const ResultDialog = ({open}) => {
    console.log("::Result::")

    const result = useSelector(selectResult);

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{result.won ? "You won!" : "You lost!"}</DialogTitle>
            <DialogContent className={Styles.content}>
                {
                    result.won ?
                        <Badge>
                            <InsertEmoticonTwoTone />
                        </Badge>
                        :
                        <Badge>
                            <SentimentDissatisfiedTwoTone />
                        </Badge>
                }
            </DialogContent>
        </Dialog>
    )
};

export default ResultDialog;