import { ErrorMessage } from "@hookform/error-message"
import { Control, Controller, DeepMap, FieldError, FieldValues, Path, RegisterOptions } from "react-hook-form"
import { FormGroup, Label } from "reactstrap"
import DatePicker, { DatePickerProps, handleSelection } from "./DatePicker.component"

type CustomDatePickerProps<TFieldValues extends FieldValues> = {
  id?: string
  name: Path<TFieldValues>
  label: string
  placeholder?: string
  rules?: RegisterOptions
  errors?: Partial<DeepMap<TFieldValues, FieldError | any>>
  control: Control<FieldValues, any>
  initialValue?: any
} & Omit<DatePickerProps, "name" | "onChange">

const DatePickerWrapper = <TFieldValues extends Record<string, unknown>>({
  name,
  id,
  errors,
  control,
  rules,
  initialValue,
  ...rest
}: CustomDatePickerProps<TFieldValues>) => {
  return (
    <FormGroup>
      <Label for={id ?? name}>{rest.label}{rules && "*"}</Label>
      <Controller
        control={control}
        name={name}
        defaultValue={initialValue && new Date(initialValue)}
        rules={rules}
        render={({ field }) => (
          <DatePicker 
            adjustDateOnChange={true}
            placeholderText={rest.placeholder ?? rest.label}
            {...field}
            {...rest}
            selected={field.value}
            onChange={input => field.onChange(handleSelection(input))}
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

export default DatePickerWrapper