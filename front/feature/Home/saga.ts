import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { homeAction } from './slice';
import { HomeInfo } from './types';

async function getHomeAPI(username: string) {
  const response = await axios.get<HomeInfo>(`/home/${username}`);
  return response.data;
}

function* getHome(action: ReturnType<typeof homeAction.getHomeRequest>) {
  try {
    console.log('호출', homeAction.getHomeRequest());
    const result:HomeInfo = yield call(getHomeAPI, action.payload);
    console.log('결과', result, action.payload);
    yield put(homeAction.getHomeSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(homeAction.getHomeFailure(error.message));
  }
}

export function* watchGetHome() {
  yield takeLatest(homeAction.getHomeRequest, getHome);
}

async function editHomeAPI(data:FormData) {
  console.log('데이터', data);
  const response = await axios.patch<HomeInfo>(`/home/${data.get('userId')}`, data);
  return response.data;
}

function* editHome(action: ReturnType<typeof homeAction.editHomeRequest>) {
  try {
    const result:HomeInfo = yield call(editHomeAPI, action.payload);
    console.log('수정결과', result);
    yield put(homeAction.editHomeSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(homeAction.editHomeFailure(error));
  }
}

export function* watchEditHome() {
  yield takeLatest(homeAction.editHomeRequest, editHome);
}
