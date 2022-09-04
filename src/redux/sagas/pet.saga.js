import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postPet() {
  try {
    const response = yield axios.post('/api/pet');
    yield put({ type: 'GET_PET', payload: response.data });
  } catch (error) {
    console.log('pet post request failed', error);
  }
}

function* petSaga() {
  yield takeLatest('POST_PET', postPet);
}

export default petSaga;
