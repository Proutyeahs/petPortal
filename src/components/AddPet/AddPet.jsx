import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AddPet() {
    useEffect(() => {
        dispatch({ type: 'GET_SPECIES' })
    }, [])

    const dispatch = useDispatch();

    const allSpecies = useSelector((store) => store.species);

    const [image, setImage] = useState("")
    const [pet, setPet] = useState({ user_id: '', name: '', picture: '', description: '', birthday: '', species: '' })

    const uploadImage = () => {
        console.log(image)
        const formData = new FormData();
        formData.append("file", image)
        formData.append("upload_preset", "PetEats")
        axios.post("https://api.cloudinary.com/v1_1/dzyea2237/image/upload", formData).then((response) => {
            console.log('yo', response.data.url)
            setPet({ ...pet, picture: response.data.url })
            setTimeout(() => { 
                console.log(pet)
                dispatch({
                    type: 'POST_PET',
                    payload: pet
                })}, 500)
        })
    }

    return (
        <>
            <h3>Add A New Pet</h3>
            <div >
                <select onChange={(e) => setPet({ ...pet, speacies: e.target.value })}>
                    {allSpecies.map(species => (
                        <option key={species.id} value={species.id}>{species.species_name}</option>
                    ))}
                </select>
            </div>
            <input type="text" value={pet.name} placeholder="Name" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
            <input type="text" value={pet.description} placeholder="Description" onChange={(e) => setPet({ ...pet, description: e.target.value })} />
            <input type="date" value={pet.birthday} placeholder="Birthday" onChange={(e) => setPet({ ...pet, birthday: e.target.value })} />
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            <button onClick={uploadImage}>Save Pet</button>
        </>
    )
}

export default AddPet