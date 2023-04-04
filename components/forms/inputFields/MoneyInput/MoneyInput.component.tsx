import React, { FC } from 'react'

export type InputType = "text" | "number"
export type MoneyInputProps = {
  id?: string
  name: string
  placeholder?: string
  type: InputType 
  className?: string
  currency: string
  cents: string
}

const MoneyInput: FC<MoneyInputProps> = React.forwardRef(
  (
    props: MoneyInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <div className="input-group mb-3">
      <span className="input-group-text">{props.currency}</span>
      <input ref={ref} {...props} />
      <span className="input-group-text">{props.cents}</span>
    </div>
  )
)

MoneyInput.displayName = "MoneyInput"

export default MoneyInput