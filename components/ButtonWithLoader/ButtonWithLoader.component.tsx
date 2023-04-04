import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, ButtonProps, Spinner } from "reactstrap"
import classNames from 'classnames'

import ShowOnCondition from "../auth/ShowOnCondition.component"

type ButtonWithLoaderProps = {
  label?: string
  fontAwesomeIcon?: IconProp
  fontAwesomeSize?: SizeProp
  isLoading: boolean
} & ButtonProps

const ButtonWithLoader = ({
  label,
  fontAwesomeIcon,
  fontAwesomeSize,
  isLoading,
  ...rest
}: ButtonWithLoaderProps) => {
  return (
    <Button {...rest}>
      <ShowOnCondition showWhen={isLoading}>
        <Spinner 
          size="sm" 
          className={classNames({
            "me-2": !!label
          })}
        />
      </ShowOnCondition>
      <ShowOnCondition showWhen={!!fontAwesomeIcon && isLoading === false}>
        <FontAwesomeIcon 
          size={fontAwesomeSize}
          icon={fontAwesomeIcon!} 
          className={classNames({
            "me-2": !!label
          })}
        />
      </ShowOnCondition>
      <ShowOnCondition showWhen={!!label}>
        <span>{label}</span>
      </ShowOnCondition>
    </Button>
  )
}

export default ButtonWithLoader