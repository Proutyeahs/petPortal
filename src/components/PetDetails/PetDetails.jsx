import { useEffect, useState } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

function PetDetails() {

    // gets info upon page reload
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

    // holds data locally
    const history = useHistory()
    const dispatch = useDispatch()
    const details = useSelector((store) => store.details)
    const notes = useSelector((store) => store.notes)
    const user = useSelector((store) => store.user);
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({ user: '', id: id })

    // sends user to the edit pet page
    const handleEdit = (id) => {
        console.log(id)
        history.push(`/editpet/${id}`)
    }

    // sends user to the edit note page
    const thisNote = (note_id) => {
        console.log(note_id)
        dispatch({
            type: 'GET_THIS_NOTE',
            payload: note_id
        })
        history.push(`/editfeeding/${note_id}`)
    }

    // handles open close functionality
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // adds a user so they can view a pet from their account
    const searchUser = () => {
        dispatch({
            type: 'ADD_USER',
            payload: newUser
        })
        handleClose()
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
                            <h3 className='outline'>{detail.name}</h3>
                            <h5 className='outline'>{detail.species_name}</h5>
                            <p className='outline'>{detail.birthday}</p>
                        </span>
                        <p className='outline'>{detail.description}</p>

                        <div className='padding'>
                            <Button className='space' variant="outlined" color="primary" onClick={() => history.push(`/addfeeding/${id}`)}>Add Feeding</Button>
                            <Button className='space' variant="outlined" onClick={handleClickOpen}>Add User</Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle className='center'>Allow another user to view this pet</DialogTitle>
                                <DialogContent>
                                    <TextField type="text" value={newUser.user} placeholder="UserName" onChange={(e) => setNewUser({ ...newUser, user: e.target.value })} />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <div className="padding">
                                        <Button variant="outlined" color="primary" onClick={searchUser}>Confirm</Button>
                                    </div>
                                </DialogActions>
                            </Dialog>
                            <Button className='space' variant="outlined" color="secondary" onClick={() => handleEdit(id)}>Edit Pet</Button>
                        </div>
                    </div>
                ))}
            </div>
            <br></br>
            <TableContainer>
                <Table>
                    <TableHead className='black'>
                        <TableRow>
                            <TableCell className='white' align="center">
                                Food
                            </TableCell>
                            <TableCell className='white' align="center">
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {notes.map(note => (
                        <TableBody className='outline' key={note.id}>
                            <TableRow className='row'>
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