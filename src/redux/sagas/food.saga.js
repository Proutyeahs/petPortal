import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// sends a get request for all the foods in the database
function* getFood() {
    try {
        const response = yield axios.get('/api/food');
        yield put({ type: 'SET_FOOD', payload: response.data });
    } catch (error) {
        console.log('Food get request failed', error);
    }
}

// sends a data to the router for new foods to be posted to the database
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

// sends a reqest to get the specifc food for a pet from the database
function* getPetsFood(action) {
    console.log(action.payload)
    try {
        const response = yield axios.get(`/api/food/${action.payload}`);
        yield put({ type: 'SET_PETS_FOOD', payload: response.data });
    } catch (error) {
        console.log(error);
    }
}

// gets all the foods for a specifc species of pet
function* getAllFood() {
    try {
      const response = yield axios.get('/api/allfood');
      yield put({ type: 'SET_ALL_FOOD', payload: response.data });
    } catch (error) {
      console.log('Food get all request failed', error);
    }
  }

  // sends a delete request remove food from the database
function* deleteFood(action) {
    console.log(action.payload)
    try{
        yield axios.delete(`/api/allfood/${action.payload}`)
        yield put({type : 'GET_ALL_FOOD'})
    } catch (err){
        console.log(err)
    }
}

// sends an update request to foods are viewable to other users
function* authorize(action) {
    console.log(action.payload)
    try {
        yield axios.put(`/api/allfood/${action.payload.id}`, action.payload)
        yield put({ type: 'GET_ALL_FOOD'})
    } catch (err) {
        console.log(err)
    }
}

function* foodSaga() {
    yield takeLatest('GET_FOOD', getFood)
    yield takeLatest('POST_NEWFOOD', postNewFood)
    yield takeLatest('GET_PETS_FOOD', getPetsFood)
    yield takeLatest('GET_ALL_FOOD', getAllFood)
    yield takeLatest('DELETE_FOOD', deleteFood)
    yield takeLatest('AUTHORIZE_FOOD', authorize)
}

export default foodSaga;
