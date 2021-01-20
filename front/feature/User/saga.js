import axios from 'axios';
import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import { userAction } from './slice';

function getMyInfoAPI(data) {
  return axios.get('/user', data);
}

function* getMyInfo(action) {
  try {
    const result = yield call(getMyInfoAPI, action.payload);
    console.log(result);
    yield put(userAction.getMyInfoSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.getMyInfoFailure(error));
  }
}

export function* watchGetMyInfo() {
  yield takeLatest(userAction.getMyInfoRequest, getMyInfo);
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.payload);
    console.log(result);
    yield put(userAction.signUpSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.signUpFailure(error));
  }
}

export function* watchSignUp() {
  yield takeLatest(userAction.signUpRequest, signUp);
}

function checkUserExistAPI(data) {
  return axios.post('/user/check', { username: data });
}

function* checkUserExist(action) {
  try {
    const result = yield call(checkUserExistAPI, action.payload);
    console.log(result);
    yield put(userAction.checkUserExistSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.checkUserExistFailure(error));
  }
}

export function* watchCheckUserExist() {
  yield debounce(500, userAction.checkUserExistRequest, checkUserExist);
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    console.log(result);
    yield put(userAction.logInSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.logInFailure(error.response.data));
  }
}

export function* watchLogIn() {
  yield takeLatest(userAction.logInRequest, logIn);
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(userAction.logOutSuccess());
  } catch (error) {
    console.error(error);
    yield put(userAction.logOutFailure(error));
  }
}

export function* watchLogOut() {
  yield takeLatest(userAction.logOutRequest, logOut);
}
