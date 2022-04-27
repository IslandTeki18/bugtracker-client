import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, getUserDetails } from "../../redux/actions/user.actions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { USER_UPDATE_RESET } from "../../redux/constants/user.constants";

const ProfileSettingsScreen = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: updateSuccess } = userUpdateProfile;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET });
    // if user is not logged in, kick out to login page
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user || !user.username || updateSuccess) {
        dispatch(getUserDetails("settings"));
      } else {
        setUsername(user.username);
      }
    }
  }, [userInfo, history, user, dispatch, updateSuccess]);

  // password submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setMessage("Passwords do not match.");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          password,
        })
      );
    }
  };

  return (
    <>
      {/* User Settings Section */}
      <section className="py-3" id="user-settings-section">
        <div className="container">
          {/* Title */}
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="">User Settings</h1>
            </div>
          </div>
          {/* User Current Info */}
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h5 className=" text-center">Current Settings</h5>
              <h6 className=" my-5">Username: {user.username}</h6>
            </div>
          </div>
          {/* User Settings Form */}
          <form onSubmit={submitHandler}>
            <div className="row mb-3">
              <div className="col-md-6 offset-md-3">
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {message && <Message>{message}</Message>}
                <h5 className=" text-center">
                  Change Username & Password
                </h5>
                <div className="form-group ">
                  <label htmlFor="InputUsername">New Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="InputUsername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <div className="form-group ">
                  <label htmlFor="InputPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="InputConfirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="InputConfirmPassword"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ProfileSettingsScreen;
