import { Locale } from 'date-fns'
import React, { FC } from 'react'
import ReactDatePicker from "react-datepicker"

export const handleSelection = (value: Date | string | null) => {
  if(value) {
    const d = new Date(value)
    const ye = new Intl.DateTimeFormat('it', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('it', { month: '2-digit' }).format(d)
    const da = new Intl.DateTimeFormat('it', { day: '2-digit' }).format(d)
    const parsedDate = Date.UTC(parseInt(ye), parseInt(mo) - 1, parseInt(da), 0, 0)    
    return new Date(parsedDate)
  }
}

export type DatePickerProps = {
  id?: string
  name: string
  label: string
  placeholderText?: string
  className?: string
  locale?: string | Locale
  selected?: Date
  showMonthDropdown?: boolean
  showYearDropdown?: boolean
  readOnly?: boolean
  dateFormat?: string
  maxDate?: Date
  minDate?: Date
  disabled?: boolean
  adjustDateOnChange?: boolean
  onChange: (...event: any[]) => void
}

const DatePicker: FC<DatePickerProps> = React.forwardRef(
  (
    props: DatePickerProps,
    ref: React.Ref<HTMLInputElement>
  ) => (
    <ReactDatePicker
      {...props}
    />
  )
)

DatePicker.displayName = 'DatePicker'

export default DatePicker