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
        const response = yield axios.post('/api/species', action.payload)
        console.log('yolo', response.data)
        yield put({type : 'SET_NEWSPECIES', payload: response.data})
        yield put({ type: 'GET_SPECIES'})
    } catch (err) {
        console.log(err)
    }
}

function* getSpecificSpecies(action) {
  console.log(action.payload)
  try {
    const response = yield axios.get(`/api/species/${action.payload}`);
    yield put({ type: 'SET_SPECIFIC_SPECIES', payload: response.data });
  } catch (error) {
    console.log('Species get request failed', error);
  }
}

function* getAllSpecies() {
  try {
    const response = yield axios.get('/api/allspecies/');
    yield put({ type: 'SET_ALL_SPECIES', payload: response.data });
  } catch (error) {
    console.log('Species get request failed', error);
  }
}

function* deleteSpecies(action) {
  console.log(action.payload)
  try{
      yield axios.delete(`/api/allspecies/${action.payload}`)
      yield put({type : 'GET_ALL_SPECIES'})
  } catch (err){
      console.log(err)
  }
}

function* speciesSaga() {
  yield takeLatest('GET_SPECIES', getSpecies);
  yield takeLatest('POST_NEWSPECIES', postNewSpecies);
  yield takeLatest('GET_SPECIFIC_SPECIES', getSpecificSpecies)
  yield takeLatest('GET_ALL_SPECIES', getAllSpecies)
  yield takeLatest('DELETE_SPECIES', deleteSpecies)
}

export default speciesSaga;
