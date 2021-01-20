import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { linkAction } from './slice';

function getLinkAPI(linkId) {
  return axios.get(`/link/${linkId}`);
}

function* getLink(action) {
  try {
    const result = yield call(getLinkAPI, action.payload);
    console.log(result);
    yield put(linkAction.getLinkSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(linkAction.getLinkFailure(error));
  }
}

export function* watchGetLink() {
  yield takeLatest(linkAction.getLinkRequest, getLink);
}

function getLinksAPI(username) {
  return axios.get(`/link?username=${username}`);
}

function* getLinks(action) {
  try {
    const result = yield call(getLinksAPI, action.payload);
    console.log(result);
    yield put(linkAction.getLinksSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(linkAction.getLinksFailure(error));
  }
}

export function* watchGetLinks() {
  yield takeLatest(linkAction.getLinksRequest, getLinks);
}

function createLinkAPI(data) {
  return axios.post('/link', data);
}

function* createLink(action) {
  try {
    const result = yield call(createLinkAPI, action.payload);
    console.log(result);
    yield put(linkAction.createLinkSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(linkAction.createLinkFailure(error));
  }
}

export function* watchCreateLink() {
  yield takeLatest(linkAction.createLinkRequest, createLink);
}

function editLinkAPI(data) {
  return axios.patch(`/link/${data.get('linkId')}`, data);
}

function* editLink(action) {
  try {
    const result = yield call(editLinkAPI, action.payload);
    console.log(result);
    yield put(linkAction.editLinkSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(linkAction.editLinkFailure(error));
  }
}

export function* watchEditLink() {
  yield takeLatest(linkAction.editLinkRequest, editLink);
}

function deleteLinkAPI(linkId) {
  return axios.delete(`/link/${linkId}`);
}

function* deleteLink(action) {
  try {
    const result = yield call(deleteLinkAPI, action.payload);
    console.log(result);
    yield put(linkAction.deleteLinkSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(linkAction.deleteLinkFailure(error));
  }
}

export function* watchDeleteLink() {
  yield takeLatest(linkAction.deleteLinkRequest, deleteLink);
}
