import React from "react"
import { useSelector } from 'react-redux'

import { selectAttacksId } from '../../../store/attack/Attack.selectors';

import Attack from "./attack/Attack";

const Attacks = (props) => {
  console.log("::Attacks::")

  const attacksIds = useSelector(selectAttacksId);

  const attacks = attacksIds.map(attackId => <Attack key={"Attack:"+attackId} attackId={attackId}/>)

  return (
    <div>
      {attacks}
    </div>
  );
}

export default React.memo(Attacks);