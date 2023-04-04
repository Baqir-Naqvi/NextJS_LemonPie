import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"
import { ErrorMessage } from '@hookform/error-message'

import Radio, { InputProps } from './Radio.component'

type CustomInputProps<TFieldValues extends FieldValues> = {
  id?: string
  name: Path<TFieldValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFieldValues>
  errors?: Partial<DeepMap<TFieldValues, FieldError>>
  readOnly?: boolean
  disabled?: boolean
  value: any
  defaultChecked?: boolean
} & Omit<InputProps, "name">

function RadioWrapper <TFieldValues extends Record<string, unknown>>({ 
  name,
  id,
  errors,
  register,
  rules,
  ...rest
}: CustomInputProps<TFieldValues>) {
  return (
    <FormGroup
      check
      inline
    >
      <Radio 
        name={name} 
        id={id ?? name} 
        {...rest} 
        {...(register && register(name, rules))}
      />
      <Label check for={id}>{rest.label}{rules?.required && "*"}</Label>
      {errors &&
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <div className="invalid-feedback d-block">
              {message}
            </div>
          )}
        />
      }
    </FormGroup>
  )
}

export default RadioWrapper