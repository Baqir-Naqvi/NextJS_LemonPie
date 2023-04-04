import { useEffect, useState } from "react"
import { checkFileTooLarge } from "../utils"

export const useFileSizeCheckHook = (fileRejections: []) => {
  const [ isFileTooLarge, setIsFileTooLarge ] = useState(false)
  useEffect(() => {
    if(checkFileTooLarge(fileRejections)) {
      setIsFileTooLarge(true)
    }
    else {
      setIsFileTooLarge(false)
    }
  }, [fileRejections])

  return isFileTooLarge
}