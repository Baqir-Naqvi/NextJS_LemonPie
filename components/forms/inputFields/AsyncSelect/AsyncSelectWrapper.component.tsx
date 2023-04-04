import { ErrorMessage } from "@hookform/error-message"
import { Control, Controller, DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"

import Async, { AsyncProps } from './Async.component'

type CustomAsyncSelectProps<TFieldValues extends FieldValues> = {
  id?: string
  name: Path<TFieldValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFieldValues>
  errors?: Partial<DeepMap<TFieldValues, FieldError>> 
  control: Control<FieldValues, any>
  loadOptions: Function
  getOptionLabel?: (option: FieldValues) => string
  getOptionValue?: (option: FieldValues) => string
  isClearable?: boolean
  isMulti?: boolean
  whenFieldChanges?: (e: any) => void
  loadingMessage?: () => string | JSX.Element
} & Omit<AsyncProps, "name">

const AsyncSelectWrapper = <TFieldValues extends Record<string, unknown>>({
  name,
  id,
  errors,
  control,
  rules,
  isClearable = false,
  isMulti = false,
  whenFieldChanges,
  ...rest
}: CustomAsyncSelectProps<TFieldValues>) => {
  return (
    <FormGroup>
      <Label for={id ?? name}>{rest.label}{rules && "*"}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={rest.initialValue}
        render={({ field: { onChange, ...fieldRest } }) => (
          <Async 
            id={id ?? name}
            isMulti={isMulti}
            isClearable={isClearable}
            onChange={e => {
              if(whenFieldChanges) {
                whenFieldChanges(e)
              }
              onChange(e)
            }}
            {...rest}
            {...fieldRest}
          />
        )}
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

export default AsyncSelectWrapper