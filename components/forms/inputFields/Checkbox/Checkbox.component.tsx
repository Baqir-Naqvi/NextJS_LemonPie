import React, { FC } from 'react'

export type InputProps = {
  id?: string
  name: string
  label: string | JSX.Element
  placeholder?: string
  className?: string
}

const Checkbox: FC<InputProps> = React.forwardRef(
  (
    props: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <input type="checkbox" ref={ref} {...props} />
  )
)

Checkbox.displayName = "Checkbox"

export default Checkbox