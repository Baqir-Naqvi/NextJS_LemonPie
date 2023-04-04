import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"
import { ErrorMessage } from '@hookform/error-message'

import Input, { InputProps } from './Input.component'

type CustomInputProps<TFieldValues extends FieldValues> = {
  id?: string
  name: Path<TFieldValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFieldValues>
  errors?: Partial<DeepMap<TFieldValues, FieldError | any>>
  readOnly?: boolean
  disabled?: boolean
  step?: string
  label: string
} & Omit<InputProps, "name">

function InputWrapper <TFieldValues extends Record<string, unknown>>({ 
  name,
  id,
  errors,
  register,
  rules,
  ...rest
}: CustomInputProps<TFieldValues>) {
  return (
    <FormGroup className={`${name}-container form-group`}>
      <Label for={id ?? name}>{rest.label}{rules?.required && "*"}</Label>
      <Input 
        name={name} 
        id={id ?? name} 
        placeholder={rest.placeholder ?? rest.label}
        {...rest} 
        {...(register && register(name, rules))}
      />
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

export default InputWrapper