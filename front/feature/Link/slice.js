import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  selectedLink: null,
  userLinks: null,
  getLinkLoading: false,
  getLinkDone: false,
  getLinkError: null,
  getLinksLoading: false,
  getLinksDone: false,
  getLinksError: null,
  createLinkLoading: false,
  createLinkDone: false,
  createLinkError: null,
  editLinkLoading: false,
  editLinkDone: false,
  editLinkError: null,
  deleteLinkLoading: false,
  deleteLinkDone: false,
  deleteLinkError: null,
};

const reducers = {
  getLinkRequest: (state) => {
    state.getLinkLoading = true;
    state.getLinkDone = false;
    state.getLinkError = null;
  },
  getLinkSuccess: (state, { payload: { data } }) => {
    state.getLinkLoading = false;
    state.getLinkDone = true;
    state.selectedLink = data;
  },
  getLinkFailure: (state, { payload: error }) => {
    state.getLinkLoading = false;
    state.getLinkError = error.message;
  },
  getLinksRequest: (state) => {
    state.getLinksLoading = true;
    state.getLinksDone = false;
    state.getLinksError = null;
  },
  getLinksSuccess: (state, { payload: { data } }) => {
    state.getLinksLoading = false;
    state.getLinksDone = true;
    state.userLinks = data;
  },
  getLinksFailure: (state, { payload: error }) => {
    state.getLinksLoading = false;
    state.getLinksError = error.message;
  },
  createLinkReset: (state) => {
    state.createLinkDone = false;
  },
  createLinkRequest: (state) => {
    state.createLinkLoading = true;
    state.createLinkDone = false;
    state.createLinkError = null;
  },
  createLinkSuccess: (state) => {
    state.createLinkLoading = false;
    state.createLinkDone = true;
  },
  createLinkFailure: (state, { payload: error }) => {
    state.createLinkLoading = false;
    state.createLinkError = error.message;
  },
  editLinkRequest: (state) => {
    state.editLinkLoading = true;
    state.editLinkDone = false;
    state.editLinkError = null;
  },
  editLinkSuccess: (state) => {
    state.editLinkLoading = false;
    state.editLinkDone = true;
  },
  editLinkFailure: (state, { payload: error }) => {
    state.editLinkLoading = false;
    state.editLinkError = error.message;
  },
  deleteLinkRequest: (state) => {
    state.deleteLinkLoading = true;
    state.deleteLinkDone = false;
    state.deleteLinkError = null;
  },
  deleteLinkSuccess: (state) => {
    state.deleteLinkLoading = false;
    state.deleteLinkDone = true;
  },
  deleteLinkFailure: (state, { payload: error }) => {
    state.deleteLinkLoading = false;
    state.deleteLinkError = error.message;
  },
};

const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers,
});

export const linkReducer = linkSlice.reducer;
export const linkAction = linkSlice.actions;
