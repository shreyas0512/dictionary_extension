import { useEffect, useState } from "react"

import type { WikiMessage } from "~background"

function IndexPopup() {
  const [data, setData] = useState("")
  const [selectionText, setSelectionText] = useState("word")

  chrome.storage.sync.get(["dict1"], function (result) {
    setSelectionText(result.dict1)
    // Do something with the dict1 value
  })

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>Welcome to your {selectionText} Extension!</h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
