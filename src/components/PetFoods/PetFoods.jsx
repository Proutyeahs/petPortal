import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './PetFoods.css'
import { useHistory } from "react-router-dom";

function PetFoods() {
    useEffect(() => {
        dispatch({
            type: 'GET_SPECIES'
        })
    }, [])

    const dispatch = useDispatch()
    const history = useHistory()
    const allSpecies = useSelector((store) => store.species);

    return (
        <>
            <h1>Pet Types</h1>
            <div className="container">
                {allSpecies.map(species => (
                    <Card onClick={() => history.push(`/foodslist/${species.id}`)} className="div1" key={species.id} value={species.id}>
                        <h4>{species.species_name}</h4>
                        {/* <CardMedia /> */}
                    </Card>
                ))}
            </div>
        </>
    )
}

export default PetFoods