import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FieldValues } from "react-hook-form"

export type FormValues = {
  [key: string]: number | string | Record<string, string> | Record<string, string>[]
}

export type FormProps = {
  entityName?: string
  customerType?: Record<string, string>
  canEdit?: boolean
  fieldsValues?: FieldValues
  userRole?: string
}

export type FormHeader = {
  title: string
  description: string
}