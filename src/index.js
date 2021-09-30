import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import App from './App';
import axios from 'axios';


const sagaMiddleware = createSagaMiddleware();

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [...state, action.payload]
    default:
      return state;
  }
};

// Create an axios request
// to get plants from the server
// then dispatch to plantList reducer
function* fetchPlants() {
  console.log('in fetch plants');
  const plantsResponse = yield axios.get('/api/plant')
  yield put({type:'ADD_PLANT', payload: plantsResponse.data })
}

function* addNewPlant(action) {
  console.log('in add plant', action);
  const newPlant = action.payload;
  yield axios.post('/api/plant', newPlant)
  yield put({type: 'FETCH_PLANTS'})
}

// Listens for dispatch actions
// then calls corresponding function
function* watcherSaga() {
  yield takeEvery('FETCH_PLANTS', fetchPlants)
  yield takeEvery('ADD_NEW_PLANT', addNewPlant)
}


const store = createStore(
  combineReducers({ plantList }),
  applyMiddleware( sagaMiddleware, logger),
);

// Creates listener for watcherSaga
sagaMiddleware.run(watcherSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('react-root'));
