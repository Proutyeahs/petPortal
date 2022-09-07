import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import './PetDetails.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
        dispatch({
            type: 'GET_NOTES',
            payload: id
        })
    }

    const history = useHistory()
    const dispatch = useDispatch()
    const details = useSelector((store) => store.details)
    const notes = useSelector((store) => store.notes)

    const handleEdit = (id) => {
        console.log(id)
        history.push(`/editpet/${id}`)
    }

    const thisNote = (note_id) => {
        console.log(note_id)
        dispatch({
            type: 'GET_THIS_NOTE',
            payload: note_id
        })
        history.push(`/editfeeding/${note_id}`)
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
                        <div className='padding'>
                            <Button className='left' variant="outlined" color="secondary" onClick={() => handleEdit(id)}>Edit Pet</Button>
                            <Button className='right' variant="outlined" color="primary" onClick={() => history.push(`/addfeeding/${id}`)}>Add Feeding</Button>
                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <TableContainer>
                <Table>
                    <TableHead className='black'>
                        <TableRow>
                            <TableCell align="center">
                                Food
                            </TableCell>
                            <TableCell align="center">
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {notes.map(note => (
                        <TableBody key={note.id}>
                            <TableRow>
                                <TableCell>
                                    {note.food_name}
                                </TableCell>
                                <TableCell>
                                    {note.date}
                                </TableCell>
                            </TableRow>
                            <TableRow className='gray'>
                                <TableCell className='notes'>
                                    <p>Feeding Notes:</p>
                                    {note.notes}
                                </TableCell>
                                <TableCell>
                                    <Button className='right' variant="outlined" color="secondary" onClick={() => thisNote(note.id)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </>
    )
}

export default PetDetails