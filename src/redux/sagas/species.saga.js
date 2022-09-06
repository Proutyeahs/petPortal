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

function* postNewSpecies(action) {
    console.log(action.payload)
    try {
        yield axios.post('/api/species', action.payload)
        yield put({ type: 'GET_SPECIES'})
    } catch (err) {
        console.log(err)
    }
}

function* speciesSaga() {
  yield takeLatest('GET_SPECIES', getSpecies);
  yield takeLatest('POST_NEWSPECIES', postNewSpecies)
}

export default speciesSaga;