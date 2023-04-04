import React, { ReactNode } from "react"
import AsyncSelect from 'react-select/async'

export type AsyncProps = {
  id?: string
  name: string
  label: string
  placeholder?: string
  className?: string
  fieldLabel?: string
  initialValue?: any
  isClearable?: boolean
  isMulti?: boolean
  isDisabled?: boolean
  noOptionsMessage?: () => ReactNode
  onChange?: (e: any) => void
}

const Async = React.forwardRef(
  (
    props: AsyncProps,
    ref: React.Ref<HTMLSelectElement>
  ) => (
    <AsyncSelect
      classNamePrefix="custom-select"
      {...props}
    />
  )
)

Async.displayName = "Async"

export default Async