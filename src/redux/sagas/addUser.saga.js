import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* addUser() {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

function* addUserSaga() {
   yield takeLatest('ADD_USER', addUser)
}

export default addUserSaga;
