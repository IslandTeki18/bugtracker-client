import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/user.actions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/profile";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      setMessage("Passwords do not match up!");
    } else {
      dispatch(register(username, password));
    }
  };
  return (
    <>
      {/* Login Form Section */}
      <section className="pt-5 ">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-6">
              <h1 className="">Register</h1>
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              {message && <Message variant="danger">{message}</Message>}
              <form onSubmit={submitHandler}>
                <div className="form-group mb-2">
                  <label htmlFor="firstnameInput">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstnameInput"
                    placeholder="Username..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="passwordInput">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="confirmPasswordInput">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control mb-2"
                    id="confirmPasswordInput"
                    placeholder="Confirma Password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
              <p className="pt-5">
                Have an account?
                <Link to="/login" className="mx-1">
                  Login
                </Link>
                here!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterScreen;
