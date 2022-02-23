import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { COLORS, DEFAULT_PLAYER_NAME, DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_INITIAL_COUNTRY } from "../../../../Constants";
import Styles from './PlayerForm.module.css'
import { TextField, Select, InputLabel, FormControl, Avatar, MenuItem, makeStyles } from "@material-ui/core"
import { CirclePicker } from 'react-color';
import { selectAllCountries } from "../../../../store/country/Country.selectors";


const PlayerForm = ({player}) => {
  console.log("::Player Form::")

  const [name, setName] = useState(player.name || DEFAULT_PLAYER_NAME)
  const [color, setColor] = useState(player.color || DEFAULT_PLAYER_COLOR)
  const [initialCountry, setInitialCountry] = useState(player.initialCountry || DEFAULT_PLAYER_INITIAL_COUNTRY)
  const countries = useSelector(selectAllCountries)

  useEffect(() => {
    player.name = name
    player.color = color
    player.initialCountry = initialCountry
  }, [name, color, initialCountry])

  return (
    <div className={Styles.root}>
      <div className={Styles.name}>
        <TextField
          id="standard-full-width"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          margin="normal"/>
      </div>

      <div className={Styles.color}>
        <TextField
            id="standard-full-width"
            label="Color"
            value={color}
            fullWidth
            margin="normal"/>
        <CirclePicker colors={COLORS} color={color} circleSize={20} onChangeComplete={color => setColor(color.hex)}/>
      </div>

      <div className={Styles.country}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={initialCountry}
            onChange={e=>setInitialCountry(e.target.value)}
            className={Styles.selectedCountry}>
            {
              countries.map(country => {
                return (
                  <MenuItem key={"PlayerForm " + country.id} value={country.name} className={Styles.selectedCountry}>
                    <img src={country.flagUrl} className={Styles.flag}></img>
                    {country.name}
                  </MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default PlayerForm;