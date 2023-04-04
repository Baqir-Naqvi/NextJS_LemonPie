import React, { FC } from 'react'

export type TextAreaProps = {
  id?: string
  name: string
  placeholder?: string
  className?: string
}

const TextArea: FC<TextAreaProps> = React.forwardRef(
  (
    props: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>
  ) => (
    <textarea ref={ref} {...props} />
  )
)

TextArea.displayName = "TextArea"

export default TextArea