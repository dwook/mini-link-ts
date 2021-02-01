import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeState, HomeInfo } from './types';

export const initialState: HomeState = {
  selectedHome: null,
  getHomeLoading: false,
  getHomeDone: false,
  getHomeError: '',
  editHomeLoading: false,
  editHomeDone: false,
  editHomeError: '',
};

const reducers = {
  getHomeRequest: (state:HomeState) => {
    state.getHomeLoading = true;
    state.getHomeDone = false;
    state.getHomeError = '';
  },
  getHomeSuccess: (state:HomeState, { payload }:PayloadAction<HomeInfo>) => {
    state.getHomeLoading = false;
    state.getHomeDone = true;
    state.selectedHome = payload;
  },
  getHomeFailure: (state:HomeState, { payload }:PayloadAction<string>) => {
    state.getHomeLoading = false;
    state.getHomeError = payload;
  },
  editHomeReset: (state:HomeState) => {
    state.selectedHome = null;
  },
  editHomeRequest: (state:HomeState) => {
    state.editHomeLoading = true;
    state.editHomeDone = false;
    state.editHomeError = '';
  },
  editHomeSuccess: (state:HomeState) => {
    state.editHomeLoading = false;
    state.editHomeDone = true;
  },
  editHomeFailure: (state:HomeState, { payload }:PayloadAction<string>) => {
    state.editHomeLoading = false;
    state.editHomeError = payload;
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers,
  extraReducers: {
    'user/logOutRequest': (state) => {
      state.selectedHome = null;
    },
  },
});

export const homeReducer = homeSlice.reducer;
export const homeAction = homeSlice.actions;
