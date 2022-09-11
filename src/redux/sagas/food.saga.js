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

function* postNewFood(action) {
    console.log(action.payload)
    try {
        const response = yield axios.post('/api/food', action.payload)
        yield put({type : 'SET_ADDEDFOOD', payload: response.data})
        yield put({ type: 'GET_FOOD' })
    } catch (err) {
        console.log(err)
    }
}

function* getPetsFood(action) {
    console.log(action.payload)
    try {
        const response = yield axios.get(`/api/food/${action.payload}`);
        yield put({ type: 'SET_PETS_FOOD', payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

function* foodSaga() {
    yield takeLatest('GET_FOOD', getFood)
    yield takeLatest('POST_NEWFOOD', postNewFood)
    yield takeLatest('GET_PETS_FOOD', getPetsFood)
}

export default foodSaga;
