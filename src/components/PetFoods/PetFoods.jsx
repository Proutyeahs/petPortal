import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './PetFoods.css'
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

function PetFoods() {
    useEffect(() => {
        dispatch({
            type: 'GET_SPECIES'
        })
    }, [])

    const dispatch = useDispatch()
    const history = useHistory()
    const allSpecies = useSelector((store) => store.species);
    const thisSpecies = useSelector((store) => store.specificSpecies)

    const [specific, setSpecificSpecies] = useState('')


    return (
        <>
            <div className="center">
                <h1 className='outline'>Pet Species and Breeds</h1>

            </div>
            <div className="center">
                <TextField type="text" placeholder="Look for a Species" onChange={(e) => setSpecificSpecies(e.target.value)} />
                <Button variant="outlined" color="primary" onClick={() => dispatch({ type: 'GET_SPECIFIC_SPECIES', payload: specific })}>Search</Button>
            </div>
            
            <div className="center">
                {thisSpecies.map(thisSpecies => (
                    <Card onClick={() => history.push(`/foodslist/${thisSpecies.id}`)} className="div1" key={thisSpecies.id} value={thisSpecies.id}>
                        <div className='text'>{thisSpecies.species_name}</div>
                        <CardMedia className="img1" image={'https://res.cloudinary.com/dzyea2237/image/upload/v1662655423/logo_xqynsk.png'} />
                    </Card>
                ))}
            
            </div>
            <div className="container">
                {allSpecies.map(species => (
                    <Card onClick={() => history.push(`/foodslist/${species.id}`)} className="div1" key={species.id} value={species.id}>
                        <div className='text'>{species.species_name}</div>
                        <CardMedia className="img1" image={'https://res.cloudinary.com/dzyea2237/image/upload/v1662655423/logo_xqynsk.png'} />
                    </Card>
                ))}
            </div>
        </>
    )
}

export default PetFoods