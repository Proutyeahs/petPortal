import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "@material-ui/core";
import './Admin.css'

function Admin() {

    const dispatch = useDispatch()
    const allFood = useSelector((store) => store.allFood)
    const allSpecies = useSelector((store) => store.allSpecies);

    useEffect(() => {
        reload()
    }, [])

    const reload = () => {
        dispatch({
            type: 'GET_ALL_FOOD',
        })
        dispatch({
            type: 'GET_ALL_SPECIES',
        })
    }

    const deleteFood = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_FOOD',
            payload: id
        })
    }

    const deleteSpecies = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_SPECIES',
            payload: id
        })
    }

    return (
        <>
            <h1 className='outline'>Admin page</h1>
            <TableContainer >
                <Table>
                    <TableHead className='background'>
                        <TableRow>
                            <TableCell className='white'>
                                Species
                            </TableCell>
                            <TableCell className='white'>
                                Approved
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='outline'>
                        {allSpecies.map(species => (
                            <TableRow key={species.id}>
                                <TableCell>
                                    {species.species_name}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary">Approve</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => deleteSpecies(species.id)} >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer >
                <Table>
                    <TableHead className='background'>
                        <TableRow>
                            <TableCell className='white'>
                                Foods
                            </TableCell>
                            <TableCell className='white'>
                                Approved
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='outline'>
                        {allFood.map(food => (
                            <TableRow key={food.id}>
                                <TableCell>
                                    {food.food_name}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary">Approve</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => deleteFood(food.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Admin