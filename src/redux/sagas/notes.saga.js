import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNote(action) {
    console.log(action.payload)
  try {
    yield axios.post('/api/note', action.payload);
    yield put({ type: 'GET_NOTES'});
  } catch (error) {
    console.log('notes post request failed', error);
  }
}

function* notesSaga() {
  yield takeLatest('POST_NOTE', postNote)
}

export default notesSaga;
