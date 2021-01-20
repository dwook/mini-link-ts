import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userInfo: null,
  getMyInfoLoading: true,
  getMyInfoDone: false,
  getMyInfoError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  checkUserExistResult: null,
  checkUserExistLoading: false,
  checkUserExistDone: false,
  checkUserExistError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
};

const reducers = {
  getMyInfoRequest: (state) => {
    state.getMyInfoLoading = true;
    state.getMyInfoDone = false;
    state.getMyInfoError = null;
  },
  getMyInfoSuccess: (state, { payload: { data } }) => {
    state.getMyInfoLoading = false;
    state.getMyInfoDone = true;
    state.userInfo = data;
  },
  getMyInfoFailure: (state, { payload: error }) => {
    state.getMyInfoLoading = false;
    state.getMyInfoError = error.message;
  },
  signUpReset: (state) => {
    state.signUpLoading = false;
    state.signUpDone = false;
    state.signUpError = null;
    state.checkUserExistResult = null;
  },
  signUpRequest: (state) => {
    state.signUpLoading = true;
    state.signUpDone = false;
    state.signUpError = null;
  },
  signUpSuccess: (state) => {
    state.signUpLoading = false;
    state.signUpDone = true;
  },
  signUpFailure: (state, { payload: error }) => {
    state.signUpLoading = false;
    state.signUpError = error.message;
  },
  checkUserExistRequest: (state) => {
    state.checkUserExistLoading = true;
    state.checkUserExistDone = false;
    state.checkUserExistError = null;
  },
  checkUserExistSuccess: (state, { payload: { data } }) => {
    state.checkUserExistLoading = false;
    state.checkUserExistDone = true;
    state.checkUserExistResult = data;
  },
  checkUserExistFailure: (state, { payload: error }) => {
    state.checkUserExistLoading = false;
    state.checkUserExistError = error.message;
  },
  logInRequest: (state) => {
    state.logInLoading = true;
    state.logInDone = false;
    state.logInError = null;
  },
  logInSuccess: (state, { payload: { data } }) => {
    state.logInLoading = false;
    state.logInDone = true;
    state.userInfo = data;
  },
  logInFailure: (state, { payload: error }) => {
    state.logInLoading = false;
    state.logInError = error.message;
  },
  logOutRequest: (state) => {
    state.logOutLoading = true;
    state.logOutDone = false;
    state.logOutError = null;
  },
  logOutSuccess: (state) => {
    state.logOutLoading = false;
    state.logOutDone = true;
    state.userInfo = null;
  },
  logOutFailure: (state, { payload: error }) => {
    state.logOutLoading = false;
    state.logOutError = error.message;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
