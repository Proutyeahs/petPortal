import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getSpecies() {
  try {
    const response = yield axios.get('/api/species');
    yield put({ type: 'SET_SPECIES', payload: response.data });
  } catch (error) {
    console.log('Species get request failed', error);
  }
}

function* speciesSaga() {
  yield takeLatest('GET_SPECIES', getSpecies);
}

export default speciesSaga;
