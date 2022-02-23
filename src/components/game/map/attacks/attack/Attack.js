import React from "react"
import { useSelector } from 'react-redux'
import { selectAttackById } from '../../../../../store/attack/Attack.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors'
import { selectCountryById } from '../../../../../store/country/Country.selectors'
import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';


const Attack = ({attackId}) => {
  console.log("::Attack::")

  const attack = useSelector(state => selectAttackById(state, attackId))
  const fromPlayer =  useSelector(state => selectPlayerById(state, attack?.fromPlayerId))
  const fromPlayerInitialCountry = useSelector(state => selectCountryById(state, fromPlayer?.initialCountry))

  const lat = attack?.position.lat;
  const lng = attack?.position.lng;

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
        attack ? 
        <Marker
          key={"Attack " + attack.id}
          position={[lat, lng]}
          icon={icon}>        
          <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>{attack.units}</Tooltip>
        </Marker>
        :
        null
      }
    </div>
  );
}

export default Attack;