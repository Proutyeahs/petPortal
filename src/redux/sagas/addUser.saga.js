import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addUser(action) {
    console.log(action.payload)
    try {
        yield axios.put('/api/addUser', action.payload)
    } catch (error) {
        console.log(error)
    }
}

function* addUserSaga() {
   yield takeLatest('ADD_USER', addUser)
}

export default addUserSaga;
