import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'
import { DropzoneProps, useDropzone } from 'react-dropzone'
import { Button } from 'reactstrap'

import ShowOnCondition from '../auth/ShowOnCondition.component'
import { useFileSizeCheckHook } from './hooks/useFileSizeCheckHook.hooks'
import AttachmentsDropzoneStyle from "./style"
import { formatBytes, handleFileDrop, maxSize } from './utils'

type AttachmentsDropzoneProps = {
  addFile: Function
  isMulti?: boolean
  openDialogWithBtn?: boolean
} & DropzoneProps

const AttachmentsDropzone = ({
  addFile,
  isMulti = true,
  openDialogWithBtn = false,
  ...rest
}: AttachmentsDropzoneProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    //Convert file to base64 and store it inside input field row
    handleFileDrop(acceptedFiles)
      .then(response => {
        if(isMulti) {
          response.forEach(file => addFile(file))
        }
        else {
          addFile(response)
        }
      })
  }, [addFile, isMulti])

  const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, open } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
      'application/msword': []
    },
    maxSize,
    multiple: isMulti,
    onDrop,
    ...rest
  })

  const isFileTooLarge = useFileSizeCheckHook(fileRejections as [])

  return (
    <AttachmentsDropzoneStyle>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />

        <ShowOnCondition showWhen={isDragActive}>
          <p>Lascia qui il file ...</p>
        </ShowOnCondition>

        <ShowOnCondition showWhen={!isDragActive}>
          <p>Clicca o trascina qui i file da caricare</p>
        </ShowOnCondition>
        
        <ShowOnCondition showWhen={isDragReject}>
          <p>Questo tipo di file non è valido.</p>
        </ShowOnCondition>
        
        {isFileTooLarge &&
          <p className="text-danger">
            La dimensione del file è troppo grande. Il limite è {formatBytes(maxSize)}.
          </p>
        }
      </div>
      <ShowOnCondition showWhen={openDialogWithBtn === true}>
        <Button
          onClick={open}
          className="mt-3"
          outline
          color="info"
        >
          <FontAwesomeIcon icon={['far', 'folder-open']} className="me-2" />
          Carica file
        </Button>
      </ShowOnCondition>
    </AttachmentsDropzoneStyle>
  )
}

export default AttachmentsDropzone