
import axios from 'axios';
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
import './EditPet.css'

function EditPet() {

    // collects data upon page reload
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

    // gets info from the reducers
    const details = useSelector((store) => store.details)
    const allSpecies = useSelector((store) => store.species);
    const species = useSelector((store) => store.newSpecies)

    // storage for local info
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [pet, setPet] = useState({ name: '', picture: '', description: '', birthday: '', species: '', id: id })
    const [newSpecies, setNewSpecies] = React.useState({ name: '' });

    // uploads the selected image to clodinary and saves the file path to be send to the database
    const uploadImage = (e) => {
        console.log(e.target.files[0])
        const formData = new FormData();
        formData.append("file", e.target.files[0])
        formData.append("upload_preset", "PetEats")
        axios.post("https://api.cloudinary.com/v1_1/dzyea2237/image/upload", formData).then((response) => {
            setPet({ ...pet, picture: response.data.url })
            console.log('yo', response.data)
        })
    }

    // checks if any value is empty and assignes it the previously input information
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
                for (let species of species) {
                    console.log(species.id)
                    if (species.id) {
                        pet.species = species.id
                    }
                }
            }
        }
    }

    // sends the edited data to the corresponding saga
    const done = () => {
        console.log(pet)
        setTimeout(() => {
            dispatch({
                type: 'EDIT_PET',
                payload: pet
            })
            dispatch({
                type: 'UNSET_NEWSPECIES'
            })
            history.goBack()
        }, 500)
    }

    // handles the open and close functionality of pop up windows
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    // sends an add species request to the corresponding saga
    const addSpecies = () => {
        console.log(newSpecies)
        dispatch({
            type: 'POST_NEWSPECIES',
            payload: newSpecies
        })
        handleClose()
        setNewSpecies({ name: '' })
        setPet({ ...pet, species: '' })
    }

    // sends a delete request to the corresponding saga
    const handleDelete = (id) => {
        console.log(id)
        dispatch({
            type: 'DELETE_PET',
            payload: id
        })
        handleClose1()
        setTimeout(() => {
            history.push('/')
        }, 500)
    }

    return (
        <>
            <div className="align">
                <h3 className='outline'>Edit A Pet</h3>
                <div className="padding">
                    <FormControl variant="filled">
                        <InputLabel>Species</InputLabel>
                        <Select className='min' value={pet.species} onChange={(e) => setPet({ ...pet, species: e.target.value })}>
                            {allSpecies.map(species => (
                                <MenuItem key={species.id} value={species.id}>{species.species_name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    or
                </div>
                <div className="padding">
                    <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Add A New Species</Button>
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
                <p className='outline'>Birthday:</p>
                <div className="padding">
                    <TextField type="date" value={pet.birthday} placeholder="Birthday" onChange={(e) => setPet({ ...pet, birthday: e.target.value })} />
                </div>
                <div className="padding">
                    <TextField type="text" value={pet.name} placeholder="Name" onChange={(e) => setPet({ ...pet, name: e.target.value })} />
                </div>
                <div className="padding">
                    <TextField type="text" value={pet.description} placeholder="Description" onChange={(e) => setPet({ ...pet, description: e.target.value })} />
                </div>
                <div className="padding">
                    <TextField type="file" onChange={uploadImage} />
                    {/* <TextField type="text" value={pet.picture} placeholder="Image URL" onChange={(e) => setPet({ ...pet, picture: e.target.value })} /> */}
                </div>
                <div className="padding" onClick={done}>
                    <Button variant="outlined" color="primary" onClick={editPet}>Save Edits</Button>
                </div>
                <div className="padding">
                    <Button variant="outlined" color="secondary" onClick={handleClickOpen1}>Delete Pet</Button>
                </div>
                <Dialog open={open1} onClose={handleClose1}>
                    <DialogTitle className='center'>Are you sure you want to Delete this Pet?</DialogTitle>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={handleClose1}>
                            Cancel
                        </Button>
                        <div className="padding">
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(id)}>Delete Pet</Button>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default EditPet