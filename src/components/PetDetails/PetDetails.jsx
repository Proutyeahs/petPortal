import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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

    const dispatch = useDispatch()
    const details = useSelector((store) => store.details)

    const handleDelete = (id, cloud_id) => {
        const formData = new FormData()
        formData.append("public_id", cloud_id)
        formData.append("signature", "OVJFbn8mzUTohXAxkI_-bqIkrKU")
        formData.append("api_key", 115112789579972)
        axios.delete(`https://api.cloudinary.com/v1_1/dzyea2237/delete-image/${cloud_id}`, formData).then((response) => {
            console.log(response)
            dispatch({
                type: 'DELETE_PET',
                payload: id
            })
        })

        // cloudinary.v2.uploader.destroy(publicId={url}, function(error,result) {
        //     console.log(result, error) })
        //     .then(resp => {
        //         console.log(resp)
        //         dispatch({
        //             type: 'DELETE_PET',
        //             payload : id
        //         })
        //     })
        //     .catch(_err=> console.log("Something went wrong, please try again later."));

    }

    return (
        <>
            <div className="container">

                {details.map(detail => (
                    <div key={detail.id}>
                        <button onClick={handleDelete(detail.id, detail.picture)}>Delete</button>
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