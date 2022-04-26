import { combineReducers, applyMiddleware } from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
} from "../redux/reducers/user.reducers";
import {
  bugCreateReducer,
  bugDetailsReducer,
  bugListReducer,
  bugDeleteReducer,
  bugUpdateReducer,
  bugNotesCreateReducer,
  bugNotesDeleteReducer,
  bugNotesUpdateReducer,
} from "../redux/reducers/bug.reducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  bugCreate: bugCreateReducer,
  bugList: bugListReducer,
  bugDetails: bugDetailsReducer,
  bugDelete: bugDeleteReducer,
  bugUpdate: bugUpdateReducer,
  bugNotesCreate: bugNotesCreateReducer,
  bugNotesDelete: bugNotesDeleteReducer,
  bugNotesUpdate: bugNotesUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
