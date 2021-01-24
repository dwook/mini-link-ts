import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { homeAction } from './slice';

function getHomeAPI(username: string) {
  return axios.get(`/home/${username}`);
}

function* getHome(action: PayloadAction) {
  try {
    const result = yield call(getHomeAPI, action.payload);
    console.log(result);
    yield put(homeAction.getHomeSuccess(result.data));
  } catch (error) {
    console.error(error);
    yield put(homeAction.getHomeFailure(error.message));
  }
}

export function* watchGetHome() {
  yield takeLatest(homeAction.getHomeRequest, getHome);
}

function editHomeAPI(data: FormData) {
  return axios.patch(`/home/${data.get('userId')}`, data);
}

function* editHome(action: PayloadAction) {
  try {
    const result = yield call(editHomeAPI, action.payload);
    console.log(result);
    yield put(homeAction.editHomeSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(homeAction.editHomeFailure(error));
  }
}

export function* watchEditHome() {
  yield takeLatest(homeAction.editHomeRequest, editHome);
}
