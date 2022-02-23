import React from "react"
import { useSelector } from "react-redux";

import { selectRegionsId } from "../../../../store/region/Region.selectors";

import Region from './region/Region'

const Regions = () => {
  console.log("::Regions::")

  const regionsIds = useSelector(selectRegionsId) 

  const regions = regionsIds.map(regionId => <Region key={"Region:" + regionId} regionId={regionId}/>)
  
  return (
    <div>
      {regions}
    </div>
  );
}

export default React.memo(Regions);