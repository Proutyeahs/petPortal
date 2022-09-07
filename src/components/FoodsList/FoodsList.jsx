import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './FoodsList.css'

function FoodsList() {
    useEffect(() => {
        reload(id)
    }, [])
    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_PETS_FOOD',
            payload: id
        })
        dispatch({
            type: 'GET_SPECIES',
            payload: id
        })
    }

    const displayName = (id) => {
        for (let species of allSpecies) {
            console.log(species)
            if (species.id == id) {
                return <h3>Top foods for {species.species_name}s</h3>
            }
        }
    }

    const dispatch = useDispatch()
    const petsFood = useSelector((store) => store.petsFood)
    const allSpecies = useSelector((store) => store.species);

    return (
        <>
            <div className="center">
                {displayName(id)}
                <TableContainer>
                    <Table>
                        <TableHead className='background'>
                            <TableRow>
                                <TableCell className='white'>
                                    Name of Foods
                                </TableCell>
                                <TableCell className='white'>
                                    Pets Fed
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {petsFood.map(food => (
                                <TableRow key={food.food_name}>
                                    <TableCell className="width">
                                        {food.food_name}
                                    </TableCell>
                                    <TableCell>
                                        {food.count}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default FoodsList