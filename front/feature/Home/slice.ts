import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Home {
  id: number;
  coverImage: string,
  mainColor?: string,
  introduction: string;
  instagram: string;
  youtube: string;
  website: string;
  UserId: number;
}

export interface HomeState {
  selectedHome?: Home | null;
  getHomeLoading: boolean;
  getHomeDone: boolean;
  getHomeError?: string;
  editHomeLoading: boolean;
  editHomeDone: boolean;
  editHomeError?: string;
}

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
  getHomeSuccess: (state:HomeState, { payload }:PayloadAction<Home>) => {
    state.getHomeLoading = false;
    state.getHomeDone = true;
    state.selectedHome = payload;
  },
  getHomeFailure: (state:HomeState, { payload }: PayloadAction<string>) => {
    state.getHomeLoading = false;
    state.getHomeError = payload;
  },
  editHomeReset: (state:HomeState) => {
    state.selectedHome = null;
  },
  editHomeRequest: (state:HomeState) => {
    state.editHomeLoading = true;
    state.editHomeDone = false;
    state.editHomeError = undefined;
  },
  editHomeSuccess: (state:HomeState) => {
    state.editHomeLoading = false;
    state.editHomeDone = true;
  },
  editHomeFailure: (state:HomeState, { payload } : PayloadAction<string>) => {
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
