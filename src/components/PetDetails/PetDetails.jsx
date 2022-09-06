import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './PetDetails.css'

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

    const handleEdit = (id) => {
        console.log(id)
        history.push(`/editpet/${id}`)
    }

    return (
        <>
            <div className="container">
                {details.map(detail => (
                    <div key={detail.id}>
                        <Card className='div1'>
                            <CardMedia className="img1" image={detail.picture} />
                        </Card>
                        <span className='inline'>
                            <h3>{detail.name}</h3>
                            <h5>{detail.species_name}</h5>
                            <p>{detail.birthday}</p>
                        </span>
                        <p>{detail.description}</p>
                        <Button className='left' variant="outlined" color="secondary" onClick={() => handleEdit(id)}>Edit Pet</Button>
                        <Button className='right' variant="outlined" color="primary" onClick={() => history.push(`/addfeeding/${id}`)}>Add Feeding</Button>
                    </div>
                ))}
            </div>
            <br></br>
            <ul>
                <li>notes about feeding</li>
                <li>TBD</li>
            </ul>

        </>
    )
}

export default PetDetails