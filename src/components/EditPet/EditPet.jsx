import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

function EditPet() {
    useEffect(() => {
        reload(id)
        dispatch({ type: 'GET_SPECIES' })
    }, [])
    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
    }

    const dispatch = useDispatch();
    const history = useHistory()

    const details = useSelector((store) => store.details)
    const allSpecies = useSelector((store) => store.species);

    const [pet, setPet] = useState({ name: '', picture: '', description: '', birthday: '', species: '' })

    const editPet = () => {
        for (let detail of details) {
            console.log("ugh", detail)
            if (pet.name === '') {
                pet.name = detail.name
            }
            if (pet.picture === '') {
                pet.picture = detail.picture
            }
            if (pet.description === '') {
                pet.description = detail.description
            }
            if (pet.birthday === '') {
                pet.birthday = detail.birthday
            }
            if (pet.species === '') {
                pet.species = detail.species_id
            }
        }
        console.log(pet)
        dispatch({
            type: 'EDIT_PET',
            payload: pet
        })
        return setTimeout(() => { history.push('/') }, 500)
    }

    return (
        <>
            <div className="align">
                <h3>Edit A Pet</h3>
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
                <button onClick={editPet}>Edit Pet and Return Home</button>
            </div>
        </>
    )
}

export default EditPet