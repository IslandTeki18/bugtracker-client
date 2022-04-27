import { useState } from "react";
import "./SubscriptionBanner.scss";

const SubscriptionBanner = () => {
  const [email, setEmail] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    alert(`Add ${email} to newsletter`);
    setEmail("");
  }
  return (
    <div
      className="dkSubscriptionBanner py-5 bg-light"
      id="subscription-banner"
    >
      <div className="container g-0 py-5">
        <div className="col-12 text-center">
          <h1>
            Subscribe now to{" "}
            <span className="text-primary">Our Newsletter</span> and get the
            Coupon code.
          </h1>
          <p className="text-muted">
            All your information is completely confidential
          </p>
          <form onSubmit={submitHandler}>
            <div className="email-input-wrapper">
              <input
                type="email"
                className="form-control mx-3 mx-sm-3 newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email..."
              />
              <button type="submit" className="btn btn-primary" required>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
