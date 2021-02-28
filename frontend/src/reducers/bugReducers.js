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