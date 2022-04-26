import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const LoginScreen = ({ history, location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/profile";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  return (
    <>
      {/* Login Form Section */}
      <section className="pt-5 text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 offset-md-3">
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              <h1 className="text-white">Login</h1>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label htmlFor="usernameInput">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username..."
                    id="usernameInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password..."
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <p className="pt-5">
                Don't have an account?{" "}
                <Link to="/register" className="text-white">
                  Register
                </Link>{" "}
                here!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginScreen;
