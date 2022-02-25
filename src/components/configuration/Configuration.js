import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AVATARS, COLORS } from '../../Constants'
import { buildCountries } from '../../services/country/CountryService'
import { buildPlayer, buildBots } from '../../services/player/PlayerService' 
import { buildRegions } from '../../services/region/RegionService'
import { addRegions } from '../../store/region/Region.actions'
import { addCountries } from '../../store/country/Country.actions'
import { addPlayers } from '../../store/player/Player.actions'
import { setCurrentPlayerId } from '../../store/game/Game.actions'
import ConfigurePlayerDialog from './configurePlayerDialog/ConfigurePlayerDialog'
import DifficultyDialog from './difficultyDialog/DifficultyDialog'

const Configuration = () => {
    console.log("::Configuration::")

    const dispatch = useDispatch()
    const countries = buildCountries()
    const colors = COLORS
    const avatars = AVATARS

    const [showPlayerConfig, setShowPlayerConfig] = useState(false)
    const [showDifficultyConfig, setShowDifficultyConfig] = useState(false)
    const [player, setPlayer] = useState()
    const [difficulty, setDifficulty] = useState()

    useEffect(() => {
      dispatch(addCountries(countries))
      setShowPlayerConfig(true)
    }, [dispatch])

    useEffect(() => {
        if(player && difficulty) {
          let currentPlayer = buildPlayer(player)
  
          let countriesLeft = countries.map(country => country.id).filter(countryId => countryId !== currentPlayer.initialCountry) 
          let colorsLeft = colors.filter(color => color !== currentPlayer.color)
          let avatarsLeft = avatars.filter(avatar => avatar !== currentPlayer.avatar)
          let botPlayers = buildBots(colorsLeft, avatarsLeft, countriesLeft, difficulty.level)
    
          let players = [currentPlayer, ...botPlayers]
          let regions = buildRegions(countries, players)

          dispatch(addPlayers(players))
          dispatch(setCurrentPlayerId(currentPlayer.id))
          dispatch(addRegions(regions))
        }
    }, [player, difficulty])
  
    function onPlayerConfigFinish(player) {
      setPlayer(player)

      setShowPlayerConfig(false)
      setShowDifficultyConfig(true)
    }

    function onDifficultyConfigFinish(difficulty) {
      setDifficulty(difficulty)

      setShowDifficultyConfig(false)
    }

    return (
      <div>
        <ConfigurePlayerDialog open={showPlayerConfig} onNext={onPlayerConfigFinish}/>
        <DifficultyDialog open={showDifficultyConfig} onNext={onDifficultyConfigFinish}/>
      </div>
    );
}

export default Configuration;