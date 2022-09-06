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

function AddFeeding() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_FOOD' })
    }, [])

    const [newFood, setNewFood] = useState({food: ''})
    const [currentFood, setCurrentFood] = useState({type: ''})

    const allFoods = useSelector((store) => store.foods);

    return(
        <>
            <h3>Add Feeding</h3>
            <div className="padding">
                    <FormControl variant="filled">
                        <InputLabel></InputLabel>
                        <NativeSelect onChange={(e) => setCurrentFood({food: e.target.value })}>
                            {allFoods.map(food => (
                                <option key={food.id} value={food.id}>{food.food_name}</option>
                            ))}
                        </NativeSelect>

                    </FormControl>
                </div>
        </>
    )
}

export default AddFeeding