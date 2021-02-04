import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("User Register Action");
  };
  return (
    <>
      {/* Login Form Section */}
      <section className="pt-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-xs-6 col-md-6">
              <h1>Register</h1>
              <form onSubmit={submitHandler}>
                <div className="form-group">
                  <label for="firstnameInput">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstnameInput"
                    placeholder="First name..."
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="lastnameInput">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastnameInput"
                    placeholder="Last name..."
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="emailInput">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="Email..."
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="passwordInput">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Submit
                </button>
              </form>
              <p className="pt-5">
                Have an account? <Link to="/">Login</Link> here!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterScreen;
