import {
  BUG_CREATE_REQUEST,
  BUG_CREATE_SUCCESS,
  BUG_CREATE_FAIL,
  BUG_LIST_REQUEST,
  BUG_LIST_SUCCESS,
  BUG_LIST_FAIL,
  BUG_DETAILS_REQUEST,
  BUG_DETAILS_SUCCESS,
  BUG_DETAILS_FAIL,
  BUG_DELETE_FAIL,
  BUG_DELETE_REQUEST,
  BUG_DELETE_SUCCESS,
  BUG_UPDATE_SUCCESS,
  BUG_UPDATE_REQUEST,
  BUG_UPDATE_FAIL,
  BUG_NOTES_REQUEST,
  BUG_NOTES_SUCCESS,
  BUG_NOTES_FAIL,
  BUG_NOTES_DELETE_SUCCESS,
  BUG_NOTES_DELETE_REQUEST,
  BUG_NOTES_DELETE_FAIL,
} from "../constants/bug.constants";
import axios from "axios";

const req =
  process.env.NODE_ENV !== "production"
    ? "/api/bugs"
    : "https://bugtrackerapp7923.herokuapp.com/api/bugs";

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
    const { data } = await axios.post(`${req}`, {}, config);

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

export const listBugs =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: BUG_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.get(
        `${req}?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({ type: BUG_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: BUG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listBugDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUG_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
    const { data } = await axios.get(`${req}/${id}`, config);
    dispatch({ type: BUG_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BUG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBug = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUG_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
    await axios.delete(`${req}/${id}`, config);
    dispatch({ type: BUG_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BUG_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateBug = (bug) => async (dispatch, getState) => {
  try {
    dispatch({ type: BUG_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`${req}/${bug._id}`, bug, config);
    dispatch({ type: BUG_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BUG_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createBugNotes =
  (bugId, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: BUG_NOTES_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`${req}/${bugId}/notes`, comment, config);
      dispatch({ type: BUG_NOTES_SUCCESS });
    } catch (error) {
      dispatch({
        type: BUG_NOTES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const removeBugNoteById =
  (bugId, noteId) => async (dispatch, getState) => {
    try {
      dispatch({ type: BUG_NOTES_DELETE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`${req}/${bugId}/${noteId}`, config);
      dispatch({ type: BUG_NOTES_DELETE_SUCCESS });
    } catch (error) {
      dispatch({
        type: BUG_NOTES_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// TODO: make this feature work. This is the edit a note by ID

// export const updateBugNoteById = (bugId, noteId, comment) => async (
//   dispatch,
//   getState
// ) => {
//   try {
//     dispatch({ type: BUG_NOTES_UPDATE_REQUEST });
//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };
//     const { data } = await axios.put(`/api/bugs/${bugId}/${noteId}`, comment, config);
//     dispatch({ type: BUG_NOTES_UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: BUG_NOTES_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
