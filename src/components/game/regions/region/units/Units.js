import React from "react"
import { useSelector } from 'react-redux'
import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet';

import { selectRegionById } from '../../../../../store/region/Region.selectors'
import { selectCountryById } from '../../../../../store/country/Country.selectors'
import { selectPlayerById } from '../../../../../store/player/Player.selectors'

const Region = ({regionId}) => {
  console.log("::Units::")
  
  const region = useSelector(state => selectRegionById(state, regionId))
  const country = useSelector(state => selectCountryById(state, region?.countryId))
  const player =  useSelector(state => selectPlayerById(state, region?.playerId))
  const playerInitialCountry = useSelector(state => selectCountryById(state, player?.initialCountry))

  const lat = country?.capital.center.lat;
  const lng = country?.capital.center.lng;

  const icon = new L.Icon({
    iconUrl: player && playerInitialCountry ? playerInitialCountry.flagUrl : country?.flagUrl,
    iconRetinaUrl: player && playerInitialCountry ? playerInitialCountry.flagUrl : country?.flagUrl,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 20),
    className: 'leaflet-div-icon'
  });

  return (
    region ? 
      <Marker
        key={"Region " + region.id}
        position={[lat, lng]}
        icon={icon}>        
        <Tooltip direction="top" offset={[0, 0]} opacity={1} permanent>{region.units.ammount}</Tooltip>
      </Marker>
      :
      null
  );
}

export default Region;