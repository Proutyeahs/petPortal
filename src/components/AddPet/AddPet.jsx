import axios from "axios"
import { useState } from "react"

function AddPet() {

    const [image, setImage] = useState("")

    const uploadImage = () => {
        const formData = new FormData();
        formData.append("file", image)
        formData.append("upload_preset", "PetEats")
        axios.post("https://api.cloudinary.com/v1_1/dzyea2237/image/upload", formData).then((response) => {
            console.log(response)
        })
    }

    return (
        <>
            <h3>Add A New Pet</h3>
            <input type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
            <button onClick={uploadImage()}>Upload</button>
        </>
    )
}

export default AddPet