import React from "react"
import { useSelector } from 'react-redux'
import { selectMoveById } from '../../../../../store/move/Move.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors'
import { selectCountryById } from '../../../../../store/country/Country.selectors'
import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';


const Move = ({moveId}) => {
  console.log("::Move::")

  const move = useSelector(state => selectMoveById(state, moveId))
  const fromPlayer =  useSelector(state => selectPlayerById(state, move?.fromPlayerId))
  const fromPlayerInitialCountry = useSelector(state => selectCountryById(state, fromPlayer?.initialCountry))

  const lat = move?.position.lat;
  const lng = move?.position.lng;

  const icon = new L.Icon({
    iconUrl: fromPlayer && fromPlayerInitialCountry ? fromPlayerInitialCountry.flagUrl : "",
    iconRetinaUrl: fromPlayer && fromPlayerInitialCountry ? fromPlayerInitialCountry.flagUrl : "",
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 20),
    className: 'leaflet-div-icon'
  });

  return (
    <div>
      {
        move ? 
        <Marker
          key={"Move " + move.id}
          position={[lat, lng]}
          icon={icon}>        
          <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>{move.units}</Tooltip>
        </Marker>
        :
        null
      }
    </div>
  );
}

export default Move;