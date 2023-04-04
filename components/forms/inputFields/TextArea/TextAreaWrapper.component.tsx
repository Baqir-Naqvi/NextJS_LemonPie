import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"
import { ErrorMessage } from '@hookform/error-message'

import TextArea, { TextAreaProps } from './TextArea.component'

type CustomTextAreaProps<TFieldValues extends FieldValues> = {
  id?: string
  name: Path<TFieldValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFieldValues>
  errors?: Partial<DeepMap<TFieldValues, FieldError | any>>
  readOnly?: boolean
  disabled?: boolean
  label: string
  step?: string
} & Omit<TextAreaProps, "name">

function TextAreaWrapper <TFieldValues extends Record<string, unknown>>({ 
  name,
  id,
  errors,
  register,
  rules,
  label,
  ...rest
}: CustomTextAreaProps<TFieldValues>) {
  return (
    <FormGroup>
      <Label for={id ?? name}>{label}{rules?.required && "*"}</Label>
      <TextArea
        name={name} 
        id={id ?? name} 
        placeholder={rest.placeholder ?? label}
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

export default TextAreaWrapper