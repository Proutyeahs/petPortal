import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// sends data to the router so a new user can view this pet
function* addUser(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/addUser', action.payload)
    } catch (error) {
        console.log(error)
    }
}

function* removeUser(action) {
    try {
        yield axios.put('/api/addUser/remove', action.payload)
    } catch (error) {
        console.log(error)
    }
}

function* addUserSaga() {
   yield takeLatest('ADD_USER', addUser)
   yield takeLatest('REMOVE_USER', removeUser)
}

export default addUserSaga;
