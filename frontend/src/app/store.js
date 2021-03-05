import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
} from "../reducers/userReducers";
import {
  bugCreateReducer,
  bugDetailsReducer,
  bugListReducer,
  bugDeleteReducer,
  bugUpdateReducer,
  bugNotesCreateReducer,
} from "../reducers/bugReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  bugCreate: bugCreateReducer,
  bugList: bugListReducer,
  bugDetails: bugDetailsReducer,
  bugDelete: bugDeleteReducer,
  bugUpdate: bugUpdateReducer,
  bugNotesCreate: bugNotesCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
