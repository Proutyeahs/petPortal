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
    const user = useSelector((store) => store.user)

    const [specific, setSpecificSpecies] = useState('')

    // displays a message if user is not logged in
    const login = () => {
        // if (specific) {
        //     console.log(specific)
        //     return setSpecific(specific[0].toUpperCase() + specific.substring(1))
        // }
        if (thisSpecies == '' && !user.id) {
            return <p className='outline'>Log in to add a Species</p>
        }
    }

    // allows a user to seach the databse for a specific species
    const send = () => {
        if(specific == '') {
            return
        }
        dispatch({ type: 'GET_SPECIFIC_SPECIES', payload: specific })
    }

    return (
        <>
            <div className="center">
                <h1 className='outline'>Pet Species and Breeds</h1>
            </div>
            <div className="center">
                <TextField type="text" placeholder="Look for a Species" onChange={(e) => setSpecificSpecies(e.target.value)} />
                <Button variant="outlined" color="primary" onClick={send}>Search</Button>
            </div>
            <div className="center">
                {thisSpecies.map(thisSpecies => (
                    <Card onClick={() => history.push(`/foodslist/${thisSpecies.id}`)} className="div2" key={thisSpecies.id} value={thisSpecies.id}>
                        <div className='text'>{thisSpecies.species_name}</div>
                        <CardMedia className="img1" image={'https://res.cloudinary.com/dzyea2237/image/upload/v1662655423/logo_xqynsk.png'} />
                    </Card>
                ))}
                {login()}
            </div>
            <div className="container">
                {allSpecies.map(species => (
                    <Card onClick={() => history.push(`/foodslist/${species.id}`)} className="div2" key={species.id} value={species.id}>
                        <div className='text'>{species.species_name}</div>
                        <CardMedia className="img1" image={'https://res.cloudinary.com/dzyea2237/image/upload/v1662655423/logo_xqynsk.png'} />
                    </Card>
                ))}
            </div>
        </>
    )
}

export default PetFoods