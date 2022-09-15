import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// sends a get request for all the species in the databse
function* getSpecies() {
  try {
    const response = yield axios.get('/api/species');
    yield put({ type: 'SET_SPECIES', payload: response.data });
  } catch (error) {
    console.log('Species get request failed', error);
  }
}

// sends a post request for a new species to be added to the database
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

// sends a get request for a specific species
function* getSpecificSpecies(action) {
  console.log(action.payload)
  try {
    const response = yield axios.get(`/api/species/${action.payload}`);
    yield put({ type: 'SET_SPECIFIC_SPECIES', payload: response.data });
  } catch (error) {
    console.log('Species get request failed', error);
  }
}

// gets all the species for the global page
function* getAllSpecies() {
  try {
    const response = yield axios.get('/api/allspecies');
    yield put({ type: 'SET_ALL_SPECIES', payload: response.data });
  } catch (error) {
    console.log('Species get request failed', error);
  }
}

// sends a delete request for admins to remove species from the databse
function* deleteSpecies(action) {
  console.log(action.payload)
  try{
      yield axios.delete(`/api/allspecies/${action.payload}`)
      yield put({type : 'GET_ALL_SPECIES'})
  } catch (err){
      console.log(err)
  }
}

// sends the update to flag if a species is avalible to all users or not
function* authorize(action) {
  console.log(action.payload)
  try {
      yield axios.put(`/api/allspecies/${action.payload.id}`, action.payload)
      yield put({ type: 'GET_ALL_SPECIES'})
  } catch (err) {
      console.log(err)
  }
}

function* speciesSaga() {
  yield takeLatest('GET_SPECIES', getSpecies);
  yield takeLatest('POST_NEWSPECIES', postNewSpecies);
  yield takeLatest('GET_SPECIFIC_SPECIES', getSpecificSpecies)
  yield takeLatest('GET_ALL_SPECIES', getAllSpecies)
  yield takeLatest('DELETE_SPECIES', deleteSpecies)
  yield takeLatest('AUTHORIZE_SPECIES', authorize)
}

export default speciesSaga;
