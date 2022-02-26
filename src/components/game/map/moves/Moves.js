import React from "react"
import { useSelector } from 'react-redux'

import { selectMovesId } from '../../../../store/move/Move.selectors';

import Move from "./move/Move";

const Moves = (props) => {
  console.log("::Moves::")

  const movesIds = useSelector(selectMovesId);

  const moves = movesIds.map(moveId => <Move key={"Move:"+moveId} moveId={moveId}/>)

  return (
    <div>
      {moves}
    </div>
  );
}

export default React.memo(Moves);