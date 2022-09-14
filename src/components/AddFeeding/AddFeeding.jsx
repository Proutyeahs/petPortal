
import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import './AddFeeding.css'

function AddFeeding() {

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
            type: 'GET_NOTES',
            payload: id
        })
    }

    const [newFood, setNewFood] = useState({ food: '' })
    const [notes, setNotes] = useState({ pet_id: id, food: '', date: '', note: '' })
    const [open, setOpen] = React.useState(false);

    const allFoods = useSelector((store) => store.foods);
    const addedFood = useSelector((store) => store.addedFood)

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

    const addNotes = () => {
        console.log(notes)
        setTimeout(() => {
            dispatch({
                type: 'POST_NOTE',
                payload: notes
            })
            dispatch({
                type: 'UNSET_ADDEDFOOD'
            })
            setNotes({ ...notes, food: '' })
            history.goBack()
        }, 500)
    }

    const food = () => {
        if (notes.food === '') {
            notes.food = 1
            for (let addedFood of addedFood) {
                console.log(addedFood.id)
                if (addedFood.id) {
                    notes.food = addedFood.id
                }
            }
        }
    }

    return (
        <>
            <div className="align">
                <h3 className='outline'>Add Feeding</h3>
                <div className="padding1">
                    <FormControl variant="filled">
                        <InputLabel>Food</InputLabel>
                        <Select className='min' value={notes.food} onChange={(e) => setNotes({ ...notes, food: e.target.value })}>
                            {allFoods.map(food => (
                                <MenuItem key={food.id} value={food.id}>{food.food_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div>
                        or
                    </div>
                    <div>
                        <div className="padding1">
                            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Add New Food</Button>
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
                        <p className='outline'>Date:</p>
                        <TextField type="date" value={notes.date} placeholder="Date/Time" onChange={(e) => setNotes({ ...notes, date: e.target.value })} />
                    </div>
                    <div className="padding1">
                        <TextField type="text" value={notes.note} placeholder="Notes" onChange={(e) => setNotes({ ...notes, note: e.target.value })} />
                    </div>
                    <div onClick={addNotes} className="padding1">
                        <Button variant="outlined" color="primary" onClick={food}>Add Notes</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddFeeding