import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* postNote(action) {
    console.log(action.payload)
  try {
    yield axios.post('/api/note', action.payload);
    // yield put({ type: 'GET_NOTES', payload : action.payload.pet_id});
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

function* editNote(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/note/${action.payload.id}`, action.payload)
        // yield put({ type: 'GET_NOTES'})
    } catch (err) {
        console.log(err)
    }
}

function* getThisNote(action) {
    console.log(action.payload)
    try{
        const thisNote = yield axios.get(`/api/note/this/${action.payload}`)
        console.log(thisNote)
        yield put({type: 'SET_THIS_NOTE', payload : thisNote.data})
    } catch (err) {
        console.log(err)
    }
}

function* notesSaga() {
  yield takeLatest('POST_NOTE', postNote)
  yield takeLatest('GET_NOTES', getNotes)
  yield takeLatest('EDIT_NOTE', editNote)
  yield takeLatest('GET_THIS_NOTE', getThisNote)
}

export default notesSaga;