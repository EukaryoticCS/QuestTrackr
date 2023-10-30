import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function NewGame() {

    const [file, setFile] = useState()
    const [title, setTitle] = useState("")

    const navigate = useNavigate()

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("cover", file)
        formData.append("title", title)
        await axios.post("/api/v1/games", formData, { headers: { 'Content-Type': 'multipart/form-data' } })

        navigate("/")
    }

    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    return (
        <div className="flex flex-col items-center justify-center">

            <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
                <input onChange={fileSelected} type="file" accept="cover/*"></input>
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Title'></input>
                <button type="submit">Submit</button>
            </form>

        </div>
    )
}