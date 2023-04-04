import { useState, useEffect, FC } from 'react'

import { canI } from './utils'
import { Permissions } from "../../redux/api/types"

type CanIProps = {
  doWhat: string[] | string
  withPermissions: Permissions
  entityName: string
  children: FC<{ action: string }>
}

const CanI: FC<CanIProps> = ({ doWhat, withPermissions, entityName, children }) => {
  const [ ability, setAbility ] = useState(false)
  const [ action, setAction ] = useState('')

  useEffect(() => {
    if(Array.isArray(doWhat)) {
      doWhat.forEach(action => {
        const requestedAction = `${entityName}${action}` 
        const { actionUrl, abilityCheck } = canI(requestedAction, withPermissions)
        if(abilityCheck) {
          setAbility(abilityCheck)
          setAction(actionUrl)
        }
      })
    }
    else {
      const requestedAction = `${entityName}${doWhat}`
      const { actionUrl, abilityCheck } = canI(requestedAction, withPermissions)
      setAbility(abilityCheck)
      setAction(actionUrl)
    }
  }, [doWhat, entityName, withPermissions])

  return ability === true ? children({ action }) : null
}

export default CanI