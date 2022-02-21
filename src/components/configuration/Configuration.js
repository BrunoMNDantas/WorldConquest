import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COLORS } from '../../Constants'
import { buildCountries } from '../../services/CountryService'
import { buildPlayer, buildBots } from '../../services/PlayerService' 
import { buildRegions } from '../../services/RegionService'
import { addRegions } from '../../store/region/Region.actions'
import { addCountries } from '../../store/country/Country.actions'
import { addPlayers } from '../../store/player/Player.actions'
import { setCurrentPlayerId } from '../../store/game/Game.actions'
import ConfigurePlayerDialog from './configurePlayerDialog/ConfigurePlayerDialog'

const Configuration = () => {
    console.log("::Configuration::")

    const dispatch = useDispatch()
    const countries = buildCountries()
    const colors = COLORS
    const [configOpen, setConfigOpen] = useState(true)

    useEffect(() => {
      dispatch(addCountries(countries))
    }, [dispatch])
  
    function onFinish(player) {
      let currentPlayer = buildPlayer(player)

      let countriesLeft = countries.map(country => country.id).filter(countryId => countryId !== currentPlayer.initialCountry) 
      let colorsLeft = colors.filter(color => color !== currentPlayer.color)
      let botPlayers = buildBots(colorsLeft, countriesLeft)

      let players = [currentPlayer, ...botPlayers]
      let regions = buildRegions(countries, players)
 
      dispatch(addPlayers(players))
      dispatch(setCurrentPlayerId(currentPlayer.id))
      dispatch(addRegions(regions))
  
      setConfigOpen(false)
    }
  
    return (
        <ConfigurePlayerDialog open={configOpen} onFinish={onFinish}/>
    );
}

export default Configuration;