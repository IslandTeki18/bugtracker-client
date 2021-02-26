import {
  BUG_CREATE_REQUEST,
  BUG_CREATE_SUCCESS,
  BUG_CREATE_FAIL,
} from "../constants/bugConstants";
import axios from "axios";

export const createBug = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BUG_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/bugs`, {}, config);
    
    dispatch({
      type: BUG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
