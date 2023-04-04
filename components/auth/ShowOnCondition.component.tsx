import { ReactNode } from "react"

type ShowOnConditionProps = {
  showWhen: boolean
  children: ReactNode
}

const ShowOnCondition = ({
  showWhen,
  children
}: ShowOnConditionProps) => {
  if(showWhen) return <>{children}</>
  return <></>
}

export default ShowOnCondition