import React from "react"
import Moves from './moves/Moves'
import Regions from './regions/Regions'
import { MapContainer, TileLayer } from 'react-leaflet'
import { useSelector } from "react-redux"
import { selectCurrentPlayerId } from "../../../store/game/Game.selectors"
import { selectInitialCountryOfPlayer } from "../../../store/player/Player.selectors"
import { selectCountryById } from "../../../store/country/Country.selectors"

const Map = ({
  height = '100vh', 
  width = '100vw', 
  center = { lat:38.973573, lng:-9.198388 }, 
  zoom = 6}) => {
  console.log("::Map::")

  let currentPlayerId = useSelector(selectCurrentPlayerId)
  let currentPlayerInitialCountry = useSelector(state => selectInitialCountryOfPlayer(state, currentPlayerId))
  let country = useSelector(state => selectCountryById(state, currentPlayerInitialCountry))
    
  return (
    <MapContainer center={country ? country.capital.center : center} zoom={zoom} style={{height, width}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Regions/>
      <Moves/>
    </MapContainer>
  );
}

export default React.memo(Map);