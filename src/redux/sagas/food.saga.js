import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFood() {
    try {
      const response = yield axios.get('/api/food');
      yield put({ type: 'SET_FOOD', payload: response.data });
    } catch (error) {
      console.log('Food get request failed', error);
    }
  }

function* foodSaga() {
    yield takeLatest('GET_FOOD', getFood)
}

export default foodSaga;
