
import React from 'react';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import './AddPet.css'

function AddPet() {
    useEffect(() => {
        dispatch({ type: 'GET_SPECIES' })
    }, [])

    const dispatch = useDispatch();
    const history = useHistory()

    const allSpecies = useSelector((store) => store.species);
    const species = useSelector((store) => store.newSpecies)

    const [pet, setPet] = useState({ name: '', picture: '', description: '', birthday: '', species: '' })
    const [open, setOpen] = React.useState(false);
    const [newSpecies, setNewSpecies] = React.useState({ name: '' });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addPet = () => {
        if (pet.name === '') {
            return alert('Please Enter a Name for your pet')
        }
        console.log(pet)
        dispatch({
            type: 'POST_PET',
            payload: pet
        })
        dispatch({
            type: 'UNSET_NEWSPECIES'
        })
        setTimeout(() => { history.push('/') }, 500)
    }

    const addSpecies = () => {
        console.log(newSpecies)
        setTimeout(() => {
            dispatch({
                type: 'POST_NEWSPECIES',
                payload: newSpecies
            })
            handleClose()
            setNewSpecies({ name: '' })
            setPet({...pet, species : ''})
        }, 500)
    }

    const updateImage = () => {
        if (pet.species === '') {
            pet.species = 1
            for (let species of species) {
                console.log(species.id)
                if (species.id) {
                    pet.species = species.id
                }
            }
        }
    }

    return (
        <>
            <div className="align">
                <h3 className='outline'>Add A New Pet</h3>
                <div className="padding">
                    <FormControl variant="filled">
                        <InputLabel>Species</InputLabel>
                        <Select className='min' value={pet.species} onChange={(e) => setPet({ ...pet, species: e.target.value })}>
                            {allSpecies.map(species => (
                                <MenuItem key={species.id} value={species.id}>{species.species_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div>
                        or
                    </div>
                    <div>
                        <div className="padding">
                            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Add New Species/Breed</Button>
                        </div>
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
                </div>
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
                    <TextField type="text" value={pet.picture} placeholder="Image URL" onChange={(e) => setPet({ ...pet, picture: e.target.value })} />
                </div>
                <div onClick={addPet} className="padding">
                    <Button variant="outlined" color="primary" onClick={updateImage}>Add Pet</Button>
                </div>
            </div>
        </>
    )
}

export default AddPet