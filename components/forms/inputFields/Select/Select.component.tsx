import React from "react"
import ReactSelect from "react-select"

export type SelectProps = {
  id?: string
  name: string
  label: string
  placeholder?: string
  className?: string
  isDisabled?: boolean
  onChange?: (e: any) => void
}

const Select = React.forwardRef(
  (
    props: SelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => (
    <ReactSelect
      classNamePrefix="custom-select"
      {...props}
    />
  )
)

Select.displayName = "Select"

export default Select