import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("User Login Action")
    }
  return (
    <>
      {/* Login Form Section */}
      <section className="pt-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-xs-6 col-md-6">
              <h1>Login</h1>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label for="emailInput">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div className="form-group">
                  <label for="passwordInput">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <p className="pt-5">
                Don't have an account? <Link to="/register">Register</Link>{" "}
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
