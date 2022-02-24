import React, { useState } from 'react'
import style from './InfoPanel.module.css'
import { Slide, Paper, Button, Tooltip } from '@material-ui/core'
import { Person } from '@material-ui/icons';

const InfoPanel = ({icon, tooltip, children}) => {
    console.log(":Info Panel::")

    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(!open)
    };

    return (
        <div className={style.root}>
            <Slide direction="right" in={open} mountOnEnter unmountOnExit>
                <Paper elevation={10} className={style.paper}>
                    {children}
                </Paper>
            </Slide>
            <Tooltip title={tooltip} placement="right" arrow>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={style.button}
                    startIcon={icon} 
                    onClick={handleClick}/>
            </Tooltip>
        </div>
    )
}

export default InfoPanel;