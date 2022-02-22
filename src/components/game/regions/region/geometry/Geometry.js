import { useSelector } from 'react-redux'
import { NO_PLAYER_COLOR } from '../../../../../Constants'
import { Polygon } from 'react-leaflet'

import { selectRegionById } from '../../../../../store/region/Region.selectors'
import { selectCountryById } from '../../../../../store/country/Country.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors'
import { selectSelectedRegionId } from '../../../../../store/game/Game.selectors'

import { selectRegion } from "../../../../../services/game/GameEngine";

const Geometry = ({regionId}) => {
  console.log("::Geometry::")

  const region = useSelector(state => selectRegionById(state, regionId))
  const selectedRegionId = useSelector(selectSelectedRegionId)
  const country = useSelector(state => selectCountryById(state, region?.countryId))
  const player =  useSelector(state => selectPlayerById(state, region?.playerId))

  let positions = country ? country.area.map(area => area.map(coords => [coords.lat, coords.lng])) : []
  const pathOptions = { 
    color: player ? player.color : NO_PLAYER_COLOR,
    opacity: selectedRegionId === regionId ? 1 : 0.3,
    fillColor: player ? player.color : NO_PLAYER_COLOR,
    fillOpacity: selectedRegionId === regionId ? 0.60 : 0.35
  }

  function onClick() {
    selectRegion(regionId)
  }

  return <Polygon pathOptions={pathOptions} positions={positions}  eventHandlers={{click: onClick}}/>
}

export default Geometry;