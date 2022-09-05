import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function PetDetails() {

    useEffect(() => {
        reload(id)
    }, [])
    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
    }

    const history = useHistory()
    const dispatch = useDispatch()
    const details = useSelector((store) => store.details)

    const handleDelete = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_PET',
            payload: id
        })
    }

    const handleEdit = (id) => {
        console.log(id)
        history.push(`/editpet/${id}`)
    }

    return (
        <>
            <div className="container">
            <button onClick={() => handleDelete(id)}>Delete</button>
            <button onClick={() => handleEdit(id)}>Edit Pet</button>
                {details.map(detail => (
                    <div key={detail.id}>
                        <h3>{detail.name}</h3>
                        <p>{detail.species_name}</p>
                        <h6>{detail.birthday}</h6>
                        <img src={detail.picture} />
                        <p>{detail.description}</p>
                    </div>
                ))}
                <ul>
                    <li>notes about feeding</li>
                    <li>TBD</li>
                </ul>
            </div>
        </>
    )
}

export default PetDetails