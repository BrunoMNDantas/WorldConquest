import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux'
import { COLORS, DEFAULT_PLAYER_NAME, DEFAULT_PLAYER_COLOR, DEFAULT_PLAYER_INITIAL_COUNTRY, DEFAULT_PLAYER_AVATAR, AVATARS } from "../../../../Constants";
import Styles from './PlayerForm.module.css'
import { TextField, Select, InputLabel, FormControl, MenuItem } from "@material-ui/core"
import { CirclePicker } from 'react-color';
import { selectAllCountries } from "../../../../store/country/Country.selectors";


const PlayerForm = ({player}) => {
  console.log("::Player Form::")

  const [name, setName] = useState(player.name || DEFAULT_PLAYER_NAME)
  const [color, setColor] = useState(player.color || DEFAULT_PLAYER_COLOR)
  const [initialCountry, setInitialCountry] = useState(player.initialCountry || DEFAULT_PLAYER_INITIAL_COUNTRY)
  const [avatar, setAvatar] = useState(player.avatar || DEFAULT_PLAYER_AVATAR)

  const countries = useSelector(selectAllCountries)

  useEffect(() => {
    player.name = name
    player.color = color
    player.initialCountry = initialCountry
    player.avatar = avatar
  }, [name, color, initialCountry, avatar, player])

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
          <InputLabel>Country</InputLabel>
          <Select
            value={initialCountry}
            onChange={e=>setInitialCountry(e.target.value)}
            className={Styles.selectedCountry}>
            {
              countries.map(country => {
                return (
                  <MenuItem key={"PlayerFormCountry " + country.id} value={country.name} className={Styles.selectedCountry}>
                    <img src={country.flagUrl} className={Styles.flag} alt=""/>
                    {country.name}
                  </MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>

      <div className={Styles.avatar}>
        <FormControl>
          <InputLabel>Avatar</InputLabel>
          <Select
            value={avatar}
            onChange={e=>setAvatar(e.target.value)}
            className={Styles.selectedAvatar}>
            {
              AVATARS.map((avatar, idx)=> {
                return (
                  <MenuItem key={"PlayerFormAvatar " + idx} value={avatar} className={Styles.selectedAvatar}>
                    <img src={avatar} className={Styles.avatarImage} alt=""/>
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