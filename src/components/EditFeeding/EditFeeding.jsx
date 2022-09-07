
import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditFeeding() {

    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        reload(id)
        dispatch({ type: 'GET_FOOD' })
    }, [])

    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_THIS_NOTE',
            payload: id
        })
    }

    const [newFood, setNewFood] = useState({ food: '' })
    const [notes, setNotes] = useState({ id: '', food: '', date: '', note: '', petID: '' })
    const [open, setOpen] = React.useState(false);

    const thisNote = useSelector((store) => store.thisNote);
    const allFoods = useSelector((store) => store.foods);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addFood = () => {
        console.log(setNewFood)
        dispatch({
            type: 'POST_NEWFOOD',
            payload: newFood
        })
        handleClose()
        setNewFood({ food: '' })
    }

    const saveNotes = () => {
        for (let note of thisNote) {
            console.log("ugh", note)
            if (notes.petID === '') {
                notes.petID = note.pets_id
            }
            if (notes.id === '') {
                notes.id = note.id
            }
            if (notes.food === '') {
                notes.food = note.foods_id
            }
            if (notes.date === '') {
                notes.date = note.date
            }
            if (notes.note === '') {
                notes.note = note.notes
            }
        }
    }

    const editNotes = () => {
        setTimeout(() => {
            console.log(notes)
            dispatch({
                type: 'EDIT_NOTE',
                payload: notes
            })
            history.goBack()
        }, 500)
    }

    const handleDelete = () => {
        let noteID = ''
        for (let note of thisNote) {
            console.log(note)
            noteID = note.id
        }
        dispatch({
            type: 'DELETE_NOTE',
            payload: noteID
        })
        setTimeout(() => {
            history.goBack()
        }, 500)
    }

    return (
        <>
            <div className="align">
                <h3>Add Feeding</h3>
                <div className="padding1">
                    <FormControl variant="filled">
                        <InputLabel></InputLabel>
                        <NativeSelect onChange={(e) => setNotes({ ...notes, food: e.target.value })}>
                            {allFoods.map(food => (
                                <option key={food.id} value={food.id}>{food.food_name}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <div>
                        <div className="padding1">
                            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Add Food</Button>
                        </div>
                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add New Food</DialogTitle>
                        <DialogContent>
                            <TextField type="text" value={newFood.food} placeholder="food" onChange={(e) => setNewFood({ food: e.target.value })} />
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="outlined" color="primary" onClick={addFood}>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div className="padding1">
                        <TextField type="text" value={notes.date} placeholder="Date/Time" onChange={(e) => setNotes({ ...notes, date: e.target.value })} />
                    </div>
                    <div className="padding1">
                        <TextField type="text" value={notes.note} placeholder="Notes" onChange={(e) => setNotes({ ...notes, note: e.target.value })} />
                    </div>
                    <div onClick={editNotes} className="padding1">
                        <Button variant="outlined" color="primary" onClick={saveNotes}>Add Notes</Button>
                    </div>
                    <div className="padding">
                        <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete Entry</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditFeeding