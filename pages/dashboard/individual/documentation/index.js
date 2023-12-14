import { useState, useRef } from "react"

export default function Documentation() {
  const inputFileRef = useRef(null)
  const [blob, setBlob] = useState(null)
  return (
    <div className="mt-24">
      <h1>Upload your document</h1>

      <form
        onSubmit={async event => {
          event.preventDefault()

          const file = inputFileRef.current.files[0]

          const response = await fetch(
            `/api/documentation/upload?filename=${file.name}`,
            {
              method: "POST",
              body: file
            }
          )

          const newBlob = await response.json()

          setBlob(newBlob)
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </div>
  )
}
