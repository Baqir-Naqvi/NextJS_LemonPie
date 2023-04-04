import React, { FC } from 'react'

export type InputType = "text" | "number" | "password" | "email" | "hidden"
export type InputProps = {
  id?: string
  name: string
  placeholder?: string
  type: InputType 
  className?: string
}

const Input: FC<InputProps> = React.forwardRef(
  (
    props: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <input ref={ref} {...props} />
  )
)

Input.displayName = "Input"

export default Input