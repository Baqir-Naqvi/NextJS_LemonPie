import { useEffect } from "react"
import { FieldValues, UseFormSetValue, UseFormWatch } from "react-hook-form"

type WhenFieldChangesHookProps = {
  watch: UseFormWatch<FieldValues>
  field: string
  set: string
  to: null | string | FieldValues | number
  setValue: UseFormSetValue<FieldValues>
}
export const useWhenFieldChangesHook = ({
  watch,
  field,
  set,
  to,
  setValue
}: WhenFieldChangesHookProps) => {
  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      if(name === field) {
        setValue(set, to)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, field, set, to, setValue])
}