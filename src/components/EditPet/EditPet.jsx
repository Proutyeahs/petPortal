import axios from "axios"
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

function EditPet() {
    useEffect(() => {
        reload(id)
        dispatch({ type: 'GET_SPECIES' })
    }, [])
    let { id } = useParams()

    const reload = (id) => {
        console.log(id)
        dispatch({
            type: 'GET_DETAILS',
            payload: id
        })
    }

    const dispatch = useDispatch();
    const history = useHistory()

    const details = useSelector((store) => store.details)
    const allSpecies = useSelector((store) => store.species);

    const [open, setOpen] = React.useState(false);
    const [pet, setPet] = useState({ name: '', picture: '', description: '', birthday: '', species: '', id: id })
    const [newSpecies, setNewSpecies] = React.useState({ name: '' });

    const editPet = () => {
        for (let detail of details) {
            console.log("ugh", detail)
            if (pet.name === '') {
                pet.name = detail.name
            }
            if (pet.picture === '') {
                pet.picture = detail.picture
            }
            if (pet.description === '') {
                pet.description = detail.description
            }
            if (pet.birthday === '') {
                pet.birthday = detail.birthday
            }
            if (pet.species === '') {
                pet.species = detail.species_id
            }
        }
    }

    const done = () => {
        console.log(pet)
        setTimeout(() => {
            dispatch({
                type: 'EDIT_PET',
                payload: pet
            })
            history.push(`/petdetails/${id}`)
        }, 500)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addSpecies = () => {
        console.log(newSpecies)
        dispatch({
            type: 'POST_NEWSPECIES',
            payload: newSpecies
        })
        handleClose()
        setNewSpecies({ name: '' })
    }

    const handleDelete = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_PET',
            payload: id
        })
        setTimeout(() => {
            history.push('/')
        }, 500)
    }

    return (
        <>
            <div className="align">
                <h3>Edit A Pet</h3>
                <div className="padding">
                    <FormControl variant="filled">
                        <InputLabel></InputLabel>
                        <NativeSelect onChange={(e) => setPet({ ...pet, species: e.target.value })}>
                            {allSpecies.map(species => (
                                <option key={species.id} value={species.id}>{species.species_name}</option>
                            ))}
                        </NativeSelect>

                    </FormControl>
                </div>
                <div className="padding">
                    <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Add Species</Button>
                </div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add New Species</DialogTitle>
                    <DialogContent>
                        <TextField type="text" value={newSpecies.name} placeholder="species" onChange={(e) => setNewSpecies({ name: e.target.value })} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="primary" onClick={addSpecies}>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className="padding">
                    <TextField type="text" value={pet.name} placeholder="Name" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
                </div>
                <div className="padding">
                    <TextField type="text" value={pet.description} placeholder="Description" onChange={(e) => setPet({ ...pet, description: e.target.value })} />
                </div>
                <div className="padding">
                    <TextField type="text" value={pet.birthday} placeholder="Birthday" onChange={(e) => setPet({ ...pet, birthday: e.target.value })} />
                </div>
                <div className="padding">
                    <TextField type="text" value={pet.picture} placeholder="URL" onChange={(e) => setPet({ ...pet, picture: e.target.value })} />
                </div>
                <div className="padding" onClick={done}>
                    <Button variant="outlined" color="primary" onClick={editPet}>Save Pet</Button>
                </div>
                <div className="padding">
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(id)}>Delete Pet</Button>
                </div>
                
            </div>
        </>
    )
}

export default EditPet