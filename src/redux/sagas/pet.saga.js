import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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
    const response = yield axios.post('/api/pet', action.payload);
    yield put({ type: 'GET_PET'});
  } catch (error) {
    console.log('pet post request failed', error);
  }
}

function* petSaga() {
  yield takeLatest('POST_PET', postPet);
  yield takeLatest('GET_PET', getPet)
}

export default petSaga;
