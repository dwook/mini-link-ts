import axios from 'axios';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { userReducer } from '../feature/User/slice';
import { linkReducer } from '../feature/Link/slice';
import { homeReducer } from '../feature/Home/slice';
import {
  watchGetMyInfo,
  watchSignUp,
  watchCheckUserExist,
  watchLogIn,
  watchLogOut,
} from '../feature/User/saga';
import {
  watchGetLink,
  watchGetLinks,
  watchCreateLink,
  watchEditLink,
  watchDeleteLink,
} from '../feature/Link/saga';
import { watchGetHome, watchEditHome } from '../feature/Home/saga';
import { backURL } from '../config';

const rootReducer = (state = {}, action) => {
  if (action.type === HYDRATE) {
    console.log('-----------HYDRATE-----------', action);
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    user: userReducer,
    link: linkReducer,
    home: homeReducer,
  })(state, action);
};

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export function* rootSaga() {
  yield all([
    watchGetMyInfo(),
    watchSignUp(),
    watchCheckUserExist(),
    watchLogIn(),
    watchLogOut(),
    watchGetLink(),
    watchGetLinks(),
    watchCreateLink(),
    watchEditLink(),
    watchDeleteLink(),
    watchGetHome(),
    watchEditHome(),
  ]);
}

const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default createWrapper(createStore, {
  debug: process.env.NODE_ENV !== 'production',
});
