import React, { FC } from 'react'

export type InputProps = {
  id?: string
  name: string
  label: string | JSX.Element
  placeholder?: string
  className?: string
}

const Radio: FC<InputProps> = React.forwardRef(
  (
    props: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <input type="radio" ref={ref} {...props} />
  )
)

Radio.displayName = "Radio"

export default Radio