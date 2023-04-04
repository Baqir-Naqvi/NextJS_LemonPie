export const maxSize = 20971520

export function formatBytes(a: number,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}

export const toBase64 = (file: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

export const handleFileDrop = (acceptedFiles: any) => {
  return Promise.all(acceptedFiles.map((file: any) => {
      return toBase64(file).then(encoded => new Promise((resolve, reject) => {
        file.encoded = encoded
        resolve(file)
      }))
    }))
    .then(updated => {
      //Set file objects from File
      const newFiles = updated.map(file => ({
        id: null,
        userFileName: file.name,
        attachmentTypeId: null,
        fileBase64: file.encoded,
      }))

      return newFiles
    })
}

export const checkFileTooLarge = (fileRejections: any[]) => {
  if(fileRejections.length) {
    fileRejections.forEach(rejection => {
      const { code } = rejection.errors[0]
      if(code === "file-too-large") {
        return true
      }
    })
  }
  return false
}