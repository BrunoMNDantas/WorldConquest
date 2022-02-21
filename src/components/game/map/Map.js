import React from "react"
import { MapContainer, TileLayer } from 'react-leaflet'

const Map = ({
  height = '100vh', 
  width = '100vw', 
  center = { lat:38.973573, lng:-9.198388 }, 
  zoom = 6, 
  children}) => {
    console.log("::Map::")
    
  return (
    <MapContainer center={center} zoom={zoom} style={{height, width}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

export default React.memo(Map);