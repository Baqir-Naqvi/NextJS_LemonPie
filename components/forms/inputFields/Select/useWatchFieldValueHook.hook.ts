import { useCallback, useEffect, useState } from "react"
import { FieldValues, UseFormWatch } from "react-hook-form"

type OptionType = {
  label: string
  value: string
}

export type HookProps = {
  watch?: UseFormWatch<FieldValues>
  watchedFieldName?: string
  defaultWatchedFieldValue?: FieldValues
  triggerWatchFn?: Function
  returnedValuePropertyName?: string
}

const useWatchFieldValueHook = ({
  watchedFieldName,
  triggerWatchFn,
  watch,
  defaultWatchedFieldValue,
  returnedValuePropertyName = "value",
}: HookProps) => {
  const [options, setOptions] = useState<OptionType[] | null>(() => watchedFieldName ? [] : null)

  const updateOptions = useCallback(async(data: FieldValues, fieldProps?: FieldValues) => {
    if(triggerWatchFn) {
      const response = await triggerWatchFn(fieldProps?.name ? data[fieldProps.name][returnedValuePropertyName] : data)      
      if(response && Array.isArray(response.data)) {
        setOptions(response.data.map((value: string) => ({ label: value, value })))
      }
      else {
        setOptions(response.data)
      }
    }
  }, [triggerWatchFn, returnedValuePropertyName])

  useEffect(() => {    
    if(defaultWatchedFieldValue && defaultWatchedFieldValue[returnedValuePropertyName]) {
      updateOptions(defaultWatchedFieldValue[returnedValuePropertyName])
    }

    if(watch) {
      const subscription = watch((data, { name, type }) => {
        if(name && name === watchedFieldName && data[name][returnedValuePropertyName]) {
          updateOptions(data, { name, type })
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [watch, watchedFieldName, defaultWatchedFieldValue, updateOptions, returnedValuePropertyName])

  return options
}

export default useWatchFieldValueHook