import {
  BUG_CREATE_REQUEST,
  BUG_CREATE_SUCCESS,
  BUG_CREATE_FAIL,
  BUG_CREATE_RESET,
  BUG_LIST_REQUEST,
  BUG_LIST_SUCCESS,
  BUG_LIST_FAIL,
  BUG_DETAILS_REQUEST,
  BUG_DETAILS_SUCCESS,
  BUG_DETAILS_FAIL,
  BUG_DELETE_REQUEST,
  BUG_DELETE_SUCCESS,
  BUG_DELETE_FAIL,
  BUG_UPDATE_REQUEST,
  BUG_UPDATE_SUCCESS,
  BUG_UPDATE_FAIL,
  BUG_UPDATE_RESET,
} from "../constants/bugConstants";

export const bugCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BUG_CREATE_REQUEST:
      return { loading: true };
    case BUG_CREATE_SUCCESS:
      return { loading: false, success: true, bug: action.payload };
    case BUG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BUG_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const bugListReducer = (state = { bugs: [] }, action) => {
  switch (action.type) {
    case BUG_LIST_REQUEST:
      return { loading: true, bugs: [] };
    case BUG_LIST_SUCCESS:
      return { loading: false, bugs: action.payload };
    case BUG_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bugDetailsReducer = (
  state = { bug: { comments: [] } },
  action
) => {
  switch (action.type) {
    case BUG_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BUG_DETAILS_SUCCESS:
      return { loading: false, bug: action.payload };
    case BUG_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bugDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BUG_DELETE_REQUEST:
      return { loading: true };
    case BUG_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BUG_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bugUpdateReducer = (state = { bug: {} }, action) => {
  switch (action.type) {
    case BUG_UPDATE_REQUEST:
      return { loading: true };
    case BUG_UPDATE_SUCCESS:
      return { loading: false, success: true, bug: action.payload };
    case BUG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BUG_UPDATE_RESET:
      return { bug: {} };

    default:
      return state;
  }
};
