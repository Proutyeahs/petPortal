import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNote(action) {
    console.log(action.payload)
  try {
    yield axios.post('/api/note', action.payload);
    yield put({ type: 'GET_NOTES', payload : action.payload.pet_id});
  } catch (error) {
    console.log('notes post request failed', error);
  }
}

function* getNotes(action) {
    console.log(action.payload)
    try{
        const details = yield axios.get(`/api/note/${action.payload}`)
        yield put({type : 'SET_NOTES', payload : details.data})
    } catch (err){
        console.log(err)
    }
}

function* notesSaga() {
  yield takeLatest('POST_NOTE', postNote)
  yield takeLatest('GET_NOTES', getNotes)
}

export default notesSaga;
