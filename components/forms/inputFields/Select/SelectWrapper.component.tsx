import { ErrorMessage } from "@hookform/error-message"
import { Control, Controller, DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import { FormGroup, FormText, Label } from "reactstrap"

import Select, { SelectProps } from './Select.component'
import useWatchFieldValueHook, { HookProps } from "./useWatchFieldValueHook.hook"

type CustomSelectProps<TFieldValues extends FieldValues> = {
  id?: string
  name: Path<TFieldValues>
  rules?: RegisterOptions
  register?: UseFormRegister<TFieldValues>
  errors?: Partial<DeepMap<TFieldValues, FieldError | any>>
  control: Control<FieldValues, any>
  options?: FieldValues
  filterOption?: (candidate: FieldValues, input?: string) => boolean
  noOptionsMessage?: () => JSX.Element
  getOptionLabel?: (option: FieldValues) => string | JSX.Element
  getOptionValue?: (option: FieldValues) => string
  initialValue?: any
  whenFieldChanges?: () => void
  fieldDescription?: string
  watchedFieldProps?: HookProps
  loadingMessage?: () => string | JSX.Element
} & Omit<SelectProps, "name"> & HookProps

const SelectWrapper = <TFieldValues extends Record<string, unknown>>({
  name,
  id,
  errors,
  register,
  control,
  rules,
  whenFieldChanges,
  fieldDescription,
  watchedFieldProps,
  ...rest
}: CustomSelectProps<TFieldValues>) => {
  const options = useWatchFieldValueHook(watchedFieldProps ?? {})

  return (
    <FormGroup>
      <Label for={id ?? name}>{rest.label}{rules?.required && "*"}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={rest.initialValue}
        render={({ field: { onChange, ...fieldRest } }) => (
          <Select 
            placeholder={rest.placeholder || rest.label}
            id={id ?? name}
            onChange={e => {
              if(whenFieldChanges) {
                whenFieldChanges()
              }
              onChange(e)
            }}
            options={options ?? rest.options}
            {...rest}
            {...fieldRest}
          />
        )}
      />
      {fieldDescription &&
        <FormText color="muted">
          {fieldDescription}
        </FormText>
      }
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

export default SelectWrapper