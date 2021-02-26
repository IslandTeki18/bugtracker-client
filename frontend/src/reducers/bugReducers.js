import {
  BUG_CREATE_REQUEST,
  BUG_CREATE_SUCCESS,
  BUG_CREATE_FAIL,
  BUG_CREATE_RESET,
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
