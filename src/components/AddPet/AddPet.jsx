import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import './AddPet.css'

function AddPet() {
    useEffect(() => {
        dispatch({ type: 'GET_SPECIES' })
    }, [])

    const dispatch = useDispatch();
    const history = useHistory()

    const allSpecies = useSelector((store) => store.species);

    const [pet, setPet] = useState({ name: '', picture: '', description: '', birthday: '', species: 0})


    const addPet = () => {
        console.log(pet)
        dispatch({
            type: 'POST_PET',
            payload: pet
        })
        setTimeout(() => { history.push('/') }, 500)
    }

    return (
        <>
            <div className="align">
                <h3>Add A New Pet</h3>
                <div>
                    <select onChange={(e) => setPet({ ...pet, species: e.target.value })}>
                        {allSpecies.map(species => (
                            <option key={species.id} value={species.id}>{species.species_name}</option>
                        ))}
                    </select>
                </div>
                <input type="text" value={pet.name} placeholder="Name" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
                <input type="text" value={pet.description} placeholder="Description" onChange={(e) => setPet({ ...pet, description: e.target.value })} />
                <input type="text" value={pet.birthday} placeholder="Birthday" onChange={(e) => setPet({ ...pet, birthday: e.target.value })} />
                <input type="text" value={pet.picture} placeholder="URL" onChange={(e) => setPet({ ...pet, picture: e.target.value })} />
                <div>
                    <p>Make sure all your data is correct</p>
                </div>
                <button onClick={addPet}>Add Pet and Return Home</button>
            </div>
        </>
    )
}

export default AddPet