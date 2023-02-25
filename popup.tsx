import { useEffect, useState } from "react"
import { Grid } from "react-loader-spinner"

import type { WikiMessage } from "~background"

import "./popup.css"

function IndexPopup() {
  const [selectionText, setSelectionText] = useState("")
  const [definition, setDefinition] = useState("")
  const [phonetics, setPhonetics] = useState("")
  const [pos, setPos] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedValue, setSelectedValue] = useState("What is")
  const [opai, setOpai] = useState("")
  const [prompt, setPrompt] = useState("")
  const [textfd, setTextfd] = useState(selectionText)

  const handleDrop = (e) => {
    setSelectedValue(e.target.value)
  }

  const handleText = (e) => {
    setTextfd(e.target.value)
  }
  useEffect(() => {
    setPrompt(`${selectedValue} ${textfd} ?`)
    console.log(selectedValue)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectionText}`)
      .then((response) => response.json())
      .then((data) => {
        // Parse the data and update the state with the definition
        const firstDefinition = data[0].meanings[0].partOfSpeech
        console.log(firstDefinition + "first")
        setPos(firstDefinition)
        const def = data[0].meanings[0].definitions[0].definition
        const phon = data[0].phonetic
        console.log("phon" + phon)
        console.log(def + "def")
        setDefinition(def)
        setPhonetics(phon)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
        setDefinition("No definition found")
      })
  })

  useEffect(() => {
    chrome.storage.sync.get(["dict1"], function (result) {
      setSelectionText(result.dict1)
    })
  }, [])

  useEffect(() => {
    if (selectionText) {
      setTextfd(selectionText)
    }
  }, [selectionText])

  //gpt api fetch

  const OpenAI = require("openai-api")

  const openai = new OpenAI(process.env.OPENAI_API_KEY)
  const key = process.env.OPENAI_API_KEY
  const generateText = async (text) => {
    setOpai("")
    setIsLoading(true)
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `  ${prompt} `,
        max_tokens: 75,
        temperature: 0.5
      })
    })

    const data = await response.json()
    console.log(data)
    setIsLoading(false)
    setOpai(data.choices[0].text)
  }

  return (
    <div
      className="body"
      style={{
        display: "flex",
        flexDirection: "column"
      }}>
      <div className="dict" style={{ paddingBottom: "3px" }}>
        <h2 className="dictname">{selectionText}</h2>
        <h2 className="phon">{phonetics}</h2>
        <h2 className="pos">{pos}</h2>

        <p>{definition}</p>
      </div>

      <div className="gpt">
        <h2 className="query">Ask GPT</h2>
        <select
          className="queryopt"
          value={selectedValue}
          onChange={handleDrop}>
          <option selected value="What is">
            What is
          </option>
          <option value="Where is">Where is</option>
          <option value="Who is">Who is</option>
          <option value="When is">When is</option>
        </select>
        <input
          onChange={handleText}
          className="queryinput"
          type="text"
          defaultValue={selectionText}
        />
        <button className="querybtn" onClick={generateText}>
          Search
        </button>
        <div
          className="loader"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px"
          }}>
          <Grid height="60" width="60" color="black" visible={isLoading} />
        </div>
        <p className="gpttext">{opai}</p>
      </div>
    </div>
  )
}

export default IndexPopup
