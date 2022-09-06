import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editPet(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/pet/${action.payload.id}`, action.payload)
        yield put({ type: 'GET_PET'})
    } catch (err) {
        console.log(err)
    }
}

function* deletePet(action) {
    console.log(action.payload)
    try{
        yield axios.delete(`/api/pet/${action.payload}`)
        yield put({type : 'GET_PET'})
    } catch (err){
        console.log(err)
    }
}

function* getDetails(action) {
    try{
        const details = yield axios.get(`/api/pet/${action.payload}`)
        yield put({type : 'SET_DETAILS', payload : details.data})
    } catch (err){
        console.log(err)
    }
}

function* getPet() {
    try{
        const pets = yield axios.get('/api/pet')
        yield put({type : 'SET_PETS', payload : pets.data})
    } catch (err){
        console.log(err)
    }
}

function* postPet(action) {
    console.log(action.payload)
  try {
    yield axios.post('/api/pet', action.payload);
    yield put({ type: 'GET_PET'});
  } catch (error) {
    console.log('pet post request failed', error);
  }
}

function* petSaga() {
  yield takeLatest('POST_PET', postPet);
  yield takeLatest('GET_PET', getPet);
  yield takeLatest('GET_DETAILS', getDetails)
  yield takeLatest('DELETE_PET', deletePet)
  yield takeLatest('EDIT_PET', editPet)
}

export default petSaga;
