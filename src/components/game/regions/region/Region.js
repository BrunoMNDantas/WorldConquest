import React from "react"

import Geometry from './geometry/Geometry'
import Units from './units/Units';

const Region = ({regionId}) => {
  console.log("::Region::")

  return (
    <div>
      <Geometry regionId={regionId}/>
      <Units regionId={regionId}/>
    </div>
  );
}

export default Region;